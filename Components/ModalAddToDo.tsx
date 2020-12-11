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
import { loaded, loading, switchToDoModal } from "../actions";
import { Picker } from "@react-native-community/picker";
import { randomId } from "../utilities";
import { LoadingIndicator } from "./LoadingIndicator";

export const ModalAddToDo = () => {
  const appInfo = useSelector((state: any) => state);
  const userInfo = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isEnabled, setEnabled] = useState(false);
  const [itemName, setItemName] = useState("");
  const [assign, setAssign] = useState("no one");
  const [notes, setNotes] = useState("");

  const db = firebase.firestore();
  const toDoListRef = db.collection("toDoLists").doc(userInfo.toDoList);

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

  const handleAddItem = async () => {
    dispatch(loading());
    try {
      const getDocument = await toDoListRef.get();
      const getToDoList = await getDocument.data()?.messages;
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
      dispatch(switchToDoModal());
      setItemName("");
      setNotes("");
      setAssign("no one");
      dispatch(loaded());
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={appInfo.toDoModalVisible}
      transparent={true}
      onRequestClose={() => console.log("please close me")}
    >
      <DismissKeyboard>
        <TouchableHighlight
          style={styles.modalBackground}
          onPress={() => {
            dispatch(switchToDoModal());
            setItemName("");
            setNotes("");
            setAssign("no one");
          }}
        >
          <TouchableHighlight>
            <View style={styles.modalContainer}>
              {appInfo.loadingState && <LoadingIndicator />}
              <Text style={{ ...styles.mainText, paddingBottom: 40 }}>
                ADD TO DO
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
                  <Text style={styles.mainText}>Assign</Text>
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 1, y: 1.0 }}
                    locations={[0, 1]}
                    colors={["#2C333A", "#2C333A"]}
                    style={{ ...globalStyles.inputContainer, width: 180 }}
                  >
                    <View>
                      <Picker
                        selectedValue={assign}
                        style={styles.pickerContainer}
                        mode="dialog"
                        onValueChange={(itemValue, itemIndex) =>
                          setAssign(`${itemValue}`)
                        }
                      >
                        <Picker.Item label="no one" value="no one" />
                        <Picker.Item
                          label={userInfo.partnerName}
                          value={
                            Boolean(userInfo.partnerAvatarSrc)
                              ? userInfo.partnerAvatarSrc
                              : userInfo.otherHalfUid
                          }
                        />

                        <Picker.Item
                          label={userInfo.name}
                          value={userInfo.avatarSrc}
                        />
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
                        ADD TASK
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
