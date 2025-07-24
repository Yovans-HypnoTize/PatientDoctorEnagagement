import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, Image, Pressable, ActivityIndicator, SafeAreaView, Alert, BackHandler } from 'react-native';
import Card from '../../../components/Card';
import { homeStyles } from '../../../assets/css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../../../components/ModalComponent';
import UserModal from './UserModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../../axios';

function HomeScreen(): React.JSX.Element {
    const navigation = useNavigation<any>();
    const [files, setFiles] = useState<any>();
    const [search, setSearchValue] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);

    const handleProfileClick = () => {
        navigation.navigate('Profile', { userData });
    };

    const handlePress = ({ url, filename, PDFID }: any) => {
        navigation.navigate('Document', { url, filename, PDFID });
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const getFiles = async () => {
        const response = await axiosInstance.get('files');
        const data = response?.data?.data;
        setFiles(data);
        return response;
    };

    useEffect(() => {
        getFiles();
    }, []);

    const Icons = [
        "brain",
        "book-medical",
        "user-injured",
    ];

    const mappedFiles = files?.flatMap((item: any, index: number) => {
        const categoryKey = Object.keys(item)[0];
        return item[categoryKey].map((file: any, fileIndex: number) => ({
            ...file,
            icon: Icons[(index + fileIndex) % Icons.length],
        }));
    });

    const filteredFiles = search
        ? mappedFiles?.filter((file: any) =>
            file.filename.toLowerCase().includes(search.toLowerCase())
        )
        : mappedFiles;


    const fetchUserData = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const response = await axiosInstance.get(`auth/user?email=${storedEmail}`);
            setUserData(response.data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch user data.',
            });
        }
    };

    const getFileNameWithoutExtension = (name: string) => {
        // Get the file name without the extension
        const fileName = name.split('.').slice(0, -1).join('');
        // Replace special characters (-, $, etc.) with a single space
        const sanitizedFileName = fileName.replace(/[-$]/g, ' ');
        // Capitalize the first letter
        const capitalizedFileName = sanitizedFileName.charAt(0).toUpperCase() + sanitizedFileName.slice(1);
        // Truncate to 15 characters and add '...' if necessary
        return capitalizedFileName.length > 40
          ? capitalizedFileName.slice(0, 40) + ' ...'
          : capitalizedFileName;
      };

    const checkFirstTimeLogin = async () => {
        const showModal = await AsyncStorage.getItem('showModal');
        if (showModal === "true") {
            setModalOpen(true); // Open modal only for the first time
            await AsyncStorage.setItem('showModal', ''); // Set flag to true
        }
    };

    useEffect(() => {
        fetchUserData();
        checkFirstTimeLogin(); // Check if modal needs to be shown
    }, []);

    const handleCloseUserModal = () => {
        setModalOpen(false);
    };

    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            BackHandler.exitApp();
            // Alert.alert(
            //   "Exit App",
            //   "Do you want to exit?",
            //   [
            //     { text: "Cancel", style: "cancel" },
            //     { text: "Exit", onPress: () => BackHandler.exitApp() },
            //   ]
            // );
            return true; // Prevent default behavior (going back)
          };
    
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
          return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, [])
      );


    return (
        <SafeAreaView style={homeStyles.safeAreacontainer}>
            <View>
                <View style={homeStyles.headerContainer}>
                    <Text style={homeStyles.headerText}>Home</Text>
                    <View >
                        <TouchableOpacity onPress={handleProfileClick}>
                            <Image
                                style={homeStyles.profileIcon}
                                source={require('../../../assets/images/account.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={homeStyles.searchIconContainer}>
                    <View
                        style={homeStyles.searchWrapper}
                    >
                        <Icon name="search" size={20} color="#D3D3D3" style={{ marginRight: 5 }} />
                        <TextInput
                            placeholderTextColor="black"
                            style={{ flex: 1 }}
                            placeholder="Search"
                            value={search}
                            onChangeText={(e) => handleSearchChange(e)}
                        />
                    </View>
                </View>

                <View style={homeStyles.cardContainer}>
                    {filteredFiles?.length > 0 ? (
                        filteredFiles.map((file: any) => (
                            <View key={file.filename}>
                                <Card
                                    handlePress={() =>
                                        handlePress({ url: file.url, filename: file.filename, PDFID: file.PDFID })
                                    }
                                    pdfURL={file.url}
                                    filename={getFileNameWithoutExtension(file.filename)}
                                    icon={file.icon}
                                />
                            </View>
                        ))
                    ) : search && filteredFiles?.length === 0 ? (
                        <View style={homeStyles.noDataContainer}>
                            <Text style={homeStyles.noDataText}>No files found matching your search criteria</Text>
                        </View>
                    ) : (
                        <View style={homeStyles.documentLoadingContainer}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                    )}
                </View>
                <ModalComponent isOpen={modalOpen}>
                    {userData?.name ? (
                        <View style={homeStyles.userDataModalContainer}>
                            <Pressable onPress={handleCloseUserModal} style={homeStyles.closebtnWrapper}>
                                <FontAwesome5 name="window-close" solid color={'#007071'} size={25} />
                            </Pressable>
                            <UserModal userData={userData} handleCloseUserModal={handleCloseUserModal} />
                        </View>
                    ) : (
                        <View style={homeStyles.loadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    )}
                </ModalComponent>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;
