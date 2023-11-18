// recoil用のatom定義
import { atom } from "recoil";
import { ButtonStyle } from "./types";
import { defaultButtonStyle } from "./styles";

export const buttonsState = atom<ButtonStyle[]>({
  key: "buttons",
  default: [defaultButtonStyle],
});

export const focusIdState = atom<number>({
  key: "focusId",
  default: 0,
});
