import * as React from 'react';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, Text, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';
import axiosInstance from '../../../axios';
import { registerStyles } from '../../../assets/css/styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobile_number: Yup.string().required('Phone Number is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});
function RegisterScreen({ route }: any): React.JSX.Element {

  const navigation = useNavigation<any>();
  const params = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [imageData, setImageData] = React.useState('');

  const handleRegister = async (values: { name: string; password: string; mobile_number: string; email: string; }) => {
    const formData = new FormData();
    setLoading(true);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('mobile_number', values.mobile_number);
    formData.append('password', values.password);
    const photoURL = params?.photoURL;
    if (photoURL) {
      formData.append('profile_photo', {
        uri: 'file://' + photoURL,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    }
    try {
      const response = await axiosInstance.post('auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Registration successful',
          autoHide: true,
          visibilityTime: 1500,
          position: 'bottom',
          topOffset: 500,
        });
        navigation.navigate('Login');
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
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

  const hanldeTakePhotoClick = () => {
    navigation.navigate("PhotoCapture", {
      onPhotoCaptured: (photoURL: string) => setImageData(photoURL),
    });
  };

  React.useEffect(() => {
    setImageData(params?.photoURL)
  }, [params])

  return (
    <SafeAreaView style={registerStyles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={registerStyles.formContainer}>
        <View style={registerStyles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={registerStyles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={registerStyles.title}>Welcome to Interactive Patient Engage</Text>
        {/* <Text style={registerStyles.subtitle}>Keep your data safe</Text> */}

        <View>
          {!imageData?.length && <TouchableOpacity onPress={() => hanldeTakePhotoClick()}>
            <Image source={require('../../../assets/images/user_logo.png')} style={registerStyles.image} />
          </TouchableOpacity>}
          {imageData?.length &&
            <TouchableOpacity onPress={() => hanldeTakePhotoClick()}>
              <Image source={{ uri: 'file://' + params?.photoURL }} style={registerStyles.photo} />
            </TouchableOpacity>
          }
        </View>
        <Formik
          initialValues={{ name: '', password: '', mobile_number: '', email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <>
              <TextInput
                placeholderTextColor="black"
                style={[
                  registerStyles.input,
                  touched.name && errors.name ? registerStyles.error : null,
                  focusedField === 'name' && registerStyles.focusedInput,
                  !errors.name && registerStyles.inputWithGap,
                ]}
                placeholder="Enter your Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
              {touched.name && errors.name && (
                <Text style={registerStyles.errorText}>{errors.name}</Text>
              )}
              <TextInput

                placeholderTextColor="black"
                style={[
                  registerStyles.input,
                  touched.email && errors.email ? registerStyles.error : null,
                  focusedField === 'email' && registerStyles.focusedInput,
                  !errors.email && registerStyles.inputWithGap,
                ]}
                placeholder="Enter your Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
              {touched.email && errors.email && (
                <Text style={registerStyles.errorText}>{errors.email}</Text>
              )}
              <TextInput

                placeholderTextColor="black"
                style={[
                  registerStyles.input,
                  touched.mobile_number && errors.mobile_number ? registerStyles.error : null,
                  focusedField === 'mobile_number' && registerStyles.focusedInput,
                  !errors.mobile_number && registerStyles.inputWithGap,
                ]}
                placeholder="Enter your Phone Number"
                value={values.mobile_number}
                onChangeText={handleChange('mobile_number')}
                onFocus={() => setFocusedField('mobile_number')}
                onBlur={() => setFocusedField(null)}
              />
              {touched.mobile_number && errors.mobile_number && (
                <Text style={registerStyles.errorText}>{errors.mobile_number}</Text>
              )}

              <TextInput

                placeholderTextColor="black"
                style={[
                  registerStyles.input,
                  touched.password && errors.password ? registerStyles.error : null,
                  focusedField === 'password' && registerStyles.focusedInput,
                  !errors.password && registerStyles.inputWithGap,
                ]}
                placeholder="Enter your Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              {touched.password && errors.password && (
                <Text style={registerStyles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={registerStyles.button} onPress={handleSubmit}>
                <Text style={registerStyles.buttonText}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <Text style={registerStyles.registerText}>
        Already have an account?{' '}
        <Text
          style={registerStyles.loginText}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
      <Modal
        transparent
        visible={loading}
        animationType="fade"
      >
        <View style={registerStyles.modalBackground}>
          <View style={registerStyles.loaderContainer}>
            <ActivityIndicator size="large" color="#007071" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default RegisterScreen;
