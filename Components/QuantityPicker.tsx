import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import { InitialState } from "../types/reducerTypes";
import { QuantityPickerProps } from "../types/screenTypes";

import { Picker } from "@react-native-community/picker";
import { LinearGradient } from "expo-linear-gradient";

import { colors, globalStyles } from "../styles/globalStyles";

export const QuantityPicker = ({
  selectedValue,
  onValueChange,
  isTodo,
}: QuantityPickerProps) => {
  const userInfo = useSelector((state: InitialState) => state.user);
  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.mainText}>{!isTodo ? "Quantity :" : "Assign :"}</Text>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1, y: 1.0 }}
        locations={[0, 1]}
        colors={["#2C333A", "#2C333A"]}
        style={{ ...globalStyles.inputContainer, width: 100 }}
      >
        <View>
          {!isTodo ? (
            <Picker
              selectedValue={selectedValue}
              style={styles.pickerContainer}
              mode="dropdown"
              onValueChange={onValueChange}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="9+" value="9+" />
            </Picker>
          ) : (
            <Picker
              selectedValue={selectedValue}
              style={styles.pickerContainer}
              mode="dialog"
              onValueChange={onValueChange}
            >
              <Picker.Item label="no one" value="no one" />
              <Picker.Item
                label={userInfo.partnerName ? userInfo.partnerName : "someone"}
                value={
                  userInfo.partnerAvatarSrc
                    ? userInfo.partnerAvatarSrc
                    : userInfo.otherHalfUid
                    ? userInfo.otherHalfUid
                    : "something"
                }
              />

              <Picker.Item
                label={userInfo.name ? userInfo.name : "someone else"}
                value={
                  userInfo.avatarSrc
                    ? userInfo.avatarSrc
                    : userInfo.uid
                    ? userInfo.uid
                    : "something else"
                }
              />
            </Picker>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    color: colors.white,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 15,
  },
  mainText: {
    color: colors.white,
    fontFamily: "montserrat-semi-bold",
    fontSize: 18,
    textAlign: "center",
    padding: 25,
  },
});
