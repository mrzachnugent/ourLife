import React, { FC } from "react";
import { ScrollView, TouchableHighlight, View } from "react-native";

import { OnlyChildren } from "../types/screenTypes";

export const ScrollableContainer = ({ children }: OnlyChildren) => {
  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <TouchableHighlight>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 25,
            width: "100%",
          }}
        >
          {children}
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
};
