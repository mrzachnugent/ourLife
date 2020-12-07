import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import "firebase/firestore";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import {
  avatarSrcUpdate,
  loaded,
  loading,
  loggedOut,
  userNameUpdate,
  userPhoneUpdate,
} from "../actions";
import { displayPhoneNum } from "../utilities";
import { LoadingIndicator } from "../Components/LoadingIndicator";
import apiKeys from "../config/keys";

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const storageRef = firebase.storage().ref();
const db = firebase.firestore();

export const MyAccount = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state: any) => state);
  const userInfo = useSelector((state: any) => state.user);
  const [enableNameSave, setNameEnableSave] = useState(false);
  const [name, setName] = useState("");
  const [enablePhoneSave, setPhoneEnableSave] = useState(false);
  const [phone, setPhone] = useState("");

  const usersRef = db.collection("users");

  useEffect(() => {
    let isMounted = true;
    if (name.length) {
      setNameEnableSave(true);
    } else {
      setNameEnableSave(false);
    }

    return () => {
      isMounted = false;
    };
  }, [name]);

  useEffect(() => {
    let isMounted = true;
    if (phone.length > 6) {
      setPhoneEnableSave(true);
    } else {
      setPhoneEnableSave(false);
    }

    return () => {
      isMounted = false;
    };
  }, [phone]);

  const handlePress = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const chosenPic = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4],
    });
    if (!chosenPic.cancelled) {
      dispatch(loading());
      const imageName = Math.random().toString(36).substring(7);
      try {
        const getImage = await fetch(chosenPic.uri);
        const blob = await getImage.blob();

        const imageRef = storageRef.child(imageName);
        await imageRef.put(blob);
        const imageURL = await imageRef.getDownloadURL();
        await usersRef.doc(userInfo.uid).update({ avatarSrc: imageURL });
        dispatch(avatarSrcUpdate(imageURL));
        dispatch(loaded());
      } catch (err) {
        Alert.alert("UH OH!", err.message);
        dispatch(loaded());
      }
    }
  };

  const onNameSave = async () => {
    await usersRef.doc(userInfo.uid).update({ name: name });
    dispatch(userNameUpdate(name));
  };
  const onPhoneSave = async () => {
    await usersRef.doc(userInfo.uid).update({ phoneNumber: phone });
    dispatch(userPhoneUpdate(phone));
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={{ ...globalStyles.androidSafeArea, paddingTop: 20 }}>
        {appInfo.loadingState && <LoadingIndicator />}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <MaterialIcons name="arrow-back" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableHighlight>
            <Text style={globalStyles.titleText}>My Account</Text>
          </TouchableHighlight>
          <View />
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={handlePress}
            style={{ ...styles.shadow, marginBottom: -25 }}
          >
            <View style={styles.centerAvatar}>
              {userInfo.avatarSrc ? (
                <Image
                  // source={require("../assets/mel-avatar.jpg")}
                  source={{ uri: userInfo.avatarSrc }}
                  style={{
                    width: "99.8%",
                    height: "99.8%",
                    opacity: 1,
                    borderRadius: 500,
                  }}
                />
              ) : (
                <MaterialIcons name="person" size={150} color={colors.white} />
              )}

              <View style={styles.overlay}>
                <Text style={styles.normalText}>Change avatar</Text>
                <MaterialIcons name="image" size={50} color={colors.white} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.normalText}>{userInfo.name}</Text>
          <Text style={styles.normalText}>
            {userInfo.phoneNumber
              ? displayPhoneNum(userInfo.phoneNumber)
              : "(555) 555-5555"}
          </Text>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 1, y: 1.0 }}
            locations={[0, 1]}
            colors={["#2C333A", "#2C333A"]}
            style={globalStyles.inputContainer}
          >
            <TextInput
              placeholder="Change your name"
              placeholderTextColor="#FFFFFF75"
              style={globalStyles.input}
              onChangeText={(text) => setName(text)}
            />
          </LinearGradient>
          <LinearGradient
            start={{ x: 0.0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.9]}
            colors={["#282C31", "#22262B"]}
            style={{ ...globalStyles.btnContainer, width: 300 }}
          >
            <TouchableOpacity
              style={globalStyles.mainBtns}
              disabled={!enableNameSave}
              onPress={onNameSave}
            >
              <Text
                style={
                  enableNameSave
                    ? globalStyles.titleText
                    : { ...globalStyles.titleText, opacity: 0.3 }
                }
              >
                save name change
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 1, y: 1.0 }}
            locations={[0, 1]}
            colors={["#2C333A", "#2C333A"]}
            style={globalStyles.inputContainer}
          >
            <TextInput
              keyboardType="number-pad"
              placeholder="Update Phone Number"
              placeholderTextColor="#FFFFFF75"
              style={globalStyles.input}
              onChangeText={(text) => setPhone(text)}
            />
          </LinearGradient>
          <LinearGradient
            start={{ x: 0.0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.9]}
            colors={["#282C31", "#22262B"]}
            style={{ ...globalStyles.btnContainer, width: 300 }}
          >
            <TouchableOpacity
              style={globalStyles.mainBtns}
              disabled={!enablePhoneSave}
              onPress={onPhoneSave}
            >
              <Text
                style={
                  enablePhoneSave
                    ? globalStyles.titleText
                    : { ...globalStyles.titleText, opacity: 0.3 }
                }
              >
                save phone number
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableHighlight
            style={{ marginBottom: 15 }}
            onPress={() =>
              firebase
                .auth()
                .signOut()
                .then(() => {
                  dispatch(loggedOut());
                })
                .then(() => navigation.navigate("Login"))
            }
          >
            <Text style={styles.normalText}>log out</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
    justifyContent: "space-between",
    minHeight: 500,
  },

  centerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 180,
    height: 180,
    backgroundColor: colors.black,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 500,
    marginBottom: 30,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  overlay: {
    backgroundColor: "#00000090",
    position: "absolute",
    top: "50%",
    bottom: 0,
    width: "100%",
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  normalText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "montserrat-bold",
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },
});
