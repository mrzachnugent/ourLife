import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loaded, loading, updateUser } from "../actions";

import { InitialState } from "../types/reducerTypes";

import firebase from "firebase";
import "firebase/firestore";

import { MaterialIcons } from "@expo/vector-icons";

import { LoadingIndicator } from "../Components/LoadingIndicator";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { GenericHeader } from "../Components/GenericHeader";
import { PartnerBigAvatar } from "../Components/PartnerBigAvatar";
import { ThinButton } from "../Components/ThinButton";

import { colors } from "../styles/globalStyles";
import { DisplayPhoneNumText } from "../Components/DislpayPhoneNumText";

export const TheirAccount = ({ navigation }: { navigation: any }) => {
  const isMounted = useRef<boolean>(true);
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const dispatch = useDispatch();
  const relationshipIdRef = db.collection("relationshipId");
  const chatRoomsRef = db.collection("chatRooms");
  const groceryListsRef = db.collection("groceryLists");
  const toDoListsRef = db.collection("toDoLists");
  const userInfo = useSelector((state: InitialState) => state.user);
  const appInfo = useSelector((state: InitialState) => state);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  //removes the connection and resets/deletes relationship data
  const handleRemoveConnection = async () => {
    if (
      !isMounted.current ||
      !userInfo.otherHalfUid ||
      !userInfo.relationshipId ||
      !userInfo.uid
    ) {
      return;
    }
    const halfId1 = Math.random().toString(36).substring(6);
    const halfId2 = Math.random().toString(36).substring(7);
    dispatch(loading());
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
      //create partners halfId Document
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
      dispatch(loaded());
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleOnPressRemoveConnection = () => {
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
    );
  };

  return (
    <DismissKeyboard>
      {appInfo.loadingState && <LoadingIndicator />}
      <GenericHeader
        goBack={() => navigation.navigate("Dashboard")}
        heading={userInfo.partnerName ? userInfo.partnerName : "No name"}
        iconName="none"
      />

      <View style={styles.body}>
        <PartnerBigAvatar disabled={true} onPress={() => null} />
        <TouchableOpacity
          disabled={!userInfo.partnerPhoneNumber}
          onPress={() => Linking.openURL(`tel:${userInfo.partnerPhoneNumber}`)}
          style={styles.phoneButton}
        >
          <MaterialIcons
            name="phone"
            size={25}
            color={colors.white}
            style={{ marginRight: 10 }}
          />
          <DisplayPhoneNumText
            phoneNumber={userInfo.partnerPhoneNumber}
            fontSize={23}
          />
        </TouchableOpacity>
        <ThinButton
          colorOne="#861010"
          colorTwo="#cc1e1e"
          onPress={handleOnPressRemoveConnection}
          title="remove connection"
          disabled={false}
        />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    paddingBottom: 45,
  },

  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
