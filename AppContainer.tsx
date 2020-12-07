import React, { useEffect, useState } from "react";
import { Alert, LogBox } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import apiKeys from "./config/keys";
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
import { Signup } from "./screens/Signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { firstTimer, loggedIn, loggedOut, userStateUpdate } from "./actions";

//create react-navigation
const Stack = createStackNavigator();

//Removes yellowbox warning for android
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function AppContainer() {
  const dispatch = useDispatch();
  const appInfo = useSelector((state: any) => state);
  const userInfo = useSelector((state: any) => state.user);

  //check if first time on app
  const firstTime = async () => {
    const userExists = await AsyncStorage.getItem("beenHere");
    if (!userExists) {
      await AsyncStorage.setItem("beenHere", "true");
    } else {
      dispatch(firstTimer());
    }
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  //access firestore
  const db = firebase.firestore();
  //get user data from firestore
  const usersRef = db.collection("users");

  useEffect(() => {
    let isMounted = true;
    firstTime();

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(loggedIn());
        const userDocument = await usersRef.doc(user.uid).get();
        if (userDocument.exists) {
          dispatch(userStateUpdate(userDocument.data()));
        } else {
          Alert.alert("Please close the application and try again.");
        }
      } else {
        dispatch(loggedOut());
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={appInfo.firstTime ? "Signup" : "Login"}
        headerMode="none"
        screenOptions={{
          gestureEnabled: true,
        }}
      >
        {!appInfo.isLoggedIn && (
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}
        {!appInfo.isLoggedIn && (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}

        {appInfo.isLoggedIn && !userInfo.avatarSrc && (
          <Stack.Screen
            name="UploadAvatar"
            component={UploadAvatar}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}
        {appInfo.isLoggedIn && !userInfo.relationshipId && (
          <Stack.Screen
            name="ShareYourLink"
            component={ShareYourLink}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}
        {appInfo.isLoggedIn && (
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}
        {appInfo.isLoggedIn && (
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
        )}
        {appInfo.isLoggedIn && (
          <Stack.Screen
            name="Groceries"
            component={Groceries}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
        )}
        {appInfo.isLoggedIn && (
          <Stack.Screen
            name="ToDo"
            component={ToDo}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
        )}
        {appInfo.isLoggedIn && (
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              gestureDirection: "vertical",
            }}
          />
        )}
        {appInfo.isLoggedIn && (
          <Stack.Screen
            name="MyAccount"
            component={MyAccount}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              gestureDirection: "vertical",
            }}
          />
        )}
        {appInfo.isLoggedIn && (
          <Stack.Screen
            name="TheirAccount"
            component={TheirAccount}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              gestureDirection: "vertical",
            }}
          />
        )}
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
