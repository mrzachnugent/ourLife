import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  loaded,
  loading,
  switchGroceryNotification,
  switchMsgNotification,
  switchTaskNotification,
  switchToDoModal,
} from "../actions";
import firebase from "firebase";
import "firebase/firestore";
import { LoadingIndicator } from "../Components/LoadingIndicator";

export const Settings = ({ navigation }: { navigation: any }) => {
  const userInfo = useSelector((state: any) => state.user);
  const appInfo = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const usersRef = db.collection("users");

  const handleSwitchGroceries = async () => {
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
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      {appInfo.loadingState && <LoadingIndicator />}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableHighlight>
          <Text style={globalStyles.titleText}>Settings</Text>
        </TouchableHighlight>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.body}>
        <View>
          <Text
            style={{
              ...globalStyles.littleText,
            }}
          >
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
            <Text
              style={{
                ...globalStyles.littleText,
                textAlign: "left",
                width: 250,
              }}
            >
              show grocries additional info
            </Text>
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
            <Text
              style={{
                ...globalStyles.littleText,
                textAlign: "left",
                width: 260,
              }}
            >
              show todo additional info
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  onOffNotification: {
    flexDirection: "row",
    alignItems: "center",
  },

  body: {
    justifyContent: "space-evenly",
    flex: 1,
    paddingHorizontal: 20,
  },
});
