// GlobalLoadingIndicator.js
import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useLoading } from "./LoadingContext";

const GlobalLoadingIndicator = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Modal transparent={true} visible={isLoading}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default GlobalLoadingIndicator;
