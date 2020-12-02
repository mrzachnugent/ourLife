import React, { FC } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { colors } from "../styles/globalStyles";

export const Login = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.black}>
      <View style={styles.background}>
        <View>
          <Text style={styles.smallText}>Welcome to</Text>
          <Text style={styles.heading}>Our life</Text>
        </View>
        <View>
          <TouchableHighlight
            onPress={() => navigation.navigate("UploadAvatar")}
          >
            <Image
              source={require("../assets/yoga-sloth.png")}
              style={{ height: 215, width: 200, marginBottom: 30 }}
            />
          </TouchableHighlight>
          <Text style={styles.smallText}>Sign up/ Log in with:</Text>
        </View>
        <View>
          <Text style={styles.smallText}>GOOGLE</Text>
          <Text style={styles.smallText}>FACEBOOK</Text>
          <Text style={styles.smallText}>APPLE</Text>
        </View>
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
    fontSize: 52,
  },
});
