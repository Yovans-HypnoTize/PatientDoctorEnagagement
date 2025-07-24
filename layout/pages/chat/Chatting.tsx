// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, TouchableWithoutFeedback, PermissionsAndroid, Platform } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Tts from 'react-native-tts';
// import { chatStyles } from "../../../assets/css/styles";
// import SmsAnimationProgress from '../../../components/SmsAnimationProgress';
// import axiosInstance from '../../../axios';
// import RNBlobUtil from 'react-native-blob-util';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import DropDown from '../../../components/DropDown';

// const ChatScreen = ({ route }: any) => {
//   const { url, PDFID } = route.params;
//   const navigation = useNavigation<any>();
//   const [messageValue, setMessageValue] = useState<string>("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
//   const [showInfoTab, setShowInfoTab] = useState<boolean>(false);
//   const [userId, setUserId] = useState<string | null>("")

//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         if (Platform.Version >= 29) {
//           // Android 10 and above use Scoped Storage
//           return true;
//         } else {
//           // For lower versions, request both permissions
//           const granted = await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           ]);

//           // Check if both permissions were granted
//           return (
//             granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
//             granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
//           );
//         }
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const downloadPDF = async () => {
//     const user_id = await AsyncStorage.getItem('id');
//     setShowInfoTab(prev => !prev)
//     // const data = { user_id:user_id,session_id:PDFID};
//     const response = await axiosInstance.get(`upload/Download-pdf?user_id=${user_id}&session_id=${PDFID}`);
//     // console.log("download pdf response", response?.data)
//     const pdfURL = await response?.data?.pdf_url

//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) {
//       console.log('Storage permission not granted');
//       return;
//     }

//     const { dirs } = RNBlobUtil.fs;
//     const filePath = `${dirs.DownloadDir}/downloaded_file.pdf`; // Path to save the file

//     RNBlobUtil.config({
//       fileCache: true,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         title: 'Downloading PDF',
//         description: 'Your PDF is being downloaded.',
//         path: filePath,
//         mime: 'application/pdf',
//         mediaScannable: true,
//       },
//     })
//       .fetch('GET', pdfURL)
//       .then((res) => {
//         console.log('File saved to:', res.path());
//         // console.log('Download complete! File saved to ' + res.path());
//       })
//       .catch((error) => {
//         console.error('Download error:', error);
//       });
//   };
//   const handleBack = () => {
//     navigation.navigate("Document", { url, PDFID });
//     // setMessages([]);
//   };

//   // const getMessages = async () => {
//   //   const response = await axiosInstance.get('chat');
//   // }

//   const handleSendMessage = async () => {
//     if (!messageValue.trim()) return;
//     const user_id = await AsyncStorage.getItem('id');

//     // const newMessage = {
//     //   user_message: messageValue,
//     //   ai_response: "",
//     //   loading: true,
//     // };

//     // setMessages((prev) => [...prev, newMessage]);
//     setMessageValue("");

//     // const data = { message: messageValue };
//     const data = { user_id: user_id, session_id: PDFID, message: messageValue };
//     const response = await axiosInstance.post('chat', data);
//     try {
//       const response = await axiosInstance.post('chat', data);
//       await getUserMessages();
//       // setMessages((prev) =>
//       //   prev.map((msg) =>
//       //     msg === newMessage
//       //       ? { ...msg, ai_response: response?.data?.ai_response || "No response", loading: false }
//       //       : msg
//       //   )
//       // );
//     } catch (error) {
//       console.log(error)
//       // setMessages((prev) =>
//       //   prev.map((msg) =>
//       //     msg === newMessage
//       //       ? { ...msg, ai_response: "Apologies for the inconvenience. Our team is actively working to resolve this issue. Please try again later.", loading: false }
//       //       : msg
//       //   )
//       // );
//     }
//   };

//   const handleMicroPhone = (item: any) => {
//     if (isSpeaking) return;
//     Tts.getInitStatus().then(
//       () => {
//         Tts.speak(item);
//         setIsSpeaking(true);
//       },
//       (err) => {
//         if (err.code === 'no_engine') {
//           Tts.requestInstallEngine();
//         }
//       }
//     );
//   };

//   const openURL = (url: string) => {
//     // Check if it's a YouTube link or any other link
//     const isYouTube = /youtube\.com|youtu\.be/.test(url);
//     if (isYouTube) {
//       Linking.openURL(url); // Open in the YouTube app or browser
//     } else {
//       Linking.openURL(url); // Open in the browser
//     }
//   };

//   const getUserMessages = async () => {
//     const user_id = await AsyncStorage.getItem('id');
//     try {
//       const response = await axiosInstance.get(`chat/get-messages?user_id=${user_id}&session_id=${PDFID}`);
//       // console.log("response messages", response?.data?.messages?.message)
//       setMessages((prev) =>
//         prev.map((msg) => { return { ...msg, ai_response: response?.data?.messages?.message.ai_response || "No response", loading: false } }

//         )
//       );
//     } catch (error) {
//       setMessages((prev) =>
//         prev.map((msg) => { return { ...msg, ai_response: "Apologies for the inconvenience. Our team is actively working to resolve this issue. Please try again later.", loading: false } }

//         )
//       );
//     }


//   };

//   const handleUserId = async () => {
//     const user_id = await AsyncStorage.getItem('id');
//     setUserId(user_id);
//   };

//   useEffect(() => {
//     handleUserId();
//     getUserMessages();
//     requestStoragePermission();
//     const finishListener = Tts.addEventListener('tts-finish', () => {
//       setIsSpeaking(false);
//     });

//     return () => {
//       finishListener.remove();
//     };
//   }, []);

//   const renderMessageContent = (message: any) => {
//     // Check if the AI response contains URLs
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     const aiResponse = message.ai_response;

//     // Replace URLs with clickable blue text
//     const content = aiResponse?.split(urlRegex).map((part: string, index: number) => {
//       if (urlRegex.test(part)) {
//         return (
//           <Text
//             key={index}
//             style={styles.linkText}
//             onPress={() => openURL(part)}
//           >
//             {part}
//           </Text>
//         );
//       }
//       return part;
//     });

//     return content;
//   };

//   const handleInfo = () => {
//     setShowInfoTab(prev => !prev);
//   }

//   const handleClearChat = async () => {
//     setShowInfoTab(prev => !prev);
//     const user_id = await AsyncStorage.getItem('id');
//     const response = await axiosInstance.delete(`chat/delete-messages?user_id=${user_id}&session_id=${PDFID}`);
//     getUserMessages()
//     console.log("clear chat is pressed", response?.data)
//   }

//   const handlePressOutside = () => {
//     if (showInfoTab) {
//       setShowInfoTab(false);
//     }
//   };






//   return (
//     <TouchableWithoutFeedback onPress={handlePressOutside}>
//       <View style={chatStyles.container}>
//         <View
//           style={chatStyles.chatHeaderContainer}
//         >
//           <View>
//             <FontAwesome5 name="arrow-left" solid color={"#007071"} size={25} onPress={handleBack} />
//           </View>
//           <View>
//             <FontAwesome5 name="bars" solid color={"#007071"} size={22} onPress={handleInfo} />
//           </View>
//         </View>

//         {showInfoTab && (
//           <View
//             style={chatStyles.clearChatBtn}
//           >
//             <TouchableOpacity style={{ padding: 3 }} onPress={handleClearChat}>
//               <Text style={{ fontSize: 15 }}>Clear chat</Text>
//             </TouchableOpacity>
//             <View
//               style={chatStyles.horizontalbar}
//             ></View>
//             <TouchableOpacity style={{ padding: 3 }} onPress={downloadPDF}>
//               <Text style={{ fontSize: 15 }}>Download chat</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <ScrollView contentContainerStyle={chatStyles.messagesContainer} showsVerticalScrollIndicator={false}>
//           {messages.map((message, index) => (
//             <View key={index}>
//               <View style={chatStyles.sendMessage}>
//                 <Text style={chatStyles.sendMessageText}>{message.user_message}</Text>
//               </View>
//               <View style={chatStyles.getMessage}>
//                 {message.loading ? (
//                   <SmsAnimationProgress />
//                 ) : (
//                   <>
//                     <Text style={chatStyles.getMessageText}>{renderMessageContent(message)}</Text>
//                     <View style={chatStyles.micIconContainer}>
//                       <FontAwesome5
//                         name="microphone"
//                         solid
//                         color={"#000"}
//                         size={24}
//                         onPress={() => handleMicroPhone(message.ai_response)}
//                       />
//                     </View>
//                   </>
//                 )}
//               </View>
//             </View>
//           ))}
//         </ScrollView>

//         <View style={chatStyles.messageContainer}>
//           <View style={chatStyles.messageWrapper}>
//             <TextInput
//               style={chatStyles.messageInput}
//               placeholder="Type your message here"
//               value={messageValue}
//               onChangeText={(e) => setMessageValue(e)}
//               keyboardAppearance="dark"
//             />
//             <View style={chatStyles.sendMessageBtn}>
//               <FontAwesome5 name="paper-plane" solid color={"#007071"} size={25} onPress={handleSendMessage} />
//             </View>
//           </View>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   linkText: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });

// export default ChatScreen;
