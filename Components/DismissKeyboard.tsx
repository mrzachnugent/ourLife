import React from "react";
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from "react-native";

import { OnlyChildren } from "../types/screenTypes";

import { globalStyles } from "../styles/globalStyles";

export const DismissKeyboard = ({ children }: OnlyChildren) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={globalStyles.androidSafeArea}>{children}</SafeAreaView>
  </TouchableWithoutFeedback>
);
