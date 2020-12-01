import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export const Chat = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Chat</Text>
    </View>
  );
};
