import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { globalStyles } from "../styles/globalStyles";

const windowHeight = Dimensions.get("window").height;

export const Dashboard = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View
        style={{
          ...globalStyles.container,
          justifyContent: "space-around",
          paddingVertical: 150,
        }}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1, y: 1.0 }}
          locations={[0, 1]}
          colors={["#019EF4", "#2AECFB"]}
          style={globalStyles.btnContainer}
        >
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={globalStyles.titleText}>chat</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1, y: 0.0 }}
          locations={[0, 1]}
          colors={["#14D1D1", "#01A355"]}
          style={globalStyles.btnContainer}
        >
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={globalStyles.titleText}>groceries</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1, y: 1.0 }}
          locations={[0, 1]}
          colors={["#1E89CC", "#9C14C4"]}
          style={globalStyles.btnContainer}
        >
          <TouchableOpacity
            style={globalStyles.mainBtns}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={globalStyles.titleText}>to do</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 500,
    zIndex: -1,
  },
});
