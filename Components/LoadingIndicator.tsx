import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";

export const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.white} style={styles.icon} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    backgroundColor: "#00000060",
    justifyContent: "center",
  },
  icon: {
    zIndex: 999999999999,
  },
});
