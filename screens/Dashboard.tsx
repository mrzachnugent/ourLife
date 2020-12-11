import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";
import "firebase/firestore";

import {
  switchModal,
  updateChatArrLenth,
  updateGroceryList,
  updateToDoList,
  updateUser,
} from "../actions";

import { colors, globalStyles } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getIncompleteItems, getTaskPercentage } from "../utilities";
import { ModalAddGroceries } from "../Components/ModalAddGroceries";

export const Dashboard = ({ navigation }: { navigation: any }) => {
  const userInfo = useSelector((state: any) => state.user);
  const appInfo = useSelector((state: any) => state);
  const groArray: any = useSelector((state: any) => state?.groceryArr);
  const toDoArray: any = useSelector((state: any) => state?.toDoArr);
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  const dispatch = useDispatch();
  const groceryListRef = db
    .collection("groceryLists")
    .doc(userInfo.groceryList);
  const toDoListRef = db.collection("toDoLists").doc(userInfo.toDoList);
  const messagesRef = db
    .collection("chatRooms")
    .doc(`room_${userInfo.relationshipId}`)
    .collection("messages");

  const updatePartnerInfo = async () => {
    if (!userInfo.otherHalfUid) {
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

  const getGroceryListFromFirebase = async () => {
    if (!userInfo.groceryList) {
      return null;
    }
    try {
      const getDocument = await groceryListRef.get();
      const getGroceryList = await getDocument.data()?.groceryList;
      dispatch(updateGroceryList(getGroceryList));
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };
  const getToDoListFromFirebase = async () => {
    if (!userInfo.toDoList) {
      return null;
    }
    try {
      const getDocument = await toDoListRef.get();
      const getToDoList = await getDocument.data()?.messages;
      dispatch(updateToDoList(getToDoList));
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (!userInfo.relationshipId) {
      navigation.navigate("ShareYourLink");
    }

    updatePartnerInfo();
    getGroceryListFromFirebase();
    getToDoListFromFirebase();

    return () => {
      updatePartnerInfo();
      isMounted = false;
    };
  }, []);

  return (
    <View style={globalStyles.noSafeArea}>
      <ModalAddGroceries />
      <View style={styles.safeShapeContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={styles.smallbtn}
          >
            <MaterialIcons
              name="settings"
              size={24}
              color={colors.white}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyAccount")}
            style={styles.smallbtn}
          >
            {userInfo.avatarSrc ? (
              <Image
                // source={require("../assets/mel-avatar.jpg")}
                source={{ uri: userInfo.avatarSrc }}
                style={{
                  width: 55,
                  height: 55,
                  opacity: 1,
                  borderRadius: 500,
                }}
              />
            ) : (
              <MaterialIcons
                name="person"
                size={25}
                color={colors.white}
                style={{ padding: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("TheirAccount")}
          style={styles.shadow}
        >
          <View style={styles.centerAvatar}>
            {userInfo.partnerAvatarSrc ? (
              <Image
                source={{ uri: userInfo.partnerAvatarSrc }}
                style={{
                  width: "99.8%",
                  height: "99.8%",
                  opacity: 1,
                  borderRadius: 500,
                }}
              />
            ) : (
              <MaterialIcons name="person" size={200} color={colors.white} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...globalStyles.container,
          justifyContent: "space-around",
          paddingVertical: 25,
          flex: 0.4,
        }}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1, y: 1.0 }}
          locations={[0, 1]}
          colors={["#019EF4", "#2AECFB"]}
          style={globalStyles.btnContainer}
        >
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={globalStyles.titleText}>chat</Text>
            <MaterialIcons
              name="chat-bubble"
              size={50}
              color={colors.white}
              style={styles.rightIcon}
            />
            {appInfo.chatArrLength > appInfo.lastChatArrLength && (
              <View style={styles.newMsg}>
                <Text style={styles.newMsgText}>NEW</Text>
              </View>
            )}
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1, y: 0.0 }}
          locations={[0, 1]}
          colors={["#14D1D1", "#01A355"]}
          style={globalStyles.btnContainer}
        >
          {Boolean(groArray) &&
            getIncompleteItems(groArray).length !== 0 &&
            userInfo.notifyGroceries && (
              <View style={styles.infoCircle}>
                <Text style={styles.infoNumber}>
                  {getIncompleteItems(groArray).length}
                </Text>
                <Text style={styles.infoItemText}>
                  {getIncompleteItems(groArray).length === 0
                    ? "items"
                    : getIncompleteItems(groArray).length === 1
                    ? "item"
                    : "items"}
                </Text>
              </View>
            )}
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() => navigation.navigate("Groceries")}
            onLongPress={() => dispatch(switchModal())}
          >
            <Text style={globalStyles.titleText}>groceries</Text>
            <MaterialIcons
              name="local-grocery-store"
              size={50}
              color={colors.white}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1, y: 1.0 }}
          locations={[0, 1]}
          colors={["#1E89CC", "#9C14C4"]}
          style={globalStyles.btnContainer}
        >
          {Boolean(toDoArray) && toDoArray.length !== 0 && userInfo.notifyToDo && (
            <View style={{ ...styles.infoCircle, borderColor: "#9C14C4" }}>
              <Text style={styles.infoNumber}>
                {`${getTaskPercentage(toDoArray)}%`}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() => navigation.navigate("ToDo")}
            onLongPress={() => {
              console.log("TODO: add new todo");
            }}
          >
            <Text style={globalStyles.titleText}>to do</Text>
            <MaterialIcons
              name="view-list"
              size={50}
              color={colors.white}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeShapeContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 25 : 0,
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    width: "100%",
  },
  centerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 275,
    height: 275,
    backgroundColor: colors.black,
    borderColor: "#53CCED",
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
  rightIcon: {
    position: "absolute",
    right: 15,
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },

  smallbtn: {
    backgroundColor: colors.black,
    borderRadius: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  infoCircle: {
    backgroundColor: "#0c0c0c",
    position: "absolute",
    left: 0,
    top: -10,
    height: 75,
    width: 75,
    borderRadius: 5000,
    color: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#01A355",
  },
  infoNumber: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "montserrat-bold",
  },
  infoItemText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "montserrat-bold",
  },
  newMsg: {
    position: "absolute",
    right: 22,
    top: 10,
  },
  newMsgText: {
    fontFamily: "montserrat-black",
    color: "#cc0000",
  },
});
