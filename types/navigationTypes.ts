import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  UploadAvatar: undefined;
  ShareYourLink: undefined;
  Dashboard: undefined;
  Chat: undefined;
  Groceries: undefined;
  ToDo: undefined;
  Settings: undefined;
  MyAccount: undefined;
  TheirAccount: undefined;
};

export type NavigationTitles =
  | "Signup"
  | "Login"
  | "UploadAvatar"
  | "ShareYourLink"
  | "Dashboard"
  | "Chat"
  | "Groceries"
  | "ToDo"
  | "Settings"
  | "MyAccount"
  | "TheirAccount";

type SignupScreenNavProp = StackNavigationProp<RootStackParamList, "Signup">;
export type SignupNavProps = { navigation: SignupScreenNavProp };

type LoginScreenNavProp = StackNavigationProp<RootStackParamList, "Login">;
export type LoginNavProps = { navigation: LoginScreenNavProp };

type UploadAvatarScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "UploadAvatar"
>;
export type UploadAvatarNavProps = { navigation: UploadAvatarScreenNavProp };

type ShareYourLinkScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "ShareYourLink"
>;
export type ShareYourLinkNavProps = { navigation: ShareYourLinkScreenNavProp };

type DashboardScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;
export type DashboardNavProps = { navigation: DashboardScreenNavProp };

type ChatScreenNavProp = StackNavigationProp<RootStackParamList, "Chat">;
export type ChatNavProps = { navigation: ChatScreenNavProp };

type GroceriesScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "Groceries"
>;
export type GroceriesNavProps = { navigation: GroceriesScreenNavProp };

type ToDoScreenNavProp = StackNavigationProp<RootStackParamList, "ToDo">;
export type ToDoNavProps = { navigation: ToDoScreenNavProp };

type SettingsScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;
export type SettingsNavProps = { navigation: SettingsScreenNavProp };

type MyAccountScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "MyAccount"
>;
export type MyAccountNavProps = { navigation: MyAccountScreenNavProp };

type TheirAccountScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "TheirAccount"
>;
export type TheirAccountNavProps = { navigation: TheirAccountScreenNavProp };
