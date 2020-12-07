const initialState = {
  firstTime: true,
  loadingState: false,
  isLoggedIn: false,
  user: {
    uid: "",
    name: "",
    phoneNumber: null,
    avatarSrc: null,
    halfId: "",
    relationshipId: null, //mix of both ids ex: halfId1_halfId2
    otherHalfUid: "",
    partnerNickname: null,
    partnerAvatarSrc: null,
    partnerPhoneNumber: null,
    notfiyMsg: true,
    notifyGroceries: false,
    notifyToDo: false,
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

    default:
      return state;
  }
};
