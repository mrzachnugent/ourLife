import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loaded, loading, switchToDoModal } from "../actions";

import { InitialState, ToDoInterface } from "../types/reducerTypes";

import firebase from "firebase";
import "firebase/firestore";

import { randomId } from "../utilities";

import { LoadingIndicator } from "./LoadingIndicator";
import { GenericHeader } from "./GenericHeader";
import { GenericInput } from "./GenericInput";
import { QuantityPicker } from "./QuantityPicker";
import { ThinButton } from "./ThinButton";

import { colors } from "../styles/globalStyles";

export const ModalAddToDo = () => {
  const isMounted = useRef<boolean>(true);
  const appInfo = useSelector((state: InitialState) => state);
  const userInfo = useSelector((state: InitialState) => state.user);
  const dispatch = useDispatch();
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [assign, setAssign] = useState<string>("no one");
  const [notes, setNotes] = useState<string>("");

  const db = firebase.firestore();
  const toDoListRef = db
    .collection("toDoLists")
    .doc(userInfo.toDoList ? userInfo.toDoList : "dummy");

  useEffect(() => {
    if (itemName.length) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
    return () => {
      isMounted.current = false;
    };
  }, [itemName]);

  const handleAddItem = async () => {
    dispatch(loading());
    try {
      const getDocument = await toDoListRef.get();
      const getToDoList: ToDoInterface[] = await getDocument.data()?.messages;
      const newId = randomId();
      toDoListRef.set({
        messages: [
          {
            _id: newId,
            name: itemName,
            assigned: assign,
            notes: notes,
            completed: false,
          },
          ...getToDoList,
        ],
      });
      setItemName("");
      setNotes("");
      setAssign("no one");
      dispatch(loaded());
      dispatch(switchToDoModal());
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleGoBack = () => {
    setItemName("");
    setNotes("");
    setAssign("no one");
    dispatch(switchToDoModal());
  };

  return (
    <Modal
      animationType="fade"
      visible={appInfo.toDoModalVisible}
      transparent={true}
      onRequestClose={() => console.log("please close me")}
    >
      <TouchableHighlight
        style={styles.modalBackground}
        onPress={() => {
          dispatch(switchToDoModal());
          setItemName("");
          setNotes("");
          setAssign("no one");
        }}
      >
        <TouchableHighlight onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContainer}>
            {appInfo.loadingState && <LoadingIndicator />}
            <GenericHeader
              goBack={handleGoBack}
              heading="ADD TASK"
              iconName="none"
            />

            <View style={styles.container}>
              <GenericInput
                placeholder="Enter task"
                onChange={(text) => setItemName(text)}
              />
              <QuantityPicker
                onValueChange={(itemValue, itemIndex) =>
                  setAssign(`${itemValue}`)
                }
                selectedValue={assign}
                isTodo={true}
              />

              <View style={styles.notesContainer}>
                <Text style={styles.mainText}>Add Notes</Text>
                <GenericInput
                  placeholder="Enter notes"
                  onChange={(text) => setNotes(text)}
                />
              </View>
              <ThinButton
                colorOne="#282C31"
                colorTwo="#22262B"
                disabled={!isEnabled}
                onPress={handleAddItem}
                title="ADD TASK"
              />
            </View>
          </View>
        </TouchableHighlight>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#00000090",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  modalContainer: {
    backgroundColor: colors.black,
    borderRadius: 20,
    borderColor: "#111",
    borderWidth: 5,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  mainText: {
    color: colors.white,
    fontFamily: "montserrat-semi-bold",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 15,
  },

  notesContainer: {
    paddingBottom: 40,
  },
  container: {
    alignItems: "center",
    paddingTop: 40,
  },
});
