import React from "react";
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { avatarSrcUpdate, loaded, loading } from "../actions";

import { UploadAvatarNavProps } from "../types/navigationTypes";
import { InitialState } from "../types/reducerTypes";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import { DismissKeyboard } from "../Components/DismissKeyboard";
import { LoadingIndicator } from "../Components/LoadingIndicator";

import { globalStyles, colors } from "../styles/globalStyles";

const storageRef = firebase.storage().ref();
const db = firebase.firestore();
const usersRef = db.collection("users");

export const UploadAvatar = ({ navigation }: UploadAvatarNavProps) => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state: InitialState) => state);
  const userInfo = useSelector((state: InitialState) => state.user);

  const onUploadSuccess = () => {
    if (!userInfo.relationshipId) {
      navigation.navigate("ShareYourLink");
      return;
    }
    navigation.navigate("Dashboard");
  };

  const handlePress = async () => {
    if (!userInfo.uid) return null;

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
        onUploadSuccess();
      } catch (err) {
        Alert.alert("UH OH!", err.message);
        dispatch(loaded());
      }
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.black}>
        {appInfo.loadingState && <LoadingIndicator />}
        <View style={styles.background}>
          <Image
            source={require("../assets/dancing-panda.png")}
            style={{ height: 180, width: 180, marginBottom: 30 }}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.heading}>Upload an avatar</Text>
          </View>
          <LinearGradient
            start={{ x: 0.0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.9]}
            colors={["#282C31", "#22262B"]}
            style={styles.button}
          >
            <TouchableOpacity
              style={globalStyles.mainBtns}
              onPress={handlePress}
            >
              <MaterialIcons name="image" size={75} color={colors.white} />
              <Text style={globalStyles.titleText}>UPLOAD</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={onUploadSuccess}>
            <Text style={globalStyles.littleText}>skip</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 50,
    minHeight: 300,
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
    fontSize: 28,
  },
  button: {
    ...globalStyles.btnContainer,
    width: 200,
    height: 200,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 2,

    borderStyle: "dashed",
  },
  bottom: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  littleButton: {
    color: colors.white,
    fontFamily: "montserrat-regular",
    opacity: 0.8,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 5000,
  },
});
