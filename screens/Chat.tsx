import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";
import { DismissKeyboard } from "../Components/DismissKeyboard";

export const Chat = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DismissKeyboard>
      <SafeAreaView style={globalStyles.androidSafeArea}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <MaterialIcons name="arrow-back" size={30} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.heading}>
            <Text style={globalStyles.pageTitleText}>CHAT</Text>
            <Image
              source={require("../assets/unicorn.png")}
              style={{ width: 30, height: 60 }}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              alert(
                "Their phone number missing from their profile. You can edit their phone number by pressing on their avatar on the Dashboard Screen."
              )
            }
          >
            <MaterialIcons name="phone" size={30} color={colors.white} />
          </TouchableOpacity>
        </View>
        <GiftedChat />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

//For custom GiftedChat styling:
//https://www.gitmemory.com/issue/FaridSafi/react-native-gifted-chat/1739/629664911

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
    width: 120,
  },
  inputBackground: {
    backgroundColor: colors.black,
  },
});
