import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

export const ToDo = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={globalStyles.pageTitleText}>TO DO</Text>
          <Image
            source={require("../assets/yoga-sloth.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View />
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
    width: 140,
  },
});
