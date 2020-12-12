import { GroceryInterface, ToDoInterface } from "./reducerTypes";

export interface DashboardHeaderProps {
  goToSetting(): void;
  goToMyAccount(): void;
}

export interface PartnerBigAvatarProps {
  onPress(): void;
  disabled: boolean;
}

export interface ColorfulButtonProps {
  onPress(): void;
  onLongPress?(): void;
  title: string;
  iconName: string;
  colorOne: string;
  colorTwo: string;
  children?: React.ReactNode;
}

export interface InfoCircleProps {
  size: number;
  numSize: number;
  textSize: number;
  array: GroceryInterface[] | ToDoInterface[];
  isToDo: boolean;
}

export interface OnlyChildren {
  children: React.ReactNode;
}

export interface GenericHeadingProps {
  goBack(): void;
  makeCall?(): void;
  heading: string;
  children?: React.ReactNode;
  iconName: string;
}
