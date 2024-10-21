import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import { Audio } from "expo-av"; // For microphone permission

export default function App() {
  const [locationPermission, setLocationPermission] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [micPermission, setMicPermission] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permission
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(locationStatus === "granted");

      // Request camera permission
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === "granted");

      // Request microphone permission
      const { status: micStatus } = await Audio.requestPermissionsAsync();
      setMicPermission(micStatus === "granted");

      // Handle permissions not granted
      if (locationStatus !== "granted") {
        Alert.alert("Permission Error", "Location permission is required for this app to work.");
      }
      if (cameraStatus !== "granted") {
        Alert.alert("Permission Error", "Camera permission is required for this app to work.");
      }
      if (micStatus !== "granted") {
        Alert.alert("Permission Error", "Microphone permission is required for this app to work.");
      }
    })();
  }, []);

  // If permissions are still being requested
  if (locationPermission === null || cameraPermission === null || micPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  // If permissions were denied
  if (!locationPermission || !cameraPermission || !micPermission) {
    return <Text>Permissions not granted. Please enable them in settings.</Text>;
  }

  // Render WebView after permissions have been granted
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://ambisgroup.in/sheetal/sheetal/" }} // Update this to your actual URL
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false} // Ensures media plays without user interaction
        allowsInlineMediaPlayback={true} // Important for iOS media playback
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt" // For prompting camera/mic permissions
        onMessage={(event) => {
          // Handle messages from the WebView
          console.log(event.nativeEvent.data);
        }}
        onSslError={(event) => {
          event.preventDefault(); // Optionally handle SSL errors (not recommended for production)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:50
  },
});
