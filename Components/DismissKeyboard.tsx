import React from "react";
import { Keyboard, View, TouchableWithoutFeedback } from "react-native";

import { OnlyChildren } from "../types/screenTypes";

import { globalStyles } from "../styles/globalStyles";

export const DismissKeyboard = ({ children }: OnlyChildren) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={globalStyles.androidSafeArea}>{children}</View>
  </TouchableWithoutFeedback>
);
