import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "firebase";
import "firebase/firestore";
import { colors } from "../styles/globalStyles";

import {
  loaded,
  loading,
  switchToDoModal,
  toggleEditItem,
  updateToDoList,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { moveToTheBack, moveToTheFront, removeSingleItem } from "../utilities";
import { LoadingIndicator } from "../Components/LoadingIndicator";
import { ModalAddToDo } from "../Components/ModalAddToDo";
import { DashboardNavProps } from "../types/navigationTypes";
import { InitialState, ToDoInterface } from "../types/reducerTypes";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { GenericHeader } from "../Components/GenericHeader";
import { SideButton } from "../Components/SideButton";
import { InfoCircle } from "../Components/InfoCircle";
import { ListItem } from "../Components/ListItem";
import { EditItem } from "../Components/EditItem";

export const ToDo = ({ navigation }: DashboardNavProps) => {
  const isMounted = useRef<boolean>(true);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: InitialState) => state.user);
  const appInfo = useSelector((state: InitialState) => state);
  const toDoArray: ToDoInterface[] = useSelector(
    (state: InitialState) => state?.toDoArr
  );

  const db = firebase.firestore();
  const toDoListDb = db.collection("toDoLists");
  const [chosenItem, setChosenItem] = useState<ToDoInterface>({
    _id: "dummy",
    completed: false,
    name: "dummy",
    notes: "dummy",
    assigned: "dummy",
  });
  const updateReduxToDo = async () => {
    if (!userInfo.toDoList) return;
    try {
      const toDoListRef = toDoListDb.doc(userInfo.toDoList);
      toDoListRef.onSnapshot((doc) => {
        dispatch(updateToDoList(doc.data()?.messages));
      });
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  //when completed, item goes to the bottom of the list
  //when unchecked, item goes to the top of the list
  const handleCompleted = async (item: ToDoInterface) => {
    if (!userInfo.toDoList) return;
    dispatch(loading());
    try {
      const toDoListRef = toDoListDb.doc(userInfo.toDoList);
      const getDocument = await toDoListRef.get();
      const getToDoList = await getDocument.data()?.messages;
      if (!item.completed) {
        const newOrder = await moveToTheBack(getToDoList, item);
        toDoListRef.set({
          messages: [...newOrder],
        });
        dispatch(loaded());
        return;
      } else {
        const uncheckNewOrder = await moveToTheFront(getToDoList, item);
        await toDoListRef.set({
          messages: [...uncheckNewOrder],
        });
        dispatch(loaded());
        return;
      }
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleDeleteAll = async () => {
    if (!userInfo.toDoList) return;
    dispatch(loading());
    try {
      const toDoListRef = toDoListDb.doc(userInfo.toDoList);
      toDoListRef.set({
        messages: [],
      });
      dispatch(loaded());
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleDeleteSingleItem = async (item: ToDoInterface) => {
    if (!userInfo.toDoList) return;
    dispatch(loading());
    try {
      const toDoListRef = toDoListDb.doc(userInfo.toDoList);
      const getDocument = await toDoListRef.get();
      const getTodoList: [] = await getDocument.data()?.messages;

      const newList: [] = await removeSingleItem(getTodoList, item);
      toDoListRef.set({
        messages: [...newList],
      });
      dispatch(loaded());
      return;
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleDeleteButton = () => {
    Alert.alert(
      "ARE YOU SURE?",
      "This will permenantly delete the entire todo list for you and your connection.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, I'm sure",
          style: "destructive",
          onPress: handleDeleteAll,
        },
      ]
    );
  };
  const handleDeleteSingleItemButton = (item: ToDoInterface) => {
    Alert.alert("DELETE ITEM?", `Do you want to delete ${item.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => handleDeleteSingleItem(item),
      },
    ]);
  };

  const handleSelectItem = (item: ToDoInterface) => {
    setChosenItem(item);
    dispatch(toggleEditItem());
  };

  useEffect(() => {
    updateReduxToDo();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <DismissKeyboard>
      {appInfo.loadingState && <LoadingIndicator />}
      <ModalAddToDo />
      <EditItem item={chosenItem} isToDo={true} />
      <GenericHeader
        goBack={() => navigation.navigate("Dashboard")}
        heading="TO DO"
        iconName="none"
      >
        <Image
          source={require("../assets/yoga-sloth.png")}
          style={{ width: 50, height: 50, marginLeft: 20 }}
        />
      </GenericHeader>

      <View style={styles.infoSection}>
        <SideButton
          text="ADD"
          onPress={() => dispatch(switchToDoModal())}
          iconName="plus"
        />
        <InfoCircle
          size={175}
          numSize={35}
          textSize={0}
          array={toDoArray}
          isToDo={true}
          isBig={true}
        />
        <SideButton
          disabled={!appInfo.toDoArr.length}
          onPress={handleDeleteButton}
          iconName="trash"
          text="ALL"
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.titleText}>TASKS</Text>
        {Boolean(toDoArray) && toDoArray.length !== 0 && (
          <ScrollView style={styles.listView}>
            {toDoArray.map((item: any) => {
              return (
                <ListItem
                  item={item}
                  onLongPress={handleDeleteSingleItemButton}
                  onPress={() => handleSelectItem(item)}
                  onCompleted={handleCompleted}
                  colorOne="#1E89CC"
                  colorTwo="#9C14C4"
                  key={item._id}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 15,
  },

  body: {
    padding: 15,
    flex: 1,
  },
  titleText: {
    color: colors.white,
    fontSize: 25,
    fontFamily: "montserrat-bold",
    paddingBottom: 10,
  },

  listView: {
    flex: 1,
  },
});
