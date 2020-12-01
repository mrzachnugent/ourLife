import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";

import { globalStyles } from "../styles/globalStyles";

export const Dashboard = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Dashboard</Text>
        <Button
          onPress={() => navigation.navigate("Chat")}
          title="Go to Chat"
        />
      </View>
    </SafeAreaView>
  );
};
