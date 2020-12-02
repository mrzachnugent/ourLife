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
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          headerMode="none"
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        >
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
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
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
