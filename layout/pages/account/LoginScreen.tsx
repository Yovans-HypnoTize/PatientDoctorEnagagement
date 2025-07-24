import * as React from 'react';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from '../../../assets/css/styles';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function LoginScreen({ navigation }: any): React.JSX.Element {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<any>();

  const handleLogin = async (values: { email: string; password: string }) => {
    await AsyncStorage.setItem('userEmail', values.email);
    try {
      await axiosInstance.post('auth/login', values).then((res) => {
        if (res?.status === 200 || res?.status === 201) {
          AsyncStorage.setItem('id', res.data.user.id);
          AsyncStorage.setItem('IsLoggedIn', JSON.stringify(true));
          AsyncStorage.setItem('showModal', JSON.stringify(true));
          Toast.show({
            type: 'success',
            text1: 'Login successfull',
            autoHide: true,
            visibilityTime: 1500,
            position: 'bottom',
            topOffset: 500,
          });
          navigation.navigate('Home', { email: values.email });
        } else if (res?.status === 404 || res?.status === 500) {
          Toast.show({
            type: 'error',
            text1: 'error while loggin in',
            autoHide: true,
            visibilityTime: 1500,
            position: 'bottom',
            topOffset: 500,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Unable to determine error',
            autoHide: true,
            visibilityTime: 1500,
            position: 'bottom',
            topOffset: 500,
          });
        }
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
        autoHide: true,
        visibilityTime: 1500,
        position: 'bottom',
        topOffset: 500,
      });
    }
  };
  const checkLoginStatus = async () => {
    const loggedIn = await AsyncStorage.getItem('IsLoggedIn');
    setIsLoggedIn(loggedIn)
    if (isLoggedIn === 'true') {
      navigation.navigate('Home')
    }
  };

  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Welcome to Interactive Patient Engage</Text>
        {/* <Text style={styles.subtitle}>Keep your data safe</Text> */}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email ? styles.error : null,
                  focusedField === 'email' && styles.focusedInput,
                  !errors.email && styles.inputWithGap,
                ]}
                placeholder="Enter your Email"
                placeholderTextColor="black"
                value={values.email}
                onChangeText={handleChange('email')}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize='none'
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password ? styles.error : null,
                  focusedField === 'password' && styles.focusedInput,
                  !errors.password && styles.inputWithGap,
                  styles.textDark,
                ]}
                placeholder="Enter your Password"
                placeholderTextColor="black"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <Text style={styles.registerText}>
        Don't have an account?  <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </Text>
      </Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
