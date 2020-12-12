import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { InitialState } from "../types/reducerTypes";
import { DashboardHeaderProps } from "../types/screenTypes";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/globalStyles";

export const HeaderDashboard = ({
  goToSetting,
  goToMyAccount,
}: DashboardHeaderProps) => {
  const userInfo = useSelector((state: InitialState) => state.user);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goToSetting} style={styles.smallbtn}>
        <MaterialIcons
          name="settings"
          size={24}
          color={colors.white}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToMyAccount} style={styles.smallbtn}>
        {userInfo.avatarSrc ? (
          <Image
            source={{ uri: userInfo.avatarSrc }}
            style={{
              width: 55,
              height: 55,
              opacity: 1,
              borderRadius: 500,
            }}
          />
        ) : (
          <MaterialIcons
            name="person"
            size={25}
            color={colors.white}
            style={{ padding: 10 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 30,
    width: "100%",
  },
  smallbtn: {
    backgroundColor: colors.black,
    borderRadius: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
  },
});
