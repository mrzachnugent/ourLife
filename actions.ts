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
