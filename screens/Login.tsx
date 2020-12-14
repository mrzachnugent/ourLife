import React, { FC, useState, useEffect, useRef } from "react";
import { Text, View, Image, StyleSheet, Alert, TextInput } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

import firebase from "firebase";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";

import { colors, globalStyles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { useDispatch, useSelector } from "react-redux";
import { loaded, loading, loggedIn } from "../actions";
import { LoadingIndicator } from "../Components/LoadingIndicator";
import apiKeys from "../config/keys";
import { ValidateEmail } from "../utilities";
import { LoginNavProps } from "../types/navigationTypes";
import { InitialState } from "../types/reducerTypes";
import { GenericInput } from "../Components/GenericInput";

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

export const Login = ({ navigation }: LoginNavProps) => {
  const isMounted = useRef<boolean>(true);
  const isUnMounting = useRef<boolean>(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: InitialState) => state.user);
  const appInfo = useSelector((state: InitialState) => state);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onLoginSuccess = () => {
    if (!userInfo.avatarSrc) {
      navigation.navigate("UploadAvatar");
      return;
    }
    if (!userInfo.relationshipId) {
      navigation.navigate("ShareYourLink");
      return;
    }
  };

  useEffect(() => {
    if (email.length > 4 && password.length) {
      if (!isMounted.current) return;
      setSubmitEnabled(true);
    } else {
      if (!isMounted.current) return;
      setSubmitEnabled(false);
    }
    return () => {
      isUnMounting.current = true;
    };
  }, [email, password]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLoginSubmit = async () => {
    dispatch(loading());
    try {
      if (!isMounted.current) return;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch(loggedIn());

          dispatch(loaded());
        })
        .then(() => onLoginSuccess())
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
    try {
      if (!isMounted.current) return;
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
    } catch (err) {
      Alert.alert("OH NO!", err.message);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.black}>
        {appInfo.loadingState && <LoadingIndicator />}
        <View style={styles.background}>
          <View>
            <Text style={styles.heading}>OurLife</Text>

            <Text style={styles.smallText}>Log in:</Text>

            <View style={styles.form}>
              <GenericInput
                onChange={(text) => isMounted.current && setEmail(text)}
                placeholder="Enter email address"
              />

              <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 1, y: 1.0 }}
                locations={[0, 1]}
                colors={["#2C333A", "#2C333A"]}
                style={{ ...globalStyles.inputContainer, marginTop: 20 }}
              >
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#FFFFFF75"
                  style={globalStyles.input}
                  onChangeText={(text) =>
                    isMounted.current && setPassword(text)
                  }
                />
                {!showPassword ? (
                  <MaterialIcons
                    name="remove-red-eye"
                    size={20}
                    color="white"
                    style={styles.rightIcon}
                    onPress={() =>
                      isMounted.current && setShowPassword(!showPassword)
                    }
                  />
                ) : (
                  <Entypo
                    name="eye-with-line"
                    size={20}
                    color="white"
                    style={styles.rightIcon}
                    onPress={() =>
                      isMounted.current && setShowPassword(!showPassword)
                    }
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
            </View>
            <TouchableHighlight
              disabled={true}
              style={{ alignItems: "center" }}
            >
              <Image
                source={require("../assets/yoga-sloth.png")}
                style={{
                  height: 108,
                  width: 100,
                  marginBottom: 30,
                  opacity: 0.6,
                }}
              />
            </TouchableHighlight>
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
    marginTop: -35,
  },
  background: {
    flex: 0.9,
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
    paddingVertical: 30,
    justifyContent: "space-between",
  },
});
