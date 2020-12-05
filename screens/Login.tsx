import React, { FC } from "react";
import { Text, View, Image, StyleSheet, Alert, Platform } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import firebase from "firebase";
import "firebase/firestore";

import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";

import { colors } from "../styles/globalStyles";

export const Login = ({ navigation }: { navigation: any }) => {
  const onLoginSuccess = () => navigation.navigate("UploadAvatar");
  const onLoginFailure = () => console.log("failed to login");

  //only works after build....
  const logingWithGoogle = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      const data = GoogleSignIn.GoogleAuthentication.prototype.toJSON();
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const creditial = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(creditial);
        onLoginSuccess();
      }
    } catch ({ message }) {
      alert(`Google login error: ${message}`);
    }
  };

  const logInWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({ appId: "712802192682691" });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credentials);
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );

        Alert.alert("logged in", `Hi ${(await response.json()).name}`);
        onLoginSuccess();
      }
    } catch ({ message }) {
      alert(`Facebook login error: ${message}`);
    }
  };

  return (
    <View style={styles.black}>
      <View style={styles.background}>
        <View>
          <Text style={styles.smallText}>Welcome to</Text>
          <Text style={styles.heading}>OurLife</Text>
        </View>
        <View>
          <TouchableHighlight
            onPress={() => navigation.navigate("UploadAvatar")}
            style={{ alignItems: "center" }}
          >
            <Image
              source={require("../assets/yoga-sloth.png")}
              style={{ height: 108, width: 100, marginBottom: 30 }}
            />
          </TouchableHighlight>
          <Text style={styles.smallText}>Sign up/ Log in with:</Text>
        </View>
        <View>
          {Platform.OS === "android" && (
            <TouchableOpacity onPress={logingWithGoogle}>
              <Text style={styles.smallText}>GOOGLE</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ marginVertical: 50 }}
            onPress={logInWithFacebook}
          >
            <Text style={styles.smallText}>FACEBOOK</Text>
          </TouchableOpacity>
          {Platform.OS === "ios" && (
            <TouchableOpacity>
              <Text style={styles.smallText}>APPLE</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  black: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 0.92,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.black,
    marginTop: 45,
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  smallText: {
    color: colors.white,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    fontSize: 18,
  },
  heading: {
    color: colors.white,
    fontFamily: "montserrat-alternates",
    textAlign: "center",
    fontSize: 52,
  },
});
