import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { resetToInitial } from "../actions";

import firebase from "firebase";
import "firebase/firestore";

import { LogoutButtonProps } from "../types/screenTypes";
import { colors } from "../styles/globalStyles";

export const LogoutButton = ({ whereTo }: LogoutButtonProps) => {
  const dispatch = useDispatch();
  return (
    <TouchableHighlight
      style={{ marginVertical: 30 }}
      onPress={() => {
        dispatch(resetToInitial());
        firebase.auth().signOut().then(whereTo);
      }}
    >
      <Text style={styles.normalText}>log out</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  normalText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 23,
    fontFamily: "montserrat-semi-bold",
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },
});
