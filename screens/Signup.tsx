import React, { FC, useEffect, useState } from "react";
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

import { colors, globalStyles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { LoadingIndicator } from "../Components/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { loaded, loading, loggedIn } from "../actions";
import { diffClamp } from "react-native-reanimated";

export const Signup = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state: any) => state);
  const userInfo = useSelector((state: any) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);

  //access firestore
  const db = firebase.firestore();

  const ValidateEmail = (email: string) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }
    return false;
  };

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
    if (name.length > 1 && email.length > 8 && password.length) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }

    return () => {
      isMounted = false;
    };
  }, [email, password, name]);

  const handleSignupSubmit = async () => {
    if (!ValidateEmail(email)) {
      Alert.alert("Please try again", "You entered an invalid email address.");
      return;
    }
    dispatch(loading());
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((creds) => {
          const halfId = Math.random().toString(36).substring(4);
          db.collection("users").doc(creds.user?.uid).set({
            uid: creds.user?.uid,
            name: name,
            email: creds.user?.email,
            phoneNumber: null,
            avatarSrc: null,
            halfId: halfId,
            relationshipId: null,
            partnerNickname: null,
            partnerAvatarSrc: null,
            notfiyMsg: true,
            notifyGroceries: false,
            notifyToDo: false,
          });
          db.collection("halfId").doc(halfId).set({
            uid: creds.user?.uid,
            relationshipId: null,
          });
        })
        .then(() => {
          dispatch(loggedIn());
          onLoginSuccess();
          dispatch(loaded());
        })
        .catch((err) => {
          dispatch(loaded());
          Alert.alert(
            "Email address already in use",
            `If you already have an account, please use the log in button at the bottom left.`
          );
        });
    } catch (err) {
      dispatch(loaded());
      Alert.alert(err);
    }
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
                source={require("../assets/donut-sloth.png")}
                style={{ height: 108, width: 108, marginBottom: 30 }}
              />
            </TouchableHighlight>
            <Text style={styles.smallText}>Sign up:</Text>
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
                placeholder="Enter name"
                placeholderTextColor="#FFFFFF75"
                style={globalStyles.input}
                onChangeText={(text) => setName(text)}
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
                textContentType="emailAddress"
                placeholder="Enter email address"
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
                placeholder="Enter password"
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
                      marginVertical: 15,
                    }
                  : {
                      ...globalStyles.btnContainer,
                      width: 300,
                      marginVertical: 15,
                      opacity: 0.5,
                    }
              }
            >
              <TouchableOpacity
                style={{ ...globalStyles.mainBtns, justifyContent: "center" }}
                disabled={!submitEnabled}
                onPress={handleSignupSubmit}
              >
                <Text style={globalStyles.titleText}>sign up</Text>
                <FontAwesome5
                  name="signature"
                  size={30}
                  color={colors.white}
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <TouchableOpacity
          style={{
            ...globalStyles.mainBtns,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={globalStyles.littleText}>log in</Text>
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
    height: 270,
    justifyContent: "space-between",
  },
});
