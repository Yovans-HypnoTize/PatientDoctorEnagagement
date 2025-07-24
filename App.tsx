import React, { useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import LoginScreen from './layout/pages/account/LoginScreen';
import RegisterScreen from './layout/pages/account/RegisterScreen';
import PhotoCaptureComponent from './components/PhotoCaptureComponent';
import HomeScreen from './layout/pages/home/HomeScreen';
import DocumentScreen from './layout/pages/document/DocumentScreen';
import ChatScreen from './layout/pages/chat/ChatScreen';
import ProfileScreen from './layout/pages/profile/ProfileScreen';

const Stack = createStackNavigator();

const AppLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Document" component={DocumentScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const AuthLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={AppLayout} />
      <Stack.Screen name="PhotoCapture" component={PhotoCaptureComponent} />
    </Stack.Navigator>
  );
};

const App = (): React.JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
  const navigationRef = useNavigationContainerRef(); // Reference to track navigation

  // Fetch login status
  const getData = async () => {
    const data = await AsyncStorage.getItem('IsLoggedIn');
    setIsLoggedIn(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle Back Button Behavior
  useEffect(() => {
    const backAction = () => {
      const currentRoute = navigationRef.getCurrentRoute()?.name;

      if (currentRoute === 'Home' || currentRoute === 'Login') {
        Alert.alert('Exit App', 'Do you want to exit the app?', [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default back action
      } else {
        return false; // Allow default behavior for other screens
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn === 'true' ? <AppLayout /> : <AuthLayout />}
      <Toast />
    </NavigationContainer>
  );
};

export default App;
