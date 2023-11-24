import { ButtonStyle } from "@/modules/types";
import { v4 as uuidv4 } from "uuid";

export const background: React.CSSProperties = {
  overflow: "auto",
  background:
    "var(--linear, linear-gradient(140deg, #7ad8e7ff 0%, #EAEAEA 100%))",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 0,
  padding: 12,
};

export const primaryColor: string = "#4484e4";
export const primaryColorHover: string = "#446de3";

export const defaultButtonStyle: ButtonStyle = {
  id: uuidv4(),
  text: "ボタン",
  color: "#FFFFFF",
  bgColor: "#446de3",
  hoverColor: "#4484e4",
  activeColor: "#377ce4",
  borderColor: "#377ce4",
};
