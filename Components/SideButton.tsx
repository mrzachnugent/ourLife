import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { SideButtonProps } from "../types/screenTypes";

import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

import { colors, globalStyles } from "../styles/globalStyles";
import { color } from "react-native-reanimated";

export const SideButton = ({
  onPress,
  iconName,
  text,
  disabled,
}: SideButtonProps) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.9]}
      colors={["#282C31", "#22262B"]}
      style={styles.button}
    >
      <TouchableOpacity
        style={globalStyles.mainBtns}
        onPress={onPress}
        disabled={disabled}
      >
        <Feather name={iconName} size={35} color="#ffffff50" />
        <Text style={globalStyles.littleText}>{text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    ...globalStyles.btnContainer,
    width: 76,
    height: 80,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
  },
});
