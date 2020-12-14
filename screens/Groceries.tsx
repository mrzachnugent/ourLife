import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import {
  loaded,
  loading,
  switchModal,
  toggleEditItem,
  updateGroceryList,
} from "../actions";

import { GroceryInterface, InitialState } from "../types/reducerTypes";
import { DashboardNavProps } from "../types/navigationTypes";

import firebase from "firebase";
import "firebase/firestore";

import { moveToTheBack, moveToTheFront, removeSingleItem } from "../utilities";

import { ModalAddGroceries } from "../Components/ModalAddGroceries";
import { LoadingIndicator } from "../Components/LoadingIndicator";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { GenericHeader } from "../Components/GenericHeader";
import { SideButton } from "../Components/SideButton";
import { InfoCircle } from "../Components/InfoCircle";
import { ListItem } from "../Components/ListItem";

import { colors } from "../styles/globalStyles";
import { EditItem } from "../Components/EditItem";

export const Groceries = ({ navigation }: DashboardNavProps) => {
  const isMounted = useRef<boolean>(true);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: InitialState) => state.user);
  const appInfo = useSelector((state: InitialState) => state);
  const groArray: GroceryInterface[] = useSelector(
    (state: InitialState) => state?.groceryArr
  );
  const db = firebase.firestore();
  const groceryListDb = db.collection("groceryLists");
  const [chosenItem, setChosenItem] = useState<GroceryInterface>({
    _id: "1",
    completed: false,
    name: "Sorry",
    notes: "Please close",
    quantity: "1",
  });

  //listens to changes made by connection and updates in real-time
  const updateReduxGroceries = async () => {
    if (!userInfo.groceryList) return;
    try {
      const groceryListRef = groceryListDb.doc(userInfo.groceryList);
      groceryListRef.onSnapshot((doc) => {
        if (!isMounted.current) return;
        dispatch(updateGroceryList(doc.data()?.groceryList));
      });
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  //if item is completed, it goes to the bottom of the list
  //if the item is unchecked, it goes to the top of the list
  const handleCompleted = async (item: GroceryInterface) => {
    if (!userInfo.groceryList) return;
    dispatch(loading());
    try {
      const groceryListRef = groceryListDb.doc(userInfo.groceryList);
      const getDocument = await groceryListRef.get();
      const getGroceryList = await getDocument.data()?.groceryList;
      if (!item.completed) {
        const newOrder = await moveToTheBack(getGroceryList, item);
        groceryListRef.set({
          groceryList: [...newOrder],
        });
        dispatch(loaded());
        return;
      } else {
        const uncheckNewOrder = await moveToTheFront(getGroceryList, item);
        groceryListRef.set({
          groceryList: [...uncheckNewOrder],
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
    if (!userInfo.groceryList) return;
    dispatch(loading());
    try {
      const groceryListRef = groceryListDb.doc(userInfo.groceryList);
      groceryListRef.set({
        groceryList: [],
      });
      dispatch(loaded());
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleDeleteSingleItem = async (item: GroceryInterface) => {
    if (!userInfo.groceryList) return;
    dispatch(loading());
    try {
      const groceryListRef = groceryListDb.doc(userInfo.groceryList);
      const getDocument = await groceryListRef.get();
      const getGroceryList: GroceryInterface[] = await getDocument.data()
        ?.groceryList;

      const newList: GroceryInterface[] = await removeSingleItem(
        getGroceryList,
        item
      );
      await groceryListRef.set({
        groceryList: [...newList],
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
      "This will permenantly delete the entire grocery list for you and your connection.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes I'm sure",
          style: "destructive",
          onPress: handleDeleteAll,
        },
      ]
    );
  };
  const handleDeleteSingleItemButton = (item: GroceryInterface) => {
    Alert.alert("DELETE ITEM?", `Do you want to delete ${item.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => handleDeleteSingleItem(item),
      },
    ]);
  };

  const handleSelectItem = (item: GroceryInterface) => {
    setChosenItem(item);
    dispatch(toggleEditItem());
  };

  useEffect(() => {
    updateReduxGroceries();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <DismissKeyboard>
      {appInfo.loadingState && <LoadingIndicator />}
      <ModalAddGroceries />
      <EditItem item={chosenItem} isToDo={false} />
      <GenericHeader
        goBack={() => navigation.navigate("Dashboard")}
        heading="GROCERIES"
        iconName="none"
      >
        <Image
          source={require("../assets/dancing-panda.png")}
          style={{ width: 50, height: 50, marginLeft: 20 }}
        />
      </GenericHeader>
      <View style={styles.infoSection}>
        <SideButton
          text="ADD"
          onPress={() => dispatch(switchModal())}
          iconName="plus"
        />
        <InfoCircle
          size={175}
          numSize={35}
          textSize={22}
          array={groArray}
          isToDo={false}
          isBig={true}
        />
        <SideButton
          disabled={!appInfo.groceryArr.length}
          onPress={handleDeleteButton}
          iconName="trash"
          text="ALL"
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.titleText}>PICK UP</Text>
        {Boolean(groArray) && groArray.length !== 0 && (
          <ScrollView style={styles.listView}>
            {groArray.map((item: GroceryInterface) => {
              return (
                <ListItem
                  item={item}
                  onLongPress={handleDeleteSingleItemButton}
                  onPress={() => handleSelectItem(item)}
                  onCompleted={handleCompleted}
                  colorOne="#01A355"
                  colorTwo="#14D1D1"
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
    paddingHorizontal: 15,
    paddingBottom: 20,
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
