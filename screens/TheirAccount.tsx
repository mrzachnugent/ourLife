import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const TheirAccount = ({ navigation }: { navigation: any }) => {
  const userInfo = useSelector((state: any) => state.user);
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableHighlight>
          <Text style={globalStyles.titleText}>{userInfo.partnerNickname}</Text>
        </TouchableHighlight>
        <View />
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
});
