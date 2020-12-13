import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  loaded,
  loading,
  switchGroceryNotification,
  switchTaskNotification,
} from "../actions";

import firebase from "firebase";
import "firebase/firestore";

import { globalStyles } from "../styles/globalStyles";

import { LoadingIndicator } from "../Components/LoadingIndicator";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { GenericHeader } from "../Components/GenericHeader";
import { LogoutButton } from "../Components/LogoutButton";

export const Settings = ({ navigation }: { navigation: any }) => {
  const isMounted = useRef<boolean>(true);
  const userInfo = useSelector((state: any) => state.user);
  const appInfo = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const usersRef = db.collection("users");

  const handleSwitchGroceries = async () => {
    if (!isMounted.current || !userInfo.uid) return;
    dispatch(loading());
    try {
      await usersRef
        .doc(userInfo.uid)
        .update({ notifyGroceries: !userInfo.notifyGrocies });
      dispatch(switchGroceryNotification(!userInfo.notifyGroceries));
      dispatch(loaded());
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };
  const handleSwitchToDo = async () => {
    if (!isMounted.current || !userInfo.uid) return;
    dispatch(loading());
    try {
      await usersRef
        .doc(userInfo.uid)
        .update({ notifyToDo: !userInfo.notifyToDo });
      dispatch(switchTaskNotification(!userInfo.notifyToDo));
      dispatch(loaded());
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <DismissKeyboard>
      {appInfo.loadingState && <LoadingIndicator />}
      <GenericHeader
        goBack={() => navigation.navigate("Dashboard")}
        heading="Settings"
        iconName="none"
      />

      <View style={styles.body}>
        <View style={{ flex: 0.15 }}>
          <Text style={globalStyles.littleText}>
            Additional info will only be shown on the dashboard if the list is
            not empty.
          </Text>
        </View>

        <TouchableOpacity onPress={handleSwitchGroceries}>
          <View style={styles.onOffNotification}>
            <Image
              source={
                userInfo.notifyGroceries
                  ? require("../assets/btn-on.png")
                  : require("../assets/btn-off.png")
              }
            />
            <Text style={styles.text}>Show groceries additional info</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSwitchToDo}>
          <View style={styles.onOffNotification}>
            <Image
              source={
                userInfo.notifyToDo
                  ? require("../assets/btn-on.png")
                  : require("../assets/btn-off.png")
              }
            />
            <Text style={styles.text}>Show todo additional info</Text>
          </View>
        </TouchableOpacity>

        <LogoutButton whereTo={() => navigation.navigate("Login")} />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  onOffNotification: {
    flexDirection: "row",
    alignItems: "center",
  },

  body: {
    justifyContent: "space-evenly",
    flex: 1,
    paddingHorizontal: 20,
  },

  text: {
    ...globalStyles.littleText,
    textAlign: "left",
    width: 250,
  },
});
