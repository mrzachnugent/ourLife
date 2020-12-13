import React from "react";
import { TouchableOpacity } from "react-native";
import { ScrollableSpacerProps } from "../types/screenTypes";

export const ScrollableSpacer = ({ height }: ScrollableSpacerProps) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: height,
        backgroundColor: "#00000000",
      }}
    />
  );
};
