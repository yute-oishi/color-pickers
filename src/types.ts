export interface ButtonStyle {
  text: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  activeColor: string;
  borderColor: string;
}

export const getDefaultButtonStyle = (): ButtonStyle => {
  return {
    text: "ボタン",
    color: "#FFFFFF",
    bgColor: "#446de3",
    hoverColor: "#4484e4",
    activeColor: "#377ce4",
    borderColor: "#377ce4",
  };
};
