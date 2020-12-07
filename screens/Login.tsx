import React, { FC, useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Alert, TextInput } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import firebase from "firebase";
import "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { colors, globalStyles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { useDispatch, useSelector } from "react-redux";
import { loaded, loading, loggedIn } from "../actions";
import { LoadingIndicator } from "../Components/LoadingIndicator";
import apiKeys from "../config/keys";
import { ValidateEmail } from "../utilities";

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

export const Login = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user);
  const appInfo = useSelector((state: any) => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //access firestore
  const db = firebase.firestore();

  const onLoginSuccess = () => {
    if (!userInfo.avatarSrc) {
      navigation.navigate("UploadAvatar");
      return;
    }
    if (!userInfo.relationshipId) {
      navigation.navigate("ShareYourLink");
      return;
    }
    navigation.navigate("Dashboard");
  };

  useEffect(() => {
    let isMounted = true;
    if (email.length > 4 && password.length) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }

    return () => {
      isMounted = false;
    };
  }, [email, password]);

  const handleLoginSubmit = async () => {
    dispatch(loading());
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch(loggedIn());
          onLoginSuccess();
          dispatch(loaded());
        })
        .catch((err) => {
          const errorMsg = err.message;
          dispatch(loaded());
          Alert.alert("UH OH!", errorMsg);
        });
    } catch (err) {
      dispatch(loaded());
      Alert.alert(err);
    }
  };

  const handleEmailReset = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          "Check your inbox",
          "You will be recieving a link to reset your password shortly."
        )
      )
      .catch((err) => Alert.alert("OH NO!", err.message));
  };

  return (
    <DismissKeyboard>
      <View style={styles.black}>
        {appInfo.loadingState && <LoadingIndicator />}
        <View style={styles.background}>
          <View>
            <Text style={styles.smallText}>Welcome to</Text>
            <Text style={styles.heading}>OurLife</Text>
          </View>
          <View>
            <TouchableHighlight
              disabled={true}
              style={{ alignItems: "center" }}
            >
              <Image
                source={require("../assets/yoga-sloth.png")}
                style={{ height: 108, width: 100, marginBottom: 30 }}
              />
            </TouchableHighlight>
            <Text style={styles.smallText}>Log in:</Text>
          </View>

          <View style={styles.form}>
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 1, y: 1.0 }}
              locations={[0, 1]}
              colors={["#2C333A", "#2C333A"]}
              style={globalStyles.inputContainer}
            >
              <TextInput
                textContentType="emailAddress"
                placeholder="Enter your email address"
                placeholderTextColor="#FFFFFF75"
                style={globalStyles.input}
                onChangeText={(text) => setEmail(text)}
              />
            </LinearGradient>
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 1, y: 1.0 }}
              locations={[0, 1]}
              colors={["#2C333A", "#2C333A"]}
              style={globalStyles.inputContainer}
            >
              <TextInput
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                placeholderTextColor="#FFFFFF75"
                style={globalStyles.input}
                onChangeText={(text) => setPassword(text)}
              />
              {!showPassword ? (
                <MaterialIcons
                  name="remove-red-eye"
                  size={20}
                  color="white"
                  style={styles.rightIcon}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Entypo
                  name="eye-with-line"
                  size={20}
                  color="white"
                  style={styles.rightIcon}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            </LinearGradient>
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 1, y: 1.0 }}
              locations={[0, 1]}
              colors={["#2AECFB", "#019EF4"]}
              style={
                submitEnabled
                  ? {
                      ...globalStyles.btnContainer,
                      width: 300,
                      marginTop: 25,
                    }
                  : {
                      ...globalStyles.btnContainer,
                      width: 300,
                      marginTop: 25,
                      opacity: 0.5,
                    }
              }
            >
              <TouchableOpacity
                style={{ ...globalStyles.mainBtns, justifyContent: "center" }}
                disabled={!submitEnabled}
                onPress={handleLoginSubmit}
              >
                <Text style={globalStyles.titleText}>log in</Text>
                <Feather
                  name="log-in"
                  size={30}
                  color={colors.white}
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={handleEmailReset}
              disabled={!ValidateEmail(email)}
            >
              <Text
                style={
                  ValidateEmail(email)
                    ? { ...styles.smallText, paddingTop: 25, opacity: 0.9 }
                    : { ...styles.smallText, paddingTop: 25, opacity: 0.4 }
                }
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            ...globalStyles.mainBtns,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={globalStyles.littleText}>sign up</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
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
    minHeight: 500,
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

  rightIcon: {
    position: "absolute",
    right: 15,
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },

  form: {
    height: 250,
    justifyContent: "space-between",
  },
});
