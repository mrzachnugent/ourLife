const initialState = {
  initialLoad: "loading",
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
    phoneNumber: "",
    avatarSrc: "",
    uid: "", //only facebook, set facebook uid as firebase uid
    relationshipId: "", //mix of both ids ex: relationshipId1_relationshipId2
    givenNickname: "",
    partnerNickname: "",
    partnerAvatarSrc: "",
    notfiyMsg: true,
    notifyGroceries: false,
    notifyToDo: false,
  },
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
