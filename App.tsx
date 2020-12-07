// @refresh r e s e t (remove spaces to work)
// comment above : prevents preservation of React local state in function components and hooks
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { AppLoading } from "expo";
import * as firebase from "firebase";
import apiKeys from "./config/keys";

import configureStore from "./store";
import { getFonts } from "./Components/getFonts";
import AppContainer from "./AppContainer";
import { Provider } from "react-redux";

//initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

//configure redux store
const store = configureStore();

//Removes yellowbox warning for android
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}
