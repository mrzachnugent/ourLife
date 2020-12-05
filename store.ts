import { createStore } from "redux";
import { userReducer } from "./reducers/user-reducer";

//once combined multiple reducers in reducers/index
//import reducer from "./recuders"
//and replace userReducer below with reducer

const configureStore = (initialState: any) => {
  const store = createStore(userReducer, initialState);
  return store;
};

export default configureStore;
