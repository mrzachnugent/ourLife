import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";

import { Dashboard } from "./screens/Dashboard";
import { Chat } from "./screens/Chat";
import { colors } from "./styles/globalStyles";
import { Settings } from "./screens/Settings";
import { ToDo } from "./screens/ToDo";
import { Groceries } from "./screens/Groceries";
import { MyAccount } from "./screens/MyAccount";
import { TheirAccount } from "./screens/TheirAccount";
import { Login } from "./screens/Login";
import { UploadAvatar } from "./screens/UploadAvatar";

const Stack = createStackNavigator();

//Making custom fonts accessible throughout app
const getFonts = () =>
  Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-semi-bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-extra-bold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "montserrat-black": require("./assets/fonts/Montserrat-Black.ttf"),
    "montserrat-alternates": require("./assets/fonts/MontserratAlternates-ExtraBold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          // initialRouteName="Dashboard"
          headerMode="none"
          screenOptions={{
            gestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="UploadAvatar"
            component={UploadAvatar}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
          <Stack.Screen
            name="Groceries"
            component={Groceries}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
          <Stack.Screen
            name="ToDo"
            component={ToDo}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              gestureDirection: "vertical",
            }}
          />
          <Stack.Screen
            name="MyAccount"
            component={MyAccount}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              gestureDirection: "vertical",
            }}
          />
          <Stack.Screen
            name="TheirAccount"
            component={TheirAccount}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              gestureDirection: "vertical",
            }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
