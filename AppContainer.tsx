import React, { FC, useEffect, useRef } from "react";
import { Alert } from "react-native";

import firebase from "firebase";
import "firebase/firestore";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "./types/reducerTypes";
import { firstTimer, loggedIn, loggedOut, userStateUpdate } from "./actions";
import { RootStackParamList } from "./types/navigationTypes";

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

//create react-navigation
const Stack = createStackNavigator<RootStackParamList>();

//AppContainer serves as a screen navigator
const AppContainer: FC = () => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state: InitialState) => state);
  const userInfo = useSelector((state: InitialState) => state.user);

  //check if first time on app
  const firstTime = async () => {
    const userExists = await AsyncStorage.getItem("beenHere");
    if (!userExists) {
      await AsyncStorage.setItem("beenHere", "true");
    } else {
      dispatch(firstTimer());
    }
  };

  //initialize app on firebase if it hasn't already been initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  //access firestore
  const db = firebase.firestore();
  //get user data from firestore
  const usersRef = db.collection("users");

  useEffect(() => {
    firstTime();

    //when user logs in, redux store is populated with firebase user data
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(loggedIn());
        try {
          const userDocument = await usersRef.doc(user.uid).get();
          if (userDocument.exists) {
            dispatch(userStateUpdate(userDocument.data()));
          }
        } catch (err) {
          Alert.alert("UH OH", err.message);
        }
      } else {
        dispatch(loggedOut());
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {/* if first time on app, user is directed to the Signup Screen. If not, use is directed to login */}
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
        {appInfo.isLoggedIn && userInfo.relationshipId && (
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}
        {appInfo.isLoggedIn && userInfo.relationshipId && (
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
        )}
        {appInfo.isLoggedIn && userInfo.relationshipId && (
          <Stack.Screen
            name="Groceries"
            component={Groceries}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
        )}
        {appInfo.isLoggedIn && userInfo.relationshipId && (
          <Stack.Screen
            name="ToDo"
            component={ToDo}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
        )}
        {appInfo.isLoggedIn && userInfo.relationshipId && (
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
        {appInfo.isLoggedIn && userInfo.relationshipId && (
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
        {appInfo.isLoggedIn && userInfo.relationshipId && (
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
};

export default AppContainer;
