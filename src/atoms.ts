// recoil用のatom定義
import { atom } from "recoil";
import { ButtonStyle, UserOperation } from "@/modules/types";
import { defaultButtonStyle } from "./styles";

export const buttonsState = atom<ButtonStyle[]>({
  key: "buttons",
  default: [defaultButtonStyle],
});

export const focusIdState = atom<number>({
  key: "focusId",
  default: 0,
});

export const backStackState = atom<UserOperation[]>({
  key: "backStack",
  default: [],
});

export const forwardStackState = atom<UserOperation[]>({
  key: "forwardStack",
  default: [],
});

export const lastSavedDataState = atom<string>({
  key: "lastSavedData",
  default: "",
});
