import React, { useEffect, useRef, useState } from "react";
import { Text, View, Share, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  loaded,
  loading,
  loggedOut,
  madeConnection,
  resetToInitial,
} from "../actions";

import { ShareYourLinkNavProps } from "../types/navigationTypes";
import { InitialState } from "../types/reducerTypes";

import firebase from "firebase";
import "firebase/firestore";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { DismissKeyboard } from "../Components/DismissKeyboard";
import { LoadingIndicator } from "../Components/LoadingIndicator";
import { GenericInput } from "../Components/GenericInput";

import { globalStyles, colors } from "../styles/globalStyles";

export const ShareYourLink = ({ navigation }: ShareYourLinkNavProps) => {
  const isMounted = useRef<boolean>(true);
  const dispatch = useDispatch();
  const appInfo = useSelector((state: InitialState) => state);
  const userInfo = useSelector((state: InitialState) => state.user);
  const [connectorsCode, setConnectorsCode] = useState<string>("");
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

  const db = firebase.firestore();
  const halfIdRef = db.collection("halfId");
  const usersRef = db.collection("users");
  const relationshipRef = db.collection("relationshipId");
  const chatRoomsRef = db.collection("chatRooms");
  const groceryListsRef = db.collection("groceryLists");
  const toDoListsRef = db.collection("toDoLists");

  useEffect(() => {
    if (connectorsCode.length <= 4) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, [connectorsCode]);

  const handleOnShare = async () => {
    try {
      await Share.share({
        message: `${userInfo.halfId}`,
      });
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  const handleOnConnect = async () => {
    if (!userInfo.halfId || !userInfo.uid) return null;

    dispatch(loading());
    try {
      const doesExist = await halfIdRef.doc(connectorsCode).get();
      if (!doesExist.exists) {
        dispatch(loaded());
        Alert.alert(
          "UH OH",
          "It seems like the connect code you entered does not exist."
        );
        return;
      }
      const inRelationship = doesExist.data();
      console.log(inRelationship?.relationshipId);
      if (inRelationship?.relationshipId) {
        dispatch(loaded());
        Alert.alert(
          "UH OH",
          "It seems like you are not connected to another user."
        );
        return;
      }

      const partnerUid = inRelationship?.uid;
      const newRelationshipId = `${connectorsCode}_${userInfo.halfId}`;

      //update partners halfId document
      await halfIdRef
        .doc(connectorsCode)
        .update({ relationshipId: newRelationshipId });
      //update partners user document
      await usersRef.doc(partnerUid).update({
        otherHalfUid: userInfo.uid,
        relationshipId: newRelationshipId,
        chatRoom: `room_${newRelationshipId}`,
        groceryList: `list_${newRelationshipId}`,
        toDoList: `toDo_${newRelationshipId}`,
      });
      // update user halfId document
      await halfIdRef
        .doc(userInfo.halfId)
        .update({ relationshipId: newRelationshipId });
      //update user's user document
      await usersRef.doc(userInfo.uid).update({
        otherHalfUid: partnerUid,
        relationshipId: newRelationshipId,
        chatRoom: `room_${newRelationshipId}`,
        groceryList: `list_${newRelationshipId}`,
        toDoList: `toDo_${newRelationshipId}`,
      });
      //create relationshipId document
      await relationshipRef.doc(newRelationshipId).set({
        uidFirst: userInfo.uid,
        uidSecond: partnerUid,
      });
      //create chatroom
      await chatRoomsRef.doc(`room_${newRelationshipId}`).set({
        participants: [userInfo.uid, partnerUid],
        messages: [],
      });
      // create groceryList
      await groceryListsRef.doc(`list_${newRelationshipId}`).set({
        participants: [userInfo.uid, partnerUid],
        groceryList: [],
      });
      //create todoList
      await toDoListsRef.doc(`toDo_${newRelationshipId}`).set({
        participants: [userInfo.uid, partnerUid],
        messages: [],
      });
      //update redux store
      dispatch(
        madeConnection({
          relationshipId: newRelationshipId,
          otherHalfUid: partnerUid,
          chatRoom: `room_${newRelationshipId}`,
          groceryList: `list_${newRelationshipId}`,
          toDoList: `toDo_${newRelationshipId}`,
        })
      );
      dispatch(loaded());
      navigation.navigate("Dashboard");
    } catch (err) {
      dispatch(loaded());
      Alert.alert("Uh OH", err.message);
    }
  };

  const handleAlreadyConnected = async () => {
    dispatch(loading());
    try {
      if (!userInfo.uid) return null;
      const firestoreUser = await usersRef.doc(userInfo.uid).get();
      const relationshipId = firestoreUser.data()?.relationshipId;
      if (!relationshipId) {
        Alert.alert(
          "UH OH",
          "It seems like you are not already connected to anyone."
        );
      } else {
        dispatch(
          madeConnection({
            relationshipId: firestoreUser.data()?.relationshipId,
            otherHalfUid: firestoreUser.data()?.otherHalfUid,
          })
        );
        navigation.navigate("Dashboard");
      }
      dispatch(loaded());

      return;
    } catch (err) {
      dispatch(loaded());
      Alert.alert("Uh OH", err.message);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.black}>
        {appInfo.loadingState && <LoadingIndicator />}
        <View style={styles.background}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.heading}>Connect with someone</Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",

                marginTop: 25,
              }}
            >
              <View style={styles.topContainer}>
                <Text style={styles.littleText}>Enter their Connect Code</Text>
                <GenericInput
                  onChange={(text) => setConnectorsCode(text)}
                  placeholder="Enter connect code"
                  autoCapitalize="none"
                />

                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1, y: 1.0 }}
                  locations={[0, 1]}
                  colors={["#1E89CC", "#9C14C4"]}
                  style={
                    !enableSubmit
                      ? {
                          ...globalStyles.btnContainer,
                          width: 200,
                          opacity: 1,
                        }
                      : {
                          ...globalStyles.btnContainer,
                          width: 200,
                          opacity: 0.4,
                        }
                  }
                >
                  <TouchableOpacity
                    style={{ ...globalStyles.mainBtns, paddingVertical: 5 }}
                    disabled={enableSubmit}
                    onPress={handleOnConnect}
                  >
                    <Text style={globalStyles.titleText}>connect</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
            <Text
              style={{
                ...styles.littleText,
                textAlign: "center",
                width: 350,
                marginTop: 25,
              }}
            >
              You can connect together once someone has entered a connect code.
            </Text>
          </View>

          <TouchableOpacity
            style={{ width: "100%", marginTop: 30 }}
            onPress={handleOnShare}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                height: 180,
              }}
            >
              <Text style={styles.heading}>Your Connect code is:</Text>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 1, y: 0.0 }}
                locations={[0, 1]}
                colors={["#1E89CC", "#9C14C490"]}
                style={{
                  ...globalStyles.btnContainer,
                  borderStyle: "dotted",
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
              >
                <View style={styles.code}>
                  <Text
                    style={{
                      ...styles.heading,
                      letterSpacing: 10,
                      fontSize: 25,
                    }}
                  >
                    {userInfo.halfId}
                  </Text>
                </View>
              </LinearGradient>
              <LinearGradient
                start={{ x: 0.0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.9]}
                colors={["#282C31", "#22262B"]}
                style={{ ...globalStyles.btnContainer, width: 200 }}
              >
                <TouchableOpacity
                  style={{
                    ...globalStyles.mainBtns,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...globalStyles.titleText,
                      width: 130,
                    }}
                  >
                    SHARE
                  </Text>
                  <MaterialIcons name="share" size={36} color={colors.white} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() =>
              firebase
                .auth()
                .signOut()
                .then(() => {
                  dispatch(resetToInitial());
                })
                .then(() => navigation.navigate("Login"))
            }
          >
            <Text style={styles.littleButton}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAlreadyConnected}>
            <Text style={styles.littleButton}>Already Connected?</Text>
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
    height: "85%",
    minHeight: 550,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    marginTop: 45,
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  topContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 150,
    marginTop: 25,
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
    fontSize: 22,
  },

  bottom: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
    paddingTop: 25,
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
  littleText: {
    color: colors.white,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 25,
    width: "100%",
  },

  code: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
