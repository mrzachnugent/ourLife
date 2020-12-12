interface ChatUser {
  _id: string;
  avatar: null | string;
  name: string;
}

export interface Chat {
  _id: string;
  createdAt: string;
  text: string;
  user: ChatUser;
}

export interface GroceryInterface {
  _id: string;
  completed: boolean;
  name: string;
  notes: string;
  quantity: string;
}

export interface ToDoInterface {
  _id: string;
  completed: boolean;
  name: string;
  notes: string;
  assigned: string;
}

export interface User {
  uid: null | string;
  name: null | string;
  phoneNumber: null | string;
  avatarSrc: null | string;
  halfId: null | string;
  relationshipId: null | string;
  otherHalfUid: null | string;
  partnerName: null | string;
  partnerAvatarSrc: null | string;
  partnerPhoneNumber: null | string;
  notfiyMsg: boolean;
  notifyGroceries: boolean;
  notifyToDo: boolean;
  chatRoom: null | string;
  groceryList: null | string;
  toDoList: null | string;
}

export interface InitialState {
  firstTime: boolean;
  loadingState: boolean;
  isLoggedIn: boolean;
  groceryModalVisible: boolean;
  toDoModalVisible: boolean;
  groceryArr: GroceryInterface[];
  toDoArr: ToDoInterface[];
  user: User;
}

export interface Actions {
  type: string;
  payload?: any;
}
