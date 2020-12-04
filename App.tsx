// @refresh r e s e t (remove spaces to work)
// comment above : prevents preservation of React local state in function components and hooks
import React, { useState } from "react";
import { LogBox } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import apiKeys from "./config/keys";
import { getFonts } from "./Components/getFonts";
import { Dashboard } from "./screens/Dashboard";
import { Chat } from "./screens/Chat";
import { Settings } from "./screens/Settings";
import { ToDo } from "./screens/ToDo";
import { Groceries } from "./screens/Groceries";
import { MyAccount } from "./screens/MyAccount";
import { TheirAccount } from "./screens/TheirAccount";
import { Login } from "./screens/Login";
import { UploadAvatar } from "./screens/UploadAvatar";
import { ShareYourLink } from "./screens/ShareYourLink";
import { FirstLoadingScreen } from "./screens/FirstLoadingScreen";

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

//access firestore
const db = firebase.firestore();
const chatRef = db.collection("chats");

//create react-navigation
const Stack = createStackNavigator();

//Removes yellowbox warning for android
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

//Making custom fonts accessible throughout app
getFonts();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="FirstLoadingScreen"
          // initialRouteName="Dashboard"
          headerMode="none"
          screenOptions={{
            gestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="FirstLoadingScreen"
            component={FirstLoadingScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
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
            name="ShareYourLink"
            component={ShareYourLink}
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
