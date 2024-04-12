import React from "react";
import { View, Image, StyleSheet } from "react-native";

const LoadingIndicator = () => (
  <View style={styles.container}>
    <Image source={require("./assets/loading.gif")} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Overlay the entire screen
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", // Optional: add a semi-transparent background
  },
  image: {
    width: 100, // Adjust size as needed
    height: 100,
  },
});

export default LoadingIndicator;
