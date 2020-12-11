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
import firebase from "firebase";
import "firebase/firestore";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { displayPhoneNum } from "../utilities";
import { LinearGradient } from "expo-linear-gradient";
import { loaded, loading, updateUser } from "../actions";
import { LoadingIndicator } from "../Components/LoadingIndicator";

export const TheirAccount = ({ navigation }: { navigation: any }) => {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const dispatch = useDispatch();
  const relationshipIdRef = db.collection("relationshipId");
  const chatRoomsRef = db.collection("chatRooms");
  const groceryListsRef = db.collection("groceryLists");
  const toDoListsRef = db.collection("toDoLists");
  const userInfo = useSelector((state: any) => state.user);
  const appInfo = useSelector((state: any) => state);

  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemoveConnection = async () => {
    const halfId1 = Math.random().toString(36).substring(4);
    const halfId2 = Math.random().toString(36).substring(4);

    try {
      //update partners user document
      await userRef.doc(userInfo.otherHalfUid).update({
        otherHalfUid: null,
        relationshipId: null,
        chatRoom: null,
        groceryList: null,
        toDoList: null,
        halfId: halfId1,
      });
      //create new halfId Document
      await db.collection("halfId").doc(halfId1).set({
        uid: userInfo.otherHalfUid,
        relationshipId: null,
      });
      //delete relatoinshipId document
      await relationshipIdRef.doc(userInfo.relationshipId).delete();
      //delete chatroom document
      await chatRoomsRef.doc(`room_${userInfo.relationshipId}`).delete();
      //delete groceryList document
      await groceryListsRef.doc(`list_${userInfo.relationshipId}`).delete();
      //delete toDoList document
      await toDoListsRef.doc(`toDo_${userInfo.relationshipId}`).delete();
      //update current user's document
      await userRef.doc(userInfo.uid).update({
        otherHalfUid: null,
        relationshipId: null,
        chatRoom: null,
        groceryList: null,
        toDoList: null,
        halfId: halfId2,
      });
      //create new halfId Document
      await db.collection("halfId").doc(halfId2).set({
        uid: userInfo.uid,
        relationshipId: null,
      });
      dispatch(
        updateUser({
          otherHalfUid: null,
          relationshipId: null,
          chatRoom: null,
          groceryList: null,
          toDoList: null,
          halfId: halfId2,
        })
      );
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleRemoveBtn = async () => {
    dispatch(loading());
    Promise.all([handleRemoveConnection]).then(() => dispatch(loaded()));
  };

  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      {appInfo.loadingState && <LoadingIndicator />}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableHighlight>
          <Text style={globalStyles.titleText}>{userInfo.partnerName}</Text>
        </TouchableHighlight>

        <View style={{ width: 30 }} />
      </View>
      <View style={styles.body}>
        <View style={styles.centerAvatar}>
          {userInfo.partnerAvatarSrc ? (
            <Image
              // source={require("../assets/mel-avatar.jpg")}
              source={{ uri: userInfo.partnerAvatarSrc }}
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
        </View>
        <Text
          style={
            userInfo.partnerPhoneNumber
              ? styles.normalText
              : { ...styles.normalText, opacity: 0.2 }
          }
        >
          {!userInfo.partnerPhoneNumber
            ? "(555) 555-5555"
            : displayPhoneNum(userInfo.partnerPhoneNumber)}
        </Text>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1, y: 1.0 }}
          locations={[0, 1]}
          colors={["#861010", "#cc1e1e"]}
          style={globalStyles.btnContainer}
        >
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() =>
              Alert.alert(
                "ARE YOU SURE?",
                "This will permenantly delete the connection and any data that is shared between you. This includes lists and messages.",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Yes I'm sure",
                    style: "destructive",
                    onPress: handleRemoveConnection,
                  },
                ]
              )
            }
          >
            <Text style={{ ...globalStyles.titleText, fontSize: 16 }}>
              remove connection
            </Text>
          </TouchableOpacity>
        </LinearGradient>
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
  centerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 275,
    height: 275,
    backgroundColor: colors.black,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 500,
    marginBottom: 30,
  },

  body: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
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
