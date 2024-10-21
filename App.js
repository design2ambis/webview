import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
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
      const locStatus = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(locStatus.status === "granted");

      // Request camera permission
      const camStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(camStatus.status === "granted");

      // Request microphone permission
      const micStatus = await Audio.requestPermissionsAsync();
      setMicPermission(micStatus.status === "granted");
    })();
  }, []);

  if (
    locationPermission === null ||
    cameraPermission === null ||
    micPermission === null
  ) {
    return <Text>Requesting permissions...</Text>;
  }

  if (!locationPermission || !cameraPermission || !micPermission) {
    return <Text>Permissions not granted.</Text>;
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://ambisgroup.in/sheetal/sheetal/" }} // Change this to your actual URL
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          // Handle messages from the WebView if necessary
          console.log(event.nativeEvent.data);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
