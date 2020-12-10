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
    paddingTop: 35,
  },

  noSafeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "montserrat-bold",
    fontSize: 25,
    width: "100%",
    textAlign: "center",
    color: "#FFF",
    textShadowColor: "#00000060",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 15,
    letterSpacing: 1,
  },
  pageTitleText: {
    fontFamily: "montserrat-bold",
    fontSize: 20,
    color: colors.white,
    textShadowColor: "#00000060",
    textShadowOffset: { width: -1, height: 6 },
    textShadowRadius: 15,
    letterSpacing: 1,
  },
  mainBtns: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    shadowColor: "#000",
  },
  btnContainer: {
    borderRadius: 7,
    width: "90%",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#E3EDF730",
  },

  inputContainer: {
    width: 300,
    height: 50,
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#111111",
  },

  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    color: colors.white,
    fontFamily: "montserrat-regular",
  },

  littleText: {
    color: colors.white,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 17,
    lineHeight: 25,
  },
});
