// recoil用のatom定義
import { atom } from "recoil";
import { ButtonStyle } from "./types";
import { getDefaultButtonStyle } from "./types";

export const buttonsState = atom<ButtonStyle[]>({
  key: "buttons",
  default: [getDefaultButtonStyle()],
});

export const focusIdState = atom<number>({
  key: "focusId",
  default: 0,
});
