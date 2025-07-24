import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import RadioButtonComponent from '../../../components/RadioButtonComponent';
import axiosInstance from '../../../axios';
import Toast from 'react-native-toast-message';
import { profileStyles } from '../../../assets/css/styles';
import RadioButtons from '../../../components/RadioButtons';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [genderValue, setGenderValue] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const handleBack = () => {
    navigation.navigate("Home");
  };
  const handleLogout = async () => {
    await AsyncStorage.setItem('IsLoggedIn', "");
    await AsyncStorage.setItem('id', "");
    await AsyncStorage.setItem('userEmail', "");
    await AsyncStorage.setItem('isModalShown', "");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const handleProfileSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("mobile_number", values.mobile_number);
    formData.append("age", values.age);
    formData.append("gender", genderValue);
    try {
      const res = await axiosInstance.put('auth/user', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 200 || res?.status === 201) {
        Toast.show({
          type: 'success',
          text1: "Profile updated successfully",
          autoHide: true,
          visibilityTime: 1500,
          position: "bottom",
          topOffset: 500,
        });

      } else if (res?.status === 404 || res?.status === 500) {
        Toast.show({
          type: 'error',
          text1: "Error while updating profile",
          autoHide: true,
          visibilityTime: 1500,
          position: "bottom",
          topOffset: 500,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: "Unable to determine error",
          autoHide: true,
          visibilityTime: 1500,
          position: "bottom",
          topOffset: 500,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: "Network error",
        autoHide: true,
        visibilityTime: 1500,
        position: "bottom",
        topOffset: 500,
      });
    }
  };

  const handleGenderValue = (value: any) => {
    setGenderValue(value);
  };

  const items = [
    { label: "Male", value: "Man" },
    { label: "Female", value: "Women" },
    { label: "Others", value: "Others" },
  ];

  const getUserData = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');
    const response = await axiosInstance.get(`auth/user?email=${storedEmail}`);
    setUserData(response.data);
    console.log(response.data);

    setGenderValue(response?.data?.gender);
    console.log(genderValue);

  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView style={profileStyles.container}>
      <TouchableOpacity style={profileStyles.backButton} onPress={handleBack}>
        <FontAwesome5 name="arrow-left" solid color={"#007071"} size={25} onPress={handleBack} />
      </TouchableOpacity>
      <View style={profileStyles.content}>
        <View style={profileStyles.header}>
          <Image
            style={profileStyles.profileImage}
            source={{ uri: userData?.profile_photo_url }}
            defaultSource={require('../../../assets/images/account.png')}
            onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
          />
          <View style={profileStyles.formContainer}>
            <Formik
              initialValues={{
                name: userData?.name || "",
                email: userData?.email || '',
                mobile_number: userData?.mobile_number || "",
                age: String(userData?.age) || ''
              }}
              onSubmit={handleProfileSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <>
                  <View>
                    <Text style={{ marginBottom: 5 }}>Name :</Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={[
                        profileStyles.input,
                        touched.name && errors.name ? profileStyles.error : null,
                        focusedField === 'name' && profileStyles.focusedInput,
                        !errors.name && profileStyles.inputWithGap,
                      ]}
                      placeholder="Enter your name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      editable={false}
                    />
                    {touched.name && errors.name && (
                      <Text style={profileStyles.errorText}>{errors.name}</Text>
                    )}
                  </View>


                  <View>
                    <Text style={{ marginBottom: 5 }}>Email :</Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={[
                        profileStyles.input,
                        touched.email && errors.email ? profileStyles.error : null,
                        focusedField === 'email' && profileStyles.focusedInput,
                        !errors.email && profileStyles.inputWithGap,
                      ]}
                      placeholder="Enter your email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      editable={false}
                    />
                    {touched.email && errors.email && (
                      <Text style={profileStyles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View>
                    <Text style={{ marginBottom: 5 }}>Phone :</Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={[
                        profileStyles.input,
                        touched.mobile_number && errors.mobile_number ? profileStyles.error : null,
                        focusedField === 'mobile_number' && profileStyles.focusedInput,
                        !errors.mobile_number && profileStyles.inputWithGap,
                      ]}
                      placeholder="Enter your mobile number"
                      value={values.mobile_number}
                      onChangeText={handleChange('mobile_number')}
                      onFocus={() => setFocusedField('mobile_number')}
                      onBlur={() => setFocusedField(null)}
                      editable={false}
                    />
                  </View>


                  <View>
                    <Text style={{ marginBottom: 5 }}>Age :</Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={[
                        profileStyles.inputEnabled,
                        touched.age && errors.age ? profileStyles.error : null,
                        focusedField === 'age' && profileStyles.focusedInput,
                        !errors.age && profileStyles.inputWithGap,
                      ]}
                      placeholder="Enter your age"
                      value={values.age}
                      onChangeText={handleChange('age')}
                      onFocus={() => setFocusedField('age')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>


                  <View style={{ marginLeft: 10 }}>
                    <RadioButtons genderValue={genderValue} items={items} handleGenderValue={handleGenderValue} />
                  </View>

                  <TouchableOpacity style={profileStyles.button} onPress={handleSubmit}>
                    <Text style={profileStyles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
        <TouchableOpacity style={profileStyles.footer} onPress={handleLogout}>
          <Text style={profileStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

