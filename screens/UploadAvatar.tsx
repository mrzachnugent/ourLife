import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { colors } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export const UploadAvatar = ({ navigation }: { navigation: any }) => {
  const [image, setImage] = React.useState<string | null>(null);

  const handlePress = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const chosenPic = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4],
    });
    if (!chosenPic.cancelled) {
      setImage(chosenPic.uri);
    }
  };

  return (
    <View style={styles.black}>
      <View style={styles.background}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/dancing-panda.png")}
            style={{ height: 215, width: 218, marginBottom: 30 }}
          />
          <Text style={styles.heading}>Upload an avatar</Text>
        </View>

        {!image ? (
          <LinearGradient
            start={{ x: 0.0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.9]}
            colors={["#282C31", "#22262B"]}
            style={styles.button}
          >
            <TouchableOpacity
              style={globalStyles.mainBtns}
              onPress={handlePress}
            >
              <MaterialIcons name="image" size={75} color={colors.white} />
              <Text style={globalStyles.titleText}>UPLOAD</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <Image source={{ uri: image }} style={styles.avatar} />
        )}
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("ShareYourLink")}>
          <Text style={styles.littleButton}>skip</Text>
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
  button: {
    ...globalStyles.btnContainer,
    width: 200,
    height: 200,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 2,

    borderStyle: "dashed",
  },
  bottom: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-end",
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
});
