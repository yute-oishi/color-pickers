export interface ButtonStyle {
  id: string;
  text: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  activeColor: string;
  borderColor: string;
}

export interface UserOperation {
  type: "button" | "dnd" | "bgColor" | "delete" | "add" | "focus";
  index?: number;
  newIndex?: number;
  color?: ButtonStyle;
  newColor?: ButtonStyle;
  bgColor?: string;
  newBgColor?: string;
}
// buttonColor : index, color -> newColor
// dnd         : index -> newIndex
// bgColor     : bgColor -> newBgColor
// delete      : index, color
// add         : index, color
// focus       : index -> newIndex
