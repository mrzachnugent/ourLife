import * as Font from "expo-font";

export const getFonts = async () =>
  Font.loadAsync({
    "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-semi-bold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-extra-bold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "montserrat-black": require("../assets/fonts/Montserrat-Black.ttf"),
    "montserrat-alternates": require("../assets/fonts/MontserratAlternates-ExtraBold.ttf"),
  });
