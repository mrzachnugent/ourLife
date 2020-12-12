import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  InitialState,
  GroceryInterface,
  ToDoInterface,
} from "../types/reducerTypes";
import { NavigationTitles } from "../types/navigationTypes";
import { DashboardNavProps } from "../types/navigationTypes";

import firebase from "firebase";
import "firebase/firestore";

import { switchModal, switchToDoModal, updateUser } from "../actions";

import { globalStyles } from "../styles/globalStyles";

import { ModalAddGroceries } from "../Components/ModalAddGroceries";
import { ModalAddToDo } from "../Components/ModalAddToDo";
import { HeaderDashboard } from "../Components/HeaderDashboard";
import { PartnerBigAvatar } from "../Components/PartnerBigAvatar";
import { ColorfulButton } from "../Components/ColorfulButton";
import { InfoCircle } from "../Components/InfoCircle";

export const Dashboard = ({ navigation }: DashboardNavProps) => {
  const isMounted = useRef<boolean>(true);
  const dispatch = useDispatch();

  //get user, grocery array, and toDo array from redux store
  const userInfo = useSelector((state: InitialState) => state.user);
  const appInfo = useSelector((state: InitialState) => state);
  const groArray: GroceryInterface[] = useSelector(
    (state: InitialState) => state.groceryArr
  );
  const toDoArray: ToDoInterface[] = useSelector(
    (state: InitialState) => state.toDoArr
  );

  //access firestore
  const db = firebase.firestore();
  //get user data from firestore
  const usersRef = db.collection("users");

  //update parter in redux store when partner changes their info
  const updatePartnerInfo = async () => {
    if (!userInfo.otherHalfUid || !isMounted.current) {
      return null;
    }
    try {
      usersRef.doc(userInfo.otherHalfUid).onSnapshot((doc) => {
        dispatch(
          updateUser({
            partnerName: doc.data()?.name,
            partnerAvatarSrc: doc.data()?.avatarSrc,
            partnerPhoneNumber: doc.data()?.phoneNumber,
            otherHalfUid: doc.data()?.uid,
            relationshipId: doc.data()?.relationshipId,
            chatRoom: doc.data()?.chatRoom,
            groceryList: doc.data()?.groceryList,
            toDoList: doc.data()?.toDoList,
            halfId: doc.data()?.halfId,
          })
        );
      });
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  useEffect(() => {
    updatePartnerInfo();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const changeScreen = (title: NavigationTitles) => {
    navigation.navigate(title);
  };

  const handleOnLongPressCall = () => {
    if (!userInfo.partnerPhoneNumber) {
      Alert.alert(
        "Missing Info",
        "Their phone number missing from their profile. Ask them to update their phone number."
      );
      return;
    } else {
      Linking.openURL(`tel:${userInfo.partnerPhoneNumber}`);
    }
  };

  return (
    <View style={globalStyles.noSafeArea}>
      <ModalAddGroceries />
      <ModalAddToDo />
      <View style={styles.safeShapeContainer}>
        <HeaderDashboard
          goToSetting={() => changeScreen("Settings")}
          goToMyAccount={() => changeScreen("MyAccount")}
        />
        <PartnerBigAvatar
          onPress={() => changeScreen("TheirAccount")}
          disabled={false}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ColorfulButton
          onPress={() => changeScreen("Chat")}
          title="chat"
          iconName="chat-bubble"
          colorOne="#019EF4"
          colorTwo="#2AECFB"
          onLongPress={handleOnLongPressCall}
        />
        <ColorfulButton
          onPress={() => changeScreen("Groceries")}
          title="groceries"
          iconName="local-grocery-store"
          colorOne="#14D1D1"
          colorTwo="#01A355"
          onLongPress={() => dispatch(switchModal())}
        >
          {userInfo.notifyGroceries && appInfo.groceryArr.length > 0 && (
            <InfoCircle
              size={75}
              numSize={18}
              textSize={12}
              array={groArray}
              isToDo={false}
            />
          )}
        </ColorfulButton>

        <ColorfulButton
          onPress={() => changeScreen("ToDo")}
          title="to do"
          iconName="view-list"
          colorOne="#1E89CC"
          colorTwo="#9C14C4"
          onLongPress={() => dispatch(switchToDoModal())}
        >
          {userInfo.notifyToDo && appInfo.toDoArr.length > 0 && (
            <InfoCircle
              size={75}
              numSize={18}
              textSize={0}
              array={toDoArray}
              isToDo={true}
            />
          )}
        </ColorfulButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeShapeContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 25,
    backgroundColor: "#00d9ff",
    borderBottomRightRadius: 5000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonsContainer: {
    ...globalStyles.container,
    justifyContent: "space-around",
    paddingBottom: 35,
    flex: 0.4,
  },
});
