import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { ColorfulButtonProps } from "../types/screenTypes";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import { colors, globalStyles } from "../styles/globalStyles";

export const ColorfulButton = ({
  onPress,
  onLongPress,
  title,
  iconName,
  colorOne,
  colorTwo,
  children,
}: ColorfulButtonProps) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 1, y: 1.0 }}
      locations={[0, 1]}
      colors={[colorOne, colorTwo]}
      style={globalStyles.btnContainer}
    >
      <TouchableOpacity
        style={globalStyles.mainBtns}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {children}
        <Text style={globalStyles.titleText}>{title}</Text>
        <MaterialIcons
          name={iconName}
          size={50}
          color={colors.white}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  rightIcon: {
    position: "absolute",
    right: 15,
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },
});
