import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Keyboard,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loaded, loading, toggleEditItem } from "../actions";

import firebase from "firebase";
import "firebase/firestore";

import {
  GroceryInterface,
  InitialState,
  ToDoInterface,
} from "../types/reducerTypes";
import { EditItemProps } from "../types/screenTypes";

import { GenericHeader } from "./GenericHeader";
import { LoadingIndicator } from "./LoadingIndicator";
import { GenericInput } from "./GenericInput";
import { QuantityPicker } from "./QuantityPicker";
import { ThinButton } from "./ThinButton";

import { colors } from "../styles/globalStyles";

export const EditItem = ({ item, isToDo }: EditItemProps) => {
  const appInfo = useSelector((state: InitialState) => state);
  const userInfo = useSelector((state: InitialState) => state.user);
  const isMounted = useRef<boolean>(true);
  const dispatch = useDispatch();
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [quantityAmount, setQuantityAmount] = useState<string>("");
  const [assign, setAssign] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const db = firebase.firestore();
  const groceryListRef = db
    .collection("groceryLists")
    .doc(userInfo.groceryList ? userInfo.groceryList : "dummy");
  const toDoListRef = db
    .collection("toDoLists")
    .doc(userInfo.toDoList ? userInfo.toDoList : "dummy");

  const handleGoBack = () => {
    setItemName("");
    setNotes("");
    setQuantityAmount("");
    setAssign("");
    dispatch(toggleEditItem());
  };

  const handleEditItem = async () => {
    if (!item) return;
    dispatch(loading());
    if (!isToDo) {
      try {
        const getDocument = await groceryListRef.get();
        const getGroceryList: GroceryInterface[] = await getDocument.data()
          ?.groceryList;
        const EditedArr = getGroceryList.map((food) => {
          if (food._id === item._id) {
            return {
              ...food,
              name: itemName.length ? itemName : food.name,
              quantity: quantityAmount.length ? quantityAmount : food.quantity,
              notes: notes.length ? notes : food.notes,
            };
          } else {
            return food;
          }
        });
        await groceryListRef.set({
          groceryList: EditedArr,
        });
        handleGoBack();
        dispatch(loaded());
      } catch (err) {
        Alert.alert("UH OH", err.message);
        dispatch(loaded());
      }
    } else {
      try {
        const getDocument = await toDoListRef.get();
        const getToDoList: ToDoInterface[] = await getDocument.data()?.messages;
        const EditedArr = getToDoList.map((task) => {
          if (task._id === item._id) {
            return {
              ...task,
              name: itemName.length ? itemName : task.name,
              assigned: assign.length ? assign : task.assigned,
              notes: notes.length ? notes : task.notes,
            };
          } else {
            return task;
          }
        });
        await toDoListRef.set({
          messages: EditedArr,
        });
        handleGoBack();
        dispatch(loaded());
      } catch (err) {
        Alert.alert("UH OH", err.message);
        dispatch(loaded());
      }
    }
  };

  useEffect(() => {
    if (
      itemName.length > 0 ||
      quantityAmount.length > 0 ||
      notes.length > 0 ||
      assign.length > 0
    ) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
    return () => {
      isMounted.current = false;
    };
  }, [itemName, notes, quantityAmount, assign]);

  return (
    <Modal
      animationType="fade"
      visible={appInfo.editModalVisible}
      transparent={true}
    >
      <TouchableHighlight style={styles.modalBackground} onPress={handleGoBack}>
        <TouchableHighlight onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContainer}>
            {appInfo.loadingState && <LoadingIndicator />}
            <GenericHeader
              goBack={handleGoBack}
              heading={isToDo ? "   Edit task" : "   Edit item"}
              iconName="none"
            />
            <View style={styles.container}>
              <Text style={styles.mainText}>
                {itemName.length > 0 ? itemName : item.name}
              </Text>
              <GenericInput
                onChange={(text) => setItemName(text)}
                placeholder={item.name}
              />
              <QuantityPicker
                selectedValue={
                  !isToDo
                    ? quantityAmount.length > 0
                      ? quantityAmount
                      : item.quantity
                    : assign.length > 0
                    ? assign
                    : item.assigned
                }
                onValueChange={
                  !isToDo
                    ? (itemValue, itemIndex) =>
                        setQuantityAmount(`${itemValue}`)
                    : (itemValue, itemIndex) => setAssign(`${itemValue}`)
                }
                isTodo={isToDo}
              />
              <Text style={styles.title}>Notes:</Text>
              {item.notes.length > 0 && notes.length === 0 && (
                <Text style={styles.noteText}>{item.notes}</Text>
              )}
              {notes.length > 0 && <Text style={styles.noteText}>{notes}</Text>}
              <GenericInput
                onChange={(text) => setNotes(text)}
                placeholder={
                  item.notes.length === 0 ? "Enter notes" : item.notes
                }
              />
              <View style={styles.btnContainer}>
                <ThinButton
                  colorOne="#282C31"
                  colorTwo="#22262B"
                  disabled={!isEnabled}
                  onPress={handleEditItem}
                  title="save changes"
                />
              </View>
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
  container: {
    alignItems: "center",
    paddingTop: 10,
  },
  mainText: {
    color: colors.white,
    fontFamily: "montserrat-regular",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
  },
  title: {
    color: colors.white,
    fontFamily: "montserrat-bold",
    textDecorationColor: colors.white,
    textDecorationLine: "underline",
    fontSize: 16,
    width: "100%",
    paddingHorizontal: 15,
  },

  noteText: {
    color: colors.white,
    fontFamily: "montserrat-regular",
    fontSize: 18,
    textAlign: "left",
    padding: 15,
    width: "100%",
  },

  btnContainer: {
    paddingVertical: 15,
  },
});
