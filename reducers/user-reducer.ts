const initialState = {
  firstTime: true,
  loadingState: false,
  isLoggedIn: false,
  groceryModalVisible: false,
  groceryArr: [],
  toDoArr: [],
  user: {
    uid: "",
    name: "",
    phoneNumber: null,
    avatarSrc: null,
    halfId: "",
    relationshipId: null, //mix of both ids ex: halfId1_halfId2
    otherHalfUid: "",
    partnerName: null,
    partnerAvatarSrc: null,
    partnerPhoneNumber: null,
    notfiyMsg: true,
    notifyGroceries: false,
    notifyToDo: false,
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
          notifyGroceries: !state.user.notifyGroceries,
        },
      };
    case "SWITCH_TASK_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          notifyToDo: !state.user.notifyToDo,
        },
      };
    case "SWITCH_MODAL":
      return {
        ...state,
        groceryModalVisible: !state.groceryModalVisible,
      };
    case "ADD_NEW_GROCERY_ITEM":
      return {
        ...state,
        groceryArr: [action.payload, ...state.groceryArr],
      };

    case "ADD_NEW_TODO_ITEM":
      return {
        ...state,
        toDoArr: [action.payload, ...state.toDoArr],
      };

    default:
      return state;
  }
};
