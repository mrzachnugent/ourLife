import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ThinButtonProps } from "../types/screenTypes";

import { LinearGradient } from "expo-linear-gradient";

import { globalStyles } from "../styles/globalStyles";

export const ThinButton = ({
  colorOne,
  colorTwo,
  onPress,
  title,
  disabled,
}: ThinButtonProps) => {
  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1, y: 1.0 }}
        locations={[0, 1]}
        colors={[colorOne, colorTwo]}
        style={{ ...globalStyles.btnContainer, paddingHorizontal: 25 }}
      >
        <TouchableOpacity
          style={globalStyles.mainBtns}
          onPress={onPress}
          disabled={disabled}
        >
          <Text
            style={
              !disabled
                ? { ...globalStyles.titleText, fontSize: 16 }
                : { ...globalStyles.titleText, fontSize: 16, opacity: 0.3 }
            }
          >
            {title}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
