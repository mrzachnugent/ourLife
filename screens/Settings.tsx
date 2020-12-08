import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  switchGroceryNotification,
  switchMsgNotification,
  switchTaskNotification,
} from "../actions";

export const Settings = ({ navigation }: { navigation: any }) => {
  const userInfo = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    return () => (isMounted = false);
  }, []);

  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableHighlight>
          <Text style={globalStyles.titleText}>Settings</Text>
        </TouchableHighlight>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => dispatch(switchMsgNotification())}>
          <View style={styles.onOffNotification}>
            <Image
              source={
                userInfo.notfiyMsg
                  ? require("../assets/btn-on.png")
                  : require("../assets/btn-off.png")
              }
            />
            <Text style={{ ...globalStyles.littleText, textAlign: "left" }}>
              notify about new messages
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(switchGroceryNotification())}>
          <View style={styles.onOffNotification}>
            <Image
              source={
                userInfo.notifyGroceries
                  ? require("../assets/btn-on.png")
                  : require("../assets/btn-off.png")
              }
            />
            <Text style={{ ...globalStyles.littleText, textAlign: "left" }}>
              notify about new groceries
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(switchTaskNotification())}>
          <View style={styles.onOffNotification}>
            <Image
              source={
                userInfo.notifyToDo
                  ? require("../assets/btn-on.png")
                  : require("../assets/btn-off.png")
              }
            />
            <Text style={{ ...globalStyles.littleText, textAlign: "left" }}>
              notify about new tasks
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  onOffNotification: {
    flexDirection: "row",
    alignItems: "center",
  },

  body: {
    justifyContent: "space-evenly",
    flex: 1,
    paddingHorizontal: 20,
  },
});
