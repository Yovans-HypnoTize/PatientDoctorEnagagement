import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import axios from 'axios';

const PhotoCaptureComponent = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef(null);
  const device = useCameraDevice('front');
  
  const [photo, setPhoto] = useState(null); // Store photo as Blob (binary data)

  const NoCameraDeviceError = () => (
    <Text>No devices found</Text>
  );

  // Request camera permission if not already granted
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return <Text>No permission granted to access camera.</Text>;
  }

  if (device == null) return <NoCameraDeviceError />;

  const takePicture = async () => {
    if (camera.current) {
      // Capture the photo
      const capturedPhoto = await camera.current.takePhoto({
        skipMetadata: true,
        qualityPrioritization: 'speed',
      });

      // Fetch the photo from file path and convert it to binary (Blob)
      const photoBlob = await fetch(`file://${capturedPhoto.path}`).then((res) => res.blob());

      // Store the photo as Blob
      setPhoto(photoBlob);

      // Create a FormData object and append the photo Blob
      const formData = new FormData();
      formData.append('photo', {
        uri: capturedPhoto.path,
        type: 'image/jpeg', // Adjust the type based on your image format
        name: 'captured-photo.jpg',
      });

      // Send the FormData to the backend
      try {
        const response = await axios.post('https://your-backend-api-url', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Successfully uploaded', response.data);
      } catch (error) {
        console.error('Upload error:', error);
      }

      // Optionally navigate to another screen with the photo path
      navigation.navigate("Register", { photoURL: capturedPhoto.path });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo
      />
      <View style={styles.cameraBtnWrapper}>
        <TouchableOpacity style={styles.cameraBtn} onPress={takePicture}></TouchableOpacity>
      </View>
    </View>
  );
};

export default PhotoCaptureComponent;

const styles = StyleSheet.create({
  cameraBtnWrapper: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 40,
    padding: 1,
    backgroundColor: '#FFF',
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3C3C',
  },
});
