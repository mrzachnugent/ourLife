import { StyleSheet, Platform } from "react-native";

export const colors = {
  black: "#1D1F23",
  white: "#E3EDF7",
  gray: "#333333",
  blueGrad: "linear-gradient(93.92deg, #019EF4 2.66%, #2AECFB 98.67%)",
  greenGrad: "linear-gradient(93.57deg, #14D1D1 0.37%, #01A355 98.66%)",
  purpleGrad: "linear-gradient(93.33deg, #1E89CC 3.86%, #9C14C4 100%)",
  neoShadow:
    "-4px -2px 16px rgba(195, 200, 205, 0.08), 4px 4px 18px rgba(0, 0, 0, 0.5)",
  mainBtnShadow:
    "-4px -4px 16px rgba(195, 200, 205, 0.06), 4px 4px 18px rgba(0, 0, 0, 0.6)",
  paperShadow:
    "0px 4px 4px rgba(0, 0, 0, 0.20), -4px 4px 8px rgba(0, 0, 0, 0.15)",
  neoBorder: "1px solid rgba(227, 237, 247, 0.05)",
};

export const globalStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    padding: 25,
  },
  titleText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: colors.white,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
});
