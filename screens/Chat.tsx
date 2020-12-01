import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export const Chat = () => {
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Chat</Text>
      </View>
    </SafeAreaView>
  );
};
