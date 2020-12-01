import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export const Dashboard = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Dashboard</Text>
      <Button onPress={() => navigation.navigate("Chat")} title="Go to Chat" />
    </View>
  );
};
