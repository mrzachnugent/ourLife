import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { OnlyChildren } from "../types/screenTypes";

import { DismissKeyboard } from "./DismissKeyboard";

export const AvoidKeyboard = ({ children }: OnlyChildren) => {
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
