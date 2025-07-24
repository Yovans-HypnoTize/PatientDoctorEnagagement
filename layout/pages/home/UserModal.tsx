import { Image, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import axiosInstance from '../../../axios';
import Toast from 'react-native-toast-message';
import { userModalStyles } from '../../../assets/css/styles';
import RadioButtons from '../../../components/RadioButtons';

const UserModal = ({ userData, handleCloseUserModal }: any) => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [genderValue, setGenderValue] = useState<string>("");

    useEffect(() => {
        setGenderValue(userData?.gender);
    }, [])

    const handleProfileSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("name", values.name);
        formData.append("mobile_number", values.mobile_number);
        formData.append("age", values.age);
        formData.append("gender", genderValue);
        try {
            const res = await axiosInstance.put(`auth/user`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res?.status === 200 || res?.status === 201) {
                handleCloseUserModal();
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
            console.error('Update error:', error);
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
        setGenderValue(value)
    }

    const items = [
        { label: "Male", value: "Man" },
        { label: "Female", value: "Women" },
        { label: "Others", value: "Others" },
    ];



    return (
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={userModalStyles.safeAreacontainer}>
                    <View style={userModalStyles.header}>
                        <Image
                            style={userModalStyles.profileImage}
                            source={{ uri: userData?.profile_photo_url }}
                            defaultSource={require('../../../assets/images/account.png')}
                        />
                        <Text style={userModalStyles.headerText}>Patient Details</Text>
                        <View >
                            <Formik
                                initialValues={{
                                    name: userData?.name || "",
                                    email: userData?.email || '',
                                    mobile_number: userData?.mobile_number || "",
                                    age: String(userData?.age) || ""
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
                                                    userModalStyles.input,
                                                    touched.name && errors.name ? userModalStyles.error : null,
                                                    focusedField === 'name' && userModalStyles.focusedInput,
                                                    !errors.name && userModalStyles.inputWithGap,
                                                ]}
                                                placeholder="Enter your name"
                                                value={values.name}
                                                onChangeText={handleChange('name')}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                editable={false}
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ marginBottom: 5 }}>Email :</Text>
                                            <TextInput
                                                placeholderTextColor="black"
                                                style={[
                                                    userModalStyles.input,
                                                    { color: 'black' },
                                                    touched.email && errors.email ? userModalStyles.error : null,
                                                    focusedField === 'email' && userModalStyles.focusedInput,
                                                    !errors.email && userModalStyles.inputWithGap,
                                                ]}
                                                placeholder="Enter your email"
                                                value={values.email}
                                                onChangeText={handleChange('email')}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                editable={false}
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ marginBottom: 5 }}>Phone :</Text>
                                            <TextInput
                                                placeholderTextColor="black"
                                                style={[
                                                    userModalStyles.input,
                                                    touched.mobile_number && errors.mobile_number ? userModalStyles.error : null,
                                                    focusedField === 'mobile_number' && userModalStyles.focusedInput,
                                                    !errors.mobile_number && userModalStyles.inputWithGap,
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
                                                    userModalStyles.inputAge,
                                                    touched.age && errors.age ? userModalStyles.error : null,
                                                    focusedField === 'age' && userModalStyles.focusedInput,
                                                    !errors.age && userModalStyles.inputWithGap,
                                                ]}
                                                placeholder="Enter your age"
                                                value={values.age}
                                                onChangeText={handleChange('age')}
                                                onFocus={() => setFocusedField('age')}
                                                onBlur={() => setFocusedField(null)}
                                            />
                                        </View>

                                        <View style={{ paddingLeft: 15 }}>
                                            <RadioButtons genderValue={genderValue} items={items} handleGenderValue={handleGenderValue} />
                                        </View>

                                        <View style={userModalStyles.submitBtnWrapper}>
                                            <TouchableOpacity style={userModalStyles.button} onPress={handleSubmit}>
                                                <Text style={userModalStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
};

export default UserModal;

