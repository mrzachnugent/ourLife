import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { colors } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

import { MaterialIcons } from "@expo/vector-icons";

export const ShareYourLink = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.black}>
      <View style={styles.background}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/unicorn.png")}
            style={{ height: 215, width: 130, marginBottom: 30 }}
          />
          <Text style={styles.heading}>Share your link</Text>
          <Text style={styles.littleText}>
            or request a link from your partner.
          </Text>
        </View>
        <LinearGradient
          start={{ x: 0.0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.9]}
          colors={["#282C31", "#22262B"]}
          style={globalStyles.btnContainer}
        >
          <TouchableOpacity
            style={{
              ...globalStyles.mainBtns,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text
              style={{
                ...globalStyles.titleText,

                width: 130,
              }}
            >
              SHARE
            </Text>
            <MaterialIcons name="share" size={36} color={colors.white} />
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.littleText}>
          Once your partner accepts, you can sync up your lives with OurLife™.
        </Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() =>
            firebase
              .auth()
              .signOut()
              .then(() => console.log("signed out"))
          }
        >
          <Text style={styles.littleButton}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  black: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 0.92,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.black,
    marginTop: 45,
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 50,
  },
  smallText: {
    color: colors.white,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    fontSize: 18,
  },
  heading: {
    color: colors.white,
    fontFamily: "montserrat-alternates",
    textAlign: "center",
    fontSize: 28,
  },

  bottom: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  littleButton: {
    color: colors.white,
    fontFamily: "montserrat-regular",
    opacity: 0.8,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 5000,
  },
  littleText: {
    color: colors.white,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 25,
  },
});
