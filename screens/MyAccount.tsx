import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  avatarSrcUpdate,
  loaded,
  loading,
  userNameUpdate,
  userPhoneUpdate,
} from "../actions";

import { DashboardNavProps } from "../types/navigationTypes";
import { InitialState } from "../types/reducerTypes";
import firebase from "firebase";
import "firebase/firestore";
import apiKeys from "../config/keys";

import * as ImagePicker from "expo-image-picker";

import { LoadingIndicator } from "../Components/LoadingIndicator";
import { GenericHeader } from "../Components/GenericHeader";
import { ChangeAvatar } from "../Components/ChangeAvatar";
import { DisplayPhoneNumText } from "../Components/DislpayPhoneNumText";
import { ScrollableSpacer } from "../Components/ScrollableSpacer";
import { ThinButton } from "../Components/ThinButton";
import { GenericInput } from "../Components/GenericInput";
import { AvoidKeyboard } from "../Components/AvoidKeyboard";
import { ScrollableContainer } from "../Components/ScrollableContainer";
import { LogoutButton } from "../Components/LogoutButton";

import { colors } from "../styles/globalStyles";

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

const storageRef = firebase.storage().ref();
const db = firebase.firestore();

export const MyAccount = ({ navigation }: DashboardNavProps) => {
  const isMounted = useRef<boolean>(true);
  const dispatch = useDispatch();
  const appInfo = useSelector((state: InitialState) => state);
  const userInfo = useSelector((state: InitialState) => state.user);
  const [enableNameSave, setNameEnableSave] = useState(false);
  const [name, setName] = useState("");
  const [enablePhoneSave, setPhoneEnableSave] = useState(false);
  const [phone, setPhone] = useState("");

  const usersRef = db.collection("users");

  //can only save if name is not 0 charaters
  useEffect(() => {
    if (name.length) {
      setNameEnableSave(true);
    } else {
      setNameEnableSave(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, [name]);

  useEffect(() => {
    if (phone.length > 6) {
      setPhoneEnableSave(true);
    } else {
      setPhoneEnableSave(false);
    }
    return () => {
      isMounted.current = false;
    };
  }, [phone]);

  const handlePress = async () => {
    if (!userInfo.uid) return;
    //request camera roll access
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    //allow user to choose image and crop it to an aspect of 4 by 4
    const chosenPic = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4],
    });
    //if the user does not cancel, it will upload the selected pic to firebase store
    //and update the redux store's avatarSrc
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

  //on name save, it will update firebase and the redux store
  const onNameSave = async () => {
    if (!userInfo.uid) return;
    await usersRef.doc(userInfo.uid).update({ name: name });
    dispatch(userNameUpdate(name));
  };

  //on phone number save, it will update firebase and the redux store
  const onPhoneSave = async () => {
    if (!userInfo.uid) return;
    await usersRef.doc(userInfo.uid).update({ phoneNumber: phone });
    dispatch(userPhoneUpdate(phone));
  };

  return (
    <AvoidKeyboard>
      {appInfo.loadingState && <LoadingIndicator />}
      <GenericHeader
        goBack={() => navigation.navigate("Dashboard")}
        heading="My Account"
        iconName="none"
      />

      <View style={styles.body}>
        <ScrollableContainer>
          <TouchableOpacity
            onPress={handlePress}
            style={{ ...styles.shadow, marginBottom: -15 }}
          >
            <ChangeAvatar />
          </TouchableOpacity>
          <Text style={{ ...styles.normalText, paddingVertical: 15 }}>
            {userInfo.name}
          </Text>

          <View style={{ flex: 1, alignItems: "center" }}>
            {/* <ScrollableSpacer height={40} /> */}

            <GenericInput
              placeholder="Change your name"
              onChange={(text) => setName(text)}
            />

            <ScrollableSpacer height={20} />

            <ThinButton
              colorOne="#282C31"
              colorTwo="#22262B"
              disabled={!enableNameSave}
              onPress={onNameSave}
              title="save name change"
            />

            <ScrollableSpacer height={40} />
            <DisplayPhoneNumText
              phoneNumber={userInfo.phoneNumber}
              fontSize={21}
            />
            <ScrollableSpacer height={20} />
            <GenericInput
              placeholder="Update Phone Number"
              onChange={(text) => setPhone(text)}
              keyboardType="number-pad"
            />

            <ScrollableSpacer height={20} />
            <ThinButton
              colorOne="#282C31"
              colorTwo="#22262B"
              disabled={!enablePhoneSave}
              onPress={onPhoneSave}
              title="save phone number"
            />
            <LogoutButton whereTo={() => navigation.navigate("Login")} />
          </View>
        </ScrollableContainer>
      </View>
    </AvoidKeyboard>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  body: {
    alignItems: "center",
    paddingBottom: 25,
    justifyContent: "space-between",
    flex: 1,
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
    fontSize: 23,
    fontFamily: "montserrat-semi-bold",
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },
});
