import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import "firebase/firestore";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ModalAddGroceries } from "../Components/ModalAddGroceries";
import { loaded, loading, switchModal, updateGroceryList } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncompleteItems,
  moveToTheBack,
  moveToTheFront,
  removeSingleItem,
} from "../utilities";
import { LoadingIndicator } from "../Components/LoadingIndicator";

export const Groceries = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user);
  const appInfo = useSelector((state: any) => state);
  const groArray: [] = useSelector((state: any) => state?.groceryArr);
  const db = firebase.firestore();
  const groceryListRef = db
    .collection("groceryLists")
    .doc(userInfo.groceryList);

  const updateReduxGroceries = async () => {
    try {
      groceryListRef.onSnapshot((doc) => {
        dispatch(updateGroceryList(doc.data()?.groceryList));
      });
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  const handleCompleted = async (item: any) => {
    dispatch(loading());
    try {
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
    dispatch(loading());
    try {
      groceryListRef.set({
        groceryList: [],
      });
      dispatch(loaded());
    } catch (err) {
      Alert.alert("UH OH", err.message);
      dispatch(loaded());
    }
  };

  const handleDeleteSingleItem = async (item: any) => {
    dispatch(loading());
    try {
      const getDocument = await groceryListRef.get();
      const getGroceryList: [] = await getDocument.data()?.groceryList;

      const newList: [] = await removeSingleItem(getGroceryList, item);
      groceryListRef.set({
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
  const handleDeleteSingleItemButton = (item: any) => {
    Alert.alert("DELETE ITEM?", `Do you want to delete ${item.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => handleDeleteSingleItem(item),
      },
    ]);
  };

  useEffect(() => {
    let isMounted = true;

    updateReduxGroceries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={styles.container}>
        {appInfo.loadingState && <LoadingIndicator />}
        <ModalAddGroceries />
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={globalStyles.pageTitleText}>GROCERIES</Text>
          <Image
            source={require("../assets/dancing-panda.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View />
      </View>
      <View style={styles.infoSection}>
        <LinearGradient
          start={{ x: 0.0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.9]}
          colors={["#282C31", "#22262B"]}
          style={styles.button}
        >
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() => dispatch(switchModal())}
          >
            <Feather name="plus" size={40} color={colors.white} />
            <Text style={globalStyles.littleText}>ADD</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.infoCircle}>
            <Text style={styles.infoNumber}>
              {Boolean(groArray) && getIncompleteItems(groArray).length}
            </Text>
            <Text style={styles.infoItemText}>
              {Boolean(groArray) && getIncompleteItems(groArray).length === 0
                ? "items"
                : Boolean(groArray) && getIncompleteItems(groArray).length === 1
                ? "item"
                : "items"}
            </Text>
          </View>
        </View>
        <LinearGradient
          start={{ x: 0.0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.9]}
          colors={["#282C31", "#22262B"]}
          style={
            Boolean(groArray) && Boolean(groArray.length)
              ? styles.button
              : { ...styles.button, opacity: 0.5 }
          }
        >
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={handleDeleteButton}
            disabled={Boolean(groArray) && !Boolean(groArray.length)}
          >
            <MaterialIcons name="delete" size={40} color={colors.white} />
            <Text style={globalStyles.littleText}>ALL</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.body}>
        <Text style={styles.titleText}>PICK UP</Text>
        {Boolean(groArray) && groArray.length !== 0 && (
          <ScrollView style={styles.listView}>
            {groArray.map((item: any) => {
              return (
                <View style={styles.itemContainer} key={item._id}>
                  <LinearGradient
                    start={{ x: 0.0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 1]}
                    colors={["#22262B", "#282C31"]}
                    style={
                      !item.completed
                        ? {
                            ...styles.checkButton,
                            borderWidth: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                          }
                        : {
                            ...styles.checkButton,
                            borderWidth: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                            opacity: 0.5,
                          }
                    }
                  >
                    <View style={globalStyles.mainBtns}>
                      <Text style={styles.smallText}>{item.quantity} ✕</Text>
                    </View>
                  </LinearGradient>
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 1, y: 0.0 }}
                    locations={[0, 1]}
                    colors={["#01A355", "#14D1D1"]}
                    style={
                      !item.completed
                        ? styles.itemBtn
                        : { ...styles.itemBtn, opacity: 0.3 }
                    }
                  >
                    <TouchableOpacity
                      style={styles.itemTouchable}
                      onPress={() => console.log("TODO: Edit item")}
                      onLongPress={() => handleDeleteSingleItemButton(item)}
                    >
                      <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    start={{ x: 0.0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.9]}
                    colors={["#282C31", "#22262B"]}
                    style={
                      !item.completed
                        ? styles.checkButton
                        : { ...styles.checkButton, borderColor: "#01A355" }
                    }
                  >
                    <TouchableOpacity
                      style={globalStyles.mainBtns}
                      onPress={() => handleCompleted(item)}
                    >
                      <Feather
                        name="check"
                        size={30}
                        color={!item.completed ? "#ffffff50" : "#01A355"}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //header
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  title: {
    color: colors.white,
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 210,
  },
  button: {
    ...globalStyles.btnContainer,
    width: 80,
    height: 80,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,

    borderStyle: "solid",
  },
  checkButton: {
    ...globalStyles.btnContainer,
    width: 60,
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,

    borderStyle: "solid",
  },
  quantity: {
    ...globalStyles.btnContainer,
    width: 60,
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,

    borderStyle: "solid",
  },

  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },

  infoCircle: {
    backgroundColor: "#0c0c0c",
    height: 175,
    width: 175,
    borderRadius: 5000,
    color: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#01A355",
  },
  infoNumber: {
    color: colors.white,
    fontSize: 35,
    fontFamily: "montserrat-bold",
  },
  infoItemText: {
    color: colors.white,
    fontSize: 22,
    fontFamily: "montserrat-bold",
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginVertical: 10,
  },

  listView: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  itemBtn: {
    flex: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 5,
    height: 60,
  },

  smallText: {
    color: colors.white,
    fontSize: 18,
  },
  itemText: {
    color: colors.white,
    fontSize: 25,
    textShadowColor: "#00000060",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 15,
  },

  itemTouchable: {
    padding: 11,
  },
});
