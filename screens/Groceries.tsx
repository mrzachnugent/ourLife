import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ModalAddGroceries } from "../Components/ModalAddGroceries";
import { switchModal } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const exampleList = [
  {
    _id: 1,
    name: "popcorn",
    quantity: 4,
    notes: "extra butter!",
    completed: true,
  },
  {
    _id: 2,
    name: "jelly",
    quantity: 2,
    notes: "extra butter!",
    completed: false,
  },
  {
    _id: 3,
    name: "corn",
    quantity: 1,
    notes: "extra butter!",
    completed: false,
  },
  {
    _id: 4,
    name: "chips",
    quantity: 19,
    notes: "extra butter!",
    completed: false,
  },
  {
    _id: 5,
    name: "popcorn",
    quantity: 1,
    notes: "extra butter!",
    completed: false,
  },
  {
    _id: 6,
    name: "jelly",
    quantity: 99,
    notes: "extra butter!",
    completed: false,
  },
  {
    _id: 7,
    name: "corn",
    quantity: 1,
    notes: "extra butter!",
    completed: false,
  },
  {
    _id: 8,
    name: "chips",
    quantity: 1,
    notes: "extra butter!",
    completed: false,
  },
];

export const Groceries = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const groArray: [] = useSelector((state: any) => state?.groceryArr);

  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={styles.container}>
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
            <Text style={styles.infoNumber}>{groArray.length}</Text>
            <Text style={styles.infoItemText}>
              {groArray.length === 0
                ? "items"
                : groArray.length === 1
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
          style={styles.button}
        >
          <TouchableOpacity style={globalStyles.mainBtns}>
            <MaterialIcons name="delete" size={40} color={colors.white} />
            <Text style={globalStyles.littleText}>ALL</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.body}>
        <Text style={styles.titleText}>PICK UP</Text>
        {groArray.length !== 0 && (
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
                      onLongPress={() => {
                        Alert.alert(
                          "Delete Item?",
                          `Do you want to delete ${item.name}?`,
                          [
                            {
                              text: "Cancel",
                              style: "cancel",
                            },
                            {
                              text: "Yes",
                              onPress: () => console.log("TODO"),
                            },
                          ]
                        );
                      }}
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
                    <TouchableOpacity style={globalStyles.mainBtns}>
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
