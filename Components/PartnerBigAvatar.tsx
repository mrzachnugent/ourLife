import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { InitialState } from "../types/reducerTypes";
import { PartnerBigAvatarProps } from "../types/screenTypes";

export const PartnerBigAvatar = ({
  onPress,
  disabled,
}: PartnerBigAvatarProps) => {
  const userInfo = useSelector((state: InitialState) => state.user);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.shadow}
    >
      <View style={styles.centerAvatar}>
        {userInfo.partnerAvatarSrc ? (
          <Image
            source={{ uri: userInfo.partnerAvatarSrc }}
            style={{
              width: "100%",
              height: "100%",
              opacity: 1,
              borderRadius: 500,
            }}
          />
        ) : (
          <MaterialIcons name="person" size={200} color={colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  centerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 275,
    height: 275,
    backgroundColor: colors.black,
    borderColor: "#53CCED",
    borderWidth: 2,
    borderRadius: 500,
    marginBottom: 30,
  },
});
