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
  isBig?: boolean;
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

export interface ThinButtonProps {
  colorOne: string;
  colorTwo: string;
  onPress(): void;
  title: string;
  disabled: boolean;
}

export interface DisplayPhoneNumTextProps {
  phoneNumber: string | null;
  fontSize: number;
}

export interface ScrollableSpacerProps {
  height: number;
}

type KeyboardTypes =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "number-pad"
  | "decimal-pad"
  | "visible-password"
  | "ascii-capable"
  | "numbers-and-punctuation"
  | "url"
  | "name-phone-pad"
  | "twitter"
  | "web-search"
  | undefined;

export interface GenericInputProps {
  onChange(ev: string): void;
  placeholder: string;
  keyboardType?: KeyboardTypes;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoFocus?: boolean;
}

export interface LogoutButtonProps {
  whereTo(): void;
}

export interface SideButtonProps {
  onPress(): void;
  iconName: string;
  text: string;
  disabled?: boolean;
}

export interface ListItemProps {
  item: any;
  onLongPress(item: any): void;
  onCompleted(item: any): void;
  onPress(item: any): void;
  colorOne: string;
  colorTwo: string;
}

export interface QuantityPickerProps {
  selectedValue: string;
  onValueChange(itemValue: string | number, itemIndex: number): void;
  isTodo: boolean;
}

export interface EditItemProps {
  item: any;
  isToDo: boolean;
}
