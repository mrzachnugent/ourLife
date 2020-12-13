import { Actions, InitialState } from "../types/reducerTypes";

const initialState: InitialState = {
  firstTime: true,
  loadingState: false,
  isLoggedIn: false,
  groceryModalVisible: false,
  toDoModalVisible: false,
  groceryArr: [],
  toDoArr: [],
  user: {
    uid: null,
    name: null,
    phoneNumber: null,
    avatarSrc: null,
    halfId: null,
    relationshipId: null, //mix of both ids ex: halfId1_halfId2
    otherHalfUid: null,
    partnerName: null,
    partnerAvatarSrc: null,
    partnerPhoneNumber: null,
    notfiyMsg: true,
    notifyGroceries: true,
    notifyToDo: true,
    chatRoom: null,
    groceryList: null,
    toDoList: null,
  },
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FIRST_TIMER":
      return {
        ...state,
        firstTime: false,
      };

    case "LOADING":
      return {
        ...state,
        loadingState: true,
      };

    case "LOADED":
      return {
        ...state,
        loadingState: false,
      };

    case "LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
      };

    case "LOGGED_OUT":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "USER_STATE_UPDATE":
      return {
        ...state,
        user: action.payload,
      };

    case "USER_NAME_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    case "USER_PHONE_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          phoneNumber: action.payload,
        },
      };

    case "AVATAR_SRC_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          avatarSrc: action.payload,
        },
      };

    case "MADE_CONNECTION":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "SWITCH_MSG_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          notfiyMsg: !state.user.notfiyMsg,
        },
      };
    case "SWITCH_GROCERY_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          notifyGroceries: action.payload,
        },
      };
    case "SWITCH_TASK_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          notifyToDo: action.payload,
        },
      };
    case "SWITCH_MODAL":
      return {
        ...state,
        groceryModalVisible: !state.groceryModalVisible,
      };
    case "SWITCH_TODO_MODAL":
      return {
        ...state,
        toDoModalVisible: !state.toDoModalVisible,
      };
    case "UPDATE_GROCERY_LIST":
      return {
        ...state,
        groceryArr: action.payload,
      };

    case "UPDATE_TODO_LIST":
      return {
        ...state,
        toDoArr: action.payload,
      };
    case "UPDATE_LAST_CHAT_ARR_LENGTH":
      return {
        ...state,
        lastChatArrLength: action.payload,
      };
    case "UPDATE_CHAT_ARR_LENGTH":
      return {
        ...state,
        chatArrLength: action.payload,
      };
    case "RESET_TO_INITIAL":
      return {
        firstTime: initialState.firstTime,
        loadingState: initialState.loadingState,
        isLoggedIn: initialState.isLoggedIn,
        groceryModalVisible: initialState.groceryModalVisible,
        toDoModalVisible: initialState.toDoModalVisible,
        groceryArr: initialState.groceryArr,
        toDoArr: initialState.toDoArr,
        user: { ...initialState.user },
      };

    default:
      return state;
  }
};
