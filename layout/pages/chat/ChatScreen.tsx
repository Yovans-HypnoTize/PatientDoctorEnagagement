import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Linking, TouchableWithoutFeedback, PermissionsAndroid, Platform, KeyboardAvoidingView, SafeAreaView, Keyboard, BackHandler } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Tts from 'react-native-tts';
import { chatStyles } from '../../../assets/css/styles';
import SmsAnimationProgress from '../../../components/SmsAnimationProgress';
import axiosInstance from '../../../axios';
import RNBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteAlertModalComponent from '../../../components/DeleteAlert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = ({ route }: any) => {
  const { url, PDFID, filename } = route.params;
  const navigation = useNavigation<any>();
  const [messageValue, setMessageValue] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showInfoTab, setShowInfoTab] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  // Keyboard height state to adjust KeyboardAvoidingView
  // const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [showMicroStop, setShowMicroStop] = useState(false);
  const [currentlySpeakingIndex, setCurrentlySpeakingIndex] = useState<number | null>(null);

  // Handle keyboard show and hide events
  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     (e) => {
  //       if (keyboardHeight === 0) { // Only set it once to prevent unwanted jumps
  //         setKeyboardHeight(e.endCoordinates.height / 7);
  //       }
  //     }
  //   );
  
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardHeight(0);
  //     }
  //   );
  
  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);
  

  const getFileNameWithoutExtension = (name: string) => {
    // Get the file name without the extension
    const fileName = name.split('.').slice(0, -1).join('');
    // Replace special characters (-, $, etc.) with a single space
    const sanitizedFileName = fileName.replace(/[-$]/g, ' ');
    // Capitalize the first letter
    const capitalizedFileName = sanitizedFileName.charAt(0).toUpperCase() + sanitizedFileName.slice(1);
    // Truncate to 15 characters and add '...' if necessary
    return capitalizedFileName.length > 35
      ? capitalizedFileName.slice(0, 35) + ' ...'
      : capitalizedFileName;
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 29) {
          return true;
        } else {
          const granted = await PermissionsAndroid.requestMultiple([ 
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, 
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE 
          ]);
          return (
            granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
            granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
          );
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const downloadPDF = async () => {
    if (messages?.length <= 0) {
      setShowInfoTab(prev => !prev);
      return;
    }
    const user_id = await AsyncStorage.getItem('id');
    setShowInfoTab(prev => !prev);
    const response = await axiosInstance.get(`upload/Download-pdf?user_id=${user_id}&session_id=${PDFID}`);
    const pdfURL = await response?.data?.pdf_url;

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      console.log('Storage permission not granted');
      return;
    }

    const { dirs } = RNBlobUtil.fs;
    const filePath = `${dirs.DownloadDir}/downloaded_file.pdf`;

    RNBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'Downloading PDF',
        description: 'Your PDF is being downloaded.',
        path: filePath,
        mime: 'application/pdf',
        mediaScannable: true,
      },
    })
      .fetch('GET', pdfURL)
      .then((res) => {
        console.log('File saved to:', res.path());
      })
      .catch((error) => {
        console.error('Download error:', error);
      });
  };

  const handleBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Document', params: { url, PDFID, filename } }],
    });
    Tts.stop();
  };

  const handleSendMessage = async () => {
    if (!messageValue.trim()) return;

    const user_id = await AsyncStorage.getItem('id');
    const newMessage = {
      user_message: messageValue,
      ai_response: "Waiting for response...",
      loading: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageValue("");

    const data = { user_id: user_id, session_id: PDFID, message: messageValue };

    try {
      const response = await axiosInstance.post('chat', data);

      const updatedMessage = {
        user_message: messageValue,
        ai_response: response.data?.ai_response || "No response received.",
        loading: false,
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = updatedMessage;
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...newMessage,
          ai_response: "Error sending message. Please try again.",
          loading: false,
        };
        return updatedMessages;
      });
    }
  };

  const handleMicroPhone = (item: any, index: number) => {
    if (isSpeaking) return;
    Tts.getInitStatus().then(
      () => {
        setCurrentlySpeakingIndex(index);
        setShowMicroStop(true);
        Tts.speak(item);
        setIsSpeaking(true);
      },
      (err) => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      }
    );
  };

  const handleStopMicrophone = () => {
    setCurrentlySpeakingIndex(null);
    setIsSpeaking(false);
    Tts.stop();
    setShowMicroStop(false);
  };

  const openURL = (url: string) => {
    const isYouTube = /youtube\.com|youtu\.be/.test(url);
    if (isYouTube) {
      Linking.openURL(url);
    } else {
      Linking.openURL(url);
    }
  };

  const getUserMessages = async () => {
    const user_id = await AsyncStorage.getItem('id');
    try {
      const response = await axiosInstance.get(`get-messages?user_id=${user_id}&session_id=${PDFID}`);
      if (response?.data) {
        setLoading(false);
      }
      setMessages(response?.data?.messages?.message);
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) => { return { ...msg, ai_response: "Apologies for the inconvenience. Our team is actively working to resolve this issue. Please try again later." } }
        )
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserMessages();
    requestStoragePermission();
    const finishListener = Tts.addEventListener('tts-finish', () => {
      setIsSpeaking(false);
    });

    return () => {
      finishListener.remove();
    };
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessageContent = (message: any) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const aiResponse = message.ai_response;

    const content = aiResponse?.split(urlRegex).map((part: string, index: number) => {
      if (urlRegex.test(part)) {
        return (
          <Text
            key={index}
            style={chatStyles.linkText}
            onPress={() => openURL(part)}
          >
            {part}
          </Text>
        );
      }
      return part;
    });

    return content;
  };

  const handleInfo = () => {
    setShowInfoTab(prev => !prev);
  };

  const handleClearChat = () => {
    if (messages?.length > 0) {
      setShowInfoTab(prev => !prev);
      setModalOpen(true);
    } else {
      setShowInfoTab(false);
    }
  };

  const handlePressOutside = () => {
    if (showInfoTab) {
      setShowInfoTab(false);
    }
  };

  const confirmClearChat = async () => {
    setModalOpen(false);
    if (messages?.length > 0) {
      const user_id = await AsyncStorage.getItem('id');
      await axiosInstance.delete(`delete-messages?user_id=${user_id}&session_id=${PDFID}`);
      getUserMessages();
    }
  };

  const cancelClearChat = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBack(); // Trigger custom back function
      return true; // Override default behavior
    });
  
    return () => backHandler.remove(); // Cleanup the listener on unmount
  }, []);

  return (
    <SafeAreaView style={chatStyles.safeAreacontainer}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={chatStyles.container}
        keyboardVerticalOffset={60}
      > */}
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={chatStyles.container}>
            <View style={chatStyles.backButtonContainer}>
              <TouchableOpacity >
                <FontAwesome5
                  name="arrow-left"
                  solid
                  color={'#007071'}
                  size={25}
                  onPress={handleBack}
                />
              </TouchableOpacity>
              <Text style={chatStyles.fileNameText}> {getFileNameWithoutExtension(filename)}</Text>
              <View>
                <MaterialCommunityIcons name="dots-vertical" size={30} color="#007071" onPress={handleInfo} />
              </View>
            </View>

            {showInfoTab && (
              <View style={chatStyles.clearChatBtn}>
                <TouchableOpacity style={{ padding: 3 }} onPress={handleClearChat}>
                  <Text style={{ fontSize: 15 }}>Clear chat</Text>
                </TouchableOpacity>
                <View style={chatStyles.horizontalbar}></View>
                <TouchableOpacity style={{ padding: 3 }} onPress={downloadPDF}>
                  <Text style={{ fontSize: 15 }}>Download chat</Text>
                </TouchableOpacity>
              </View>
            )}

            {loading ? (
              <View style={chatStyles.messageLoadingContainer}>
                <Text style={chatStyles.messageLoadingContainerText}>Loading your chat</Text>
              </View>
            ) : (
              <ScrollView contentContainerStyle={chatStyles.messagesContainer} showsVerticalScrollIndicator={true} keyboardShouldPersistTaps="handled" ref={scrollViewRef}>
                {messages && messages?.map((message, index) => (
                  <View key={index}>
                    <View style={chatStyles.sendMessage}>
                      <Text style={chatStyles.sendMessageText}>{message?.user_message}</Text>
                    </View>
                    <View style={chatStyles.getMessage}>
                      {message.loading ? (
                        <SmsAnimationProgress />
                      ) : (
                        <>
                          <Text style={chatStyles.getMessageText}>{renderMessageContent(message)}</Text>
                          <View style={chatStyles.micIconContainer}>
                            {showMicroStop ? currentlySpeakingIndex === index ? <FontAwesome5
                              name="microphone-slash"
                              solid
                              color={"#000"}
                              size={21}
                              onPress={handleStopMicrophone}
                            /> : <FontAwesome5
                              name="microphone"
                              solid
                              color={"#000"}
                              size={24}
                              onPress={() => handleMicroPhone(message?.ai_response, index)}
                            />: <FontAwesome5
                            name="microphone"
                            solid
                            color={"#000"}
                            size={24}
                            onPress={() => handleMicroPhone(message?.ai_response, index)}
                          />}
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={chatStyles.messageContainer}>
              <View style={chatStyles.messageWrapper}>
                <TextInput
                  placeholderTextColor="black"
                  style={chatStyles.messageInput}
                  placeholder="Type your message here"
                  value={messageValue}
                  onChangeText={(e) => setMessageValue(e)}
                  keyboardAppearance="dark"
                />
                <View style={chatStyles.sendMessageBtn}>
                  <FontAwesome5 name="paper-plane" solid color={"#007071"} size={25} onPress={handleSendMessage} />
                </View>
              </View>
            </View>
            <DeleteAlertModalComponent visible={modalOpen}  title="Are you sure, you want to clear chat?" message={`${getFileNameWithoutExtension(filename)}`} onConfirm={confirmClearChat} onCancel={cancelClearChat} />
          </View>
        </TouchableWithoutFeedback>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default ChatScreen;
