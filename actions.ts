export const firstTimer = () => ({
  type: "FIRST_TIMER",
});

export const loading = () => ({
  type: "LOADING",
});

export const loaded = () => ({
  type: "LOADED",
});

export const loggedIn = () => ({
  type: "LOGGED_IN",
});

export const loggedOut = () => ({
  type: "LOGGED_OUT",
});

export const userStateUpdate = (data: any) => ({
  type: "USER_STATE_UPDATE",
  payload: data,
});

export const userNameUpdate = (text: any) => ({
  type: "USER_NAME_UPDATE",
  payload: text,
});

export const userPhoneUpdate = (text: any) => ({
  type: "USER_PHONE_UPDATE",
  payload: text,
});

export const avatarSrcUpdate = (url: any) => ({
  type: "AVATAR_SRC_UPDATE",
  payload: url,
});

export const madeConnection = (obj: any) => ({
  type: "MADE_CONNECTION",
  payload: obj,
});

export const updateUser = (obj: any) => ({
  type: "UPDATE_USER",
  payload: obj,
});

export const switchMsgNotification = () => ({
  type: "SWITCH_MSG_NOTIFICATION",
});

export const switchGroceryNotification = (bool: boolean) => ({
  type: "SWITCH_GROCERY_NOTIFICATION",
  payload: bool,
});

export const switchTaskNotification = (bool: boolean) => ({
  type: "SWITCH_TASK_NOTIFICATION",
  payload: bool,
});

export const switchModal = () => ({
  type: "SWITCH_MODAL",
});
export const switchToDoModal = () => ({
  type: "SWITCH_TODO_MODAL",
});

export const updateGroceryList = (obj: any) => ({
  type: "UPDATE_GROCERY_LIST",
  payload: obj,
});
export const updateToDoList = (obj: any) => ({
  type: "UPDATE_TODO_LIST",
  payload: obj,
});
export const updateLastChatArrLenth = (num: any) => ({
  type: "UPDATE_LAST_CHAT_ARR_LENGTH",
  payload: num,
});
export const updateChatArrLenth = (num: any) => ({
  type: "UPDATE_CHAT_ARR_LENGTH",
  payload: num,
});
