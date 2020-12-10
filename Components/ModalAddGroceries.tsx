import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { colors, globalStyles } from "../styles/globalStyles";
import { DismissKeyboard } from "./DismissKeyboard";
import { addNewGroceryItem, switchModal } from "../actions";
import { Picker } from "@react-native-community/picker";
import { randomId } from "../utilities";

export const ModalAddGroceries = () => {
  const appInfo = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [isEnabled, setEnabled] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantityAmount, setQuantityAmount] = useState("1");
  const [notes, setNotes] = useState("");

  const db = firebase.firestore();

  useEffect(() => {
    let isMounted = true;
    if (itemName.length) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
    return () => {
      isMounted = true;
    };
  }, [itemName]);

  const dispatchAsync = async () => {
    const newId = randomId();
    dispatch(
      addNewGroceryItem({
        _id: newId,
        name: itemName,
        quantity: quantityAmount,
        notes: notes,
        completed: false,
      })
    );

    return;
  };

  const handleAddItem = async () => {
    try {
      await dispatchAsync();
      await db
        .collection("groceryLists")
        .doc(appInfo.user.groceryList)
        .update({ groceryList: appInfo.groceryArr });
      dispatch(switchModal());
      setItemName("");
      setNotes("");
      setQuantityAmount("1");
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={appInfo.groceryModalVisible}
      transparent={true}
      onRequestClose={() => console.log("please close me")}
    >
      <DismissKeyboard>
        <TouchableHighlight
          style={styles.modalBackground}
          onPress={() => {
            dispatch(switchModal());
          }}
        >
          <TouchableHighlight>
            <View style={styles.modalContainer}>
              <Text style={{ ...styles.mainText, paddingBottom: 40 }}>
                ADD GROCERIES
              </Text>
              <View>
                <LinearGradient
                  start={{ x: 0.0, y: 0.25 }}
                  end={{ x: 1, y: 1.0 }}
                  locations={[0, 1]}
                  colors={["#2C333A", "#2C333A"]}
                  style={{ ...globalStyles.inputContainer, width: 300 }}
                >
                  <TextInput
                    placeholder="Enter name of item"
                    placeholderTextColor="#FFFFFF75"
                    style={globalStyles.input}
                    onChangeText={(text) => setItemName(text)}
                  />
                </LinearGradient>
                <View style={styles.quantityContainer}>
                  <Text style={styles.mainText}>Quantity</Text>
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 1, y: 1.0 }}
                    locations={[0, 1]}
                    colors={["#2C333A", "#2C333A"]}
                    style={{ ...globalStyles.inputContainer, width: 100 }}
                  >
                    <View>
                      <Picker
                        selectedValue={quantityAmount}
                        style={styles.pickerContainer}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) =>
                          setQuantityAmount(`${itemValue}`)
                        }
                      >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="9+" value="9+" />
                      </Picker>
                    </View>
                  </LinearGradient>
                </View>
                <View style={styles.notesContainer}>
                  <Text style={styles.mainText}>Add Notes</Text>
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 1, y: 1.0 }}
                    locations={[0, 1]}
                    colors={["#2C333A", "#2C333A"]}
                    style={{ ...globalStyles.inputContainer, width: 300 }}
                  >
                    <TextInput
                      placeholder="Enter notes"
                      placeholderTextColor="#FFFFFF75"
                      style={globalStyles.input}
                      onChangeText={(text) => setNotes(text)}
                    />
                  </LinearGradient>
                </View>
                <View style={{ alignItems: "center" }}>
                  <LinearGradient
                    start={{ x: 0.0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.9]}
                    colors={["#282C31", "#22262B"]}
                    style={
                      isEnabled
                        ? { ...globalStyles.btnContainer, width: 200 }
                        : {
                            ...globalStyles.btnContainer,
                            width: 200,
                            opacity: 0.5,
                          }
                    }
                  >
                    <TouchableOpacity
                      style={globalStyles.mainBtns}
                      disabled={!isEnabled}
                      onPress={handleAddItem}
                    >
                      <Text
                        style={{
                          ...styles.mainText,
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                      >
                        ADD ITEM
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </TouchableHighlight>
      </DismissKeyboard>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#00000050",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 25,
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 15,
  },
  pickerContainer: {
    color: colors.white,
    fontSize: 45,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 15,
  },
  notesContainer: {
    paddingBottom: 40,
  },
});
