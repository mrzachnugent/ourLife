import React, { FC, useState } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { userReducer } from "./reducers/user-reducer";

import { AppLoading } from "expo";

import * as firebase from "firebase";
import apiKeys from "./config/keys";

import { getFonts } from "./Components/getFonts";
import AppContainer from "./AppContainer";

//initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

//Removes yellowbox warning for android & potential memory leak
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
// LogBox.ignoreLogs(["Can't perform a React state"]);

//configure redux store
const store = createStore(userReducer);

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

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
};

export default App;
