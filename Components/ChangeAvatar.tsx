import React, { FC } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { InitialState } from "../types/reducerTypes";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/globalStyles";

export const ChangeAvatar: FC = () => {
  const userInfo = useSelector((state: InitialState) => state.user);
  return (
    <View style={styles.centerAvatar}>
      {userInfo.avatarSrc ? (
        <Image
          source={{ uri: userInfo.avatarSrc }}
          style={{
            width: "99.8%",
            height: "99.8%",
            opacity: 1,
            borderRadius: 500,
          }}
        />
      ) : (
        <MaterialIcons name="person" size={150} color={colors.white} />
      )}

      <View style={styles.overlay}>
        <Text style={styles.normalText}>Change avatar</Text>
        <MaterialIcons name="image" size={35} color={colors.white} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 180,
    height: 180,
    backgroundColor: colors.black,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 500,
    marginBottom: 30,
  },
  overlay: {
    backgroundColor: "#00000090",
    position: "absolute",
    top: "50%",
    bottom: 0,
    width: "100%",
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  normalText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "montserrat-semi-bold",
    textShadowColor: "#00000020",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 10,
  },
});
