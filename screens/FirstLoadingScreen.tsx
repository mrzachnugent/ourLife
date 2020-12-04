import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../styles/globalStyles";
import * as firebase from "firebase";

export const FirstLoadingScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Login");
      }
    });

    return () => console.log("unmounted");
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
