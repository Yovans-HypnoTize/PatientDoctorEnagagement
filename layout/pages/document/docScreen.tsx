// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { documentStyles } from '../../../assets/css/styles';
// import Toast from 'react-native-toast-message'; // Import Toast
// import Pdf from 'react-native-pdf';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const docScreen = ({ route }: any) => {
//   const navigation = useNavigation<any>();
//   const [fileURL, setFileURL] = useState<any>('');

//   const { url, filename, PDFID } = route.params;
  
//   // Back button handler
//   const handleBack = async () => {
//     navigation.navigate('Home');
//   };

//   // Handle message button click
//   const handleMessage = async (url: string) => {
//     navigation.navigate('Chat', { url, PDFID, filename });
//   };

//   useEffect(() => {
//     setFileURL(url);
//   }, [url]);

//   return (
//     <View style={documentStyles.container}>
//       <View style={documentStyles.backButtonContainer}>
//         <TouchableOpacity onPress={handleBack}>
//           <FontAwesome5 name="arrow-left" solid color={'#007071'} size={25} />
//         </TouchableOpacity>
//         <Text style={{ fontWeight: 'bold', marginTop: 2, marginHorizontal: 10 }}>
//           {filename}
//         </Text>
//       </View>
      
//       <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
//         <Pdf
//           trustAllCerts={false}
//           source={{ uri: url, cache: true }}
//           style={{ flex: 1, width: Dimensions.get('window').width }}
//         />
//       </View>

//       <TouchableOpacity
//         style={documentStyles.messageBtn}
//         onPress={() => handleMessage(fileURL)}
//       >
//         <FontAwesome5 name="comments" solid color={'#fff'} size={25} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default docScreen;
