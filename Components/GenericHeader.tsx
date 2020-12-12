import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, globalStyles } from "../styles/globalStyles";
import { GenericHeadingProps } from "../types/screenTypes";

export const GenericHeader = ({
  goBack,
  makeCall,
  heading,
  children,
  iconName,
}: GenericHeadingProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <MaterialIcons name="arrow-back" size={30} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.heading}>
        <Text style={globalStyles.pageTitleText}>{heading}</Text>
        {children}
      </View>
      <TouchableOpacity
        onPress={makeCall}
        style={iconName !== "none" ? { width: 50 } : { width: 0 }}
      >
        {iconName !== "none" && (
          <MaterialIcons name={iconName} size={30} color={colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },
});
