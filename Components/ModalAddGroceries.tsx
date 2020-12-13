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

import { loaded, loading, switchModal } from "../actions";
import { GroceryInterface, InitialState } from "../types/reducerTypes";

import firebase from "firebase";
import "firebase/firestore";

import { randomId } from "../utilities";
import { LoadingIndicator } from "./LoadingIndicator";
import { GenericInput } from "./GenericInput";
import { ThinButton } from "./ThinButton";
import { GenericHeader } from "./GenericHeader";
import { QuantityPicker } from "./QuantityPicker";

import { colors } from "../styles/globalStyles";

export const ModalAddGroceries = () => {
  const isMounted = useRef<boolean>(true);
  const appInfo = useSelector((state: InitialState) => state);
  const userInfo = useSelector((state: InitialState) => state.user);
  const dispatch = useDispatch();
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [quantityAmount, setQuantityAmount] = useState<string>("1");
  const [notes, setNotes] = useState<string>("");

  const db = firebase.firestore();
  const groceryListRef = db
    .collection("groceryLists")
    .doc(userInfo.groceryList ? userInfo.groceryList : "dummy");

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
      const getDocument = await groceryListRef.get();
      const getGroceryList: GroceryInterface[] = await getDocument.data()
        ?.groceryList;
      const newId = randomId();
      groceryListRef.set({
        groceryList: [
          {
            _id: newId,
            name: itemName,
            quantity: quantityAmount,
            notes: notes,
            completed: false,
          },
          ...getGroceryList,
        ],
      });
      setItemName("");
      setNotes("");
      setQuantityAmount("1");
      dispatch(loaded());
      dispatch(switchModal());
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleGoBack = () => {
    setItemName("");
    setNotes("");
    setQuantityAmount("1");
    dispatch(switchModal());
  };

  return (
    <Modal
      animationType="fade"
      visible={appInfo.groceryModalVisible}
      transparent={true}
      onRequestClose={() => console.log("please close me")}
    >
      <TouchableHighlight style={styles.modalBackground} onPress={handleGoBack}>
        <TouchableHighlight onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContainer}>
            {appInfo.loadingState && <LoadingIndicator />}
            <GenericHeader
              goBack={handleGoBack}
              heading="ADD ITEM"
              iconName="none"
            />
            <View style={styles.container}>
              <GenericInput
                placeholder="Enter name of item"
                onChange={(text) => setItemName(text)}
              />
              <QuantityPicker
                onValueChange={(itemValue, itemIndex) =>
                  setQuantityAmount(`${itemValue}`)
                }
                selectedValue={quantityAmount}
                isTodo={false}
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
                title="ADD ITEM"
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
