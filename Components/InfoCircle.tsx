import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { InfoCircleProps } from "../types/screenTypes";

import { getIncompleteItems, getTaskPercentage } from "../utilities";

import { colors } from "../styles/globalStyles";

export const InfoCircle = ({
  size,
  numSize,
  textSize,
  array,
  isToDo,
}: InfoCircleProps) => {
  return (
    <View
      style={{
        ...styles.infoCircle,
        height: size,
        width: size,
        borderColor: !isToDo ? "#01A355" : "#9C14C4",
      }}
    >
      <Text style={{ ...styles.infoNumber, fontSize: numSize }}>
        {!isToDo
          ? getIncompleteItems(array).length
          : isToDo && array.length !== 0
          ? `${getTaskPercentage(array)}%`
          : "empty"}
      </Text>

      <Text style={{ ...styles.infoItemText, fontSize: textSize }}>
        {getIncompleteItems(array).length === 0
          ? "items"
          : getIncompleteItems(array).length === 1
          ? "item"
          : "items"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCircle: {
    backgroundColor: "#0c0c0c",
    position: "absolute",
    left: 0,
    top: -10,
    borderRadius: 5000,
    color: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  infoNumber: {
    color: colors.white,
    fontFamily: "montserrat-bold",
  },
  infoItemText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "montserrat-bold",
  },
});
