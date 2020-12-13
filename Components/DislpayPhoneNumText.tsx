import React from "react";
import { Text, StyleSheet } from "react-native";

import { DisplayPhoneNumTextProps } from "../types/screenTypes";

import { colors } from "../styles/globalStyles";
import { displayPhoneNum } from "../utilities";

export const DisplayPhoneNumText = ({
  phoneNumber,
  fontSize,
}: DisplayPhoneNumTextProps) => {
  return (
    <Text
      style={
        phoneNumber
          ? { ...styles.normalText, fontSize: fontSize }
          : { ...styles.normalText, opacity: 0.2, fontSize: fontSize }
      }
    >
      {!phoneNumber ? "(555) 555-5555" : displayPhoneNum(phoneNumber)}
    </Text>
  );
};

const styles = StyleSheet.create({
  normalText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: "montserrat-semi-bold",
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },
});
