import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { GenericInputProps } from "../types/screenTypes";

export const GenericInput: FC<GenericInputProps> = ({
  placeholder,
  onChange,
  keyboardType,
  autoCapitalize,
  autoFocus,
}: GenericInputProps) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 1, y: 1.0 }}
      locations={[0, 1]}
      colors={["#2C333A", "#2C333A"]}
      style={globalStyles.inputContainer}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#FFFFFF75"
        style={globalStyles.input}
        onChangeText={onChange}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
      />
    </LinearGradient>
  );
};
