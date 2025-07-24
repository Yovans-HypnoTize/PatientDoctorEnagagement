import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, SafeAreaView, BackHandler } from 'react-native';
import { mediaDevices } from 'react-native-webrtc';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import DoubtDetection from '../../../components/DoubtDetection';
import { useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { documentStyles } from '../../../assets/css/styles';
import { WEBSOCKET_URL } from '../../../axios';
import axiosInstance from '../../../axios';

const DocumentScreen = ({ route }: any) => {
  // const { hasPermission, requestPermission } = useCameraPermission();
  const [message, setMessage] = useState('No Detection');
  const [fileURL, setFileURL] = useState<any>('');
  const { url, filename, PDFID } = route.params;
  const [modal, setmodal] = useState(false);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [stream, setStream] = useState(null);
  const ws = useRef(null);
  const cameraRef = useRef(null); // Reference for the camera
  const device = useCameraDevice('front'); // Use front camera
  const navigation = useNavigation<any>();

  // Request camera permissions
  // useEffect(() => {
  //   const checkPermissions = async () => {
  //     const permissionStatus = await requestPermission();
  //     if (permissionStatus !== 'authorized') {
  //       Alert.alert('Error', 'Camera permission is required');
  //     }
  //   };
  //   checkPermissions();
  // }, [requestPermission]);

  // Manage WebSocket connection lifecycle
  useEffect(() => {
    const establishWebSocketConnection = () => {
      ws.current = new WebSocket(WEBSOCKET_URL);
      ws.current.onopen = () => {
        console.log('WebSocket connected');
      };
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.debug(data.message, 'klklkl');
        if (data.message === 'Neutral') {
          setmodal(false); // Close modal for 'Neutral' message
        } else if (data.message === 'No Face Detected') {
          setmodal(false); // Close modal for 'No Face Detected' message
        } else {
          setmodal(true); // Open modal for other messages
          ws.current.close();
        }
        setMessage(data.message); // Update the message from server
        if (data.frame) {
          setProcessedFrame(data.frame); // Set processed frame from backend
        }
      };
      ws.current.onerror = (error) => console.error('WebSocket error:', error);
      ws.current.onclose = () => console.log('WebSocket disconnected');
    };

    establishWebSocketConnection();

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log('WebSocket closed');
      }
    };
  }, []);

  // Handle navigation events for WebSocket
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Establish WebSocket connection when DocumentScreen is focused
      if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
        ws.current = new WebSocket(WEBSOCKET_URL);
        console.log('WebSocket reconnected on focus');
      }
      setmodal(false);
      setMessage('No Detection');
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      // Close WebSocket connection when navigating away
      if (ws.current) {
        ws.current.close();
        console.log('WebSocket closed on blur');
      }
      setmodal(false);
      setMessage('No Detection');
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  // Access device camera
  useEffect(() => {
    setmodal(false);
    const getMediaStream = async () => {
      try {
        const mediaStream = await mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setStream(mediaStream);
      } catch (error) {
        Alert.alert('Error', 'Unable to access camera');
        console.error(error);
      }
    };
    getMediaStream();
  }, []);

  // Capture frames and send to WebSocket
  const captureFrame = async () => {
    if (cameraRef.current) {
      if (ws.current?.readyState === WebSocket.OPEN) {
        try {
          // Capture photo with path information
          const frame = await cameraRef.current.takePhoto({ photo: true });

          // Check if the path exists
          if (frame.path) {
            // Convert the image at the captured path to base64
            const base64data = await RNFS.readFile(frame.path, 'base64');

            if (base64data) {
              ws.current.send(base64data); // Send base64 data to WebSocket server
            } else {
              console.error('Failed to convert image to base64.');
            }
          } else {
            console.error('No image path found in the captured frame.');
          }
        } catch (error) {
          console.error('Error capturing frame:', error);
        }
      }
    } else {
      console.log('CameraRef is null or undefined');
    }
  };

  // Continuously capture frames
  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 2000); // Capture every 2 seconds
    return () => clearInterval(interval);
  }, [stream]);

  const confirmDoubt = async () => {
    setmodal(false); // Hide the modal
    const formData = new FormData();
    formData.append('file_url', url);
    navigation.navigate('Chat', { url, PDFID, filename });
    await axiosInstance.post('upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const cancelDoubtModal = () => {
    setmodal(false); // Hide the alert box

    if (ws.current) {
      ws.current.close();
    }

    // Re-establish WebSocket connection
    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log('WebSocket reconnected after canceling modal');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.debug(data.message, 'Message received on reconnection');
      if (data.message === 'Neutral' || data.message === 'No Face Detected') {
        setmodal(false);
      } else {
        setmodal(true);
        ws.current.close();
      }
      setMessage(data.message);
      if (data.frame) {
        setProcessedFrame(data.frame);
      }
    };

    ws.current.onerror = (error) => console.error('WebSocket error on reconnection:', error);
    ws.current.onclose = () => console.log('WebSocket disconnected after reconnection');
  };

  const handleBack = () => {
    setmodal(false);
    navigation.navigate('Home');
  };

  const handleMessage = async (url: string) => {
    setmodal(false);
    const formData = new FormData();
    formData.append('file_url', url);
    navigation.navigate('Chat', { url, PDFID, filename });
    await axiosInstance.post('upload-pdf', formData);
    setmodal(false);
  };

  const getFileNameWithoutExtension = (name: string) => {
    // Get the file name without the extension
    const fileName = name.split('.').slice(0, -1).join('');
    // Replace special characters (-, $, etc.) with a single space
    const sanitizedFileName = fileName.replace(/[-$]/g, ' ');
    // Capitalize the first letter
    const capitalizedFileName = sanitizedFileName.charAt(0).toUpperCase() + sanitizedFileName.slice(1);
    // Truncate to 15 characters and add '...' if necessary
    return capitalizedFileName.length > 43
      ? capitalizedFileName.slice(0, 43) + ' ...'
      : capitalizedFileName;
  };

  useEffect(() => {
    setFileURL(url);
  }, [url]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home'); // Navigate to HomeScreen
      return true; // Prevent default behavior
    });

    return () => backHandler.remove(); // Cleanup
  }, []);


  return (
    <SafeAreaView style={documentStyles.safeAreacontainer}>
      <View style={documentStyles.container}>
        <View style={documentStyles.backButtonContainer}>
          <TouchableOpacity onPress={handleBack}>
            <FontAwesome5 name="arrow-left" solid color={'#007071'} size={25} />
          </TouchableOpacity>
          <Text style={documentStyles.filenameWrapper}>
            {getFileNameWithoutExtension(filename)}
          </Text>
        </View>
        {modal && (<DoubtDetection title={"Do you have any question?"} visible={modal} onConfirm={confirmDoubt} onCancel={cancelDoubtModal} />)}

        <View style={documentStyles.documentContainer}>
          <Pdf
            trustAllCerts={false}
            source={{ uri: url, cache: true }}
            style={{ flex: 1, width: Dimensions.get('window').width }}
          />
        </View>
        {device ? (
          <Camera
            ref={cameraRef}
            style={documentStyles.video}
            device={device} // Use the front camera device
            isActive={true} // Ensures the camera is active
            photo={true} // Enable photo capture
          />
        ) : (
          <Text style={documentStyles.message}>No camera device available</Text>
        )}

        <TouchableOpacity
          style={documentStyles.messageBtn}
          onPress={() => handleMessage(fileURL)}
        >
          <FontAwesome5 name="comments" solid color={'#fff'} size={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DocumentScreen;