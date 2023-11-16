import { ColorResult, SketchPicker } from "react-color";
import { Grid } from "@mui/material";
import CopyButton from "@/Components/CopyButton";
import { ButtonStyle } from "@/types";
import { useRecoilState } from "recoil";
import { buttonsState, focusIdState } from "@/atoms";

const ColorPickers = () => {
  const [buttons, setButtons] = useRecoilState(buttonsState);

  const [focusId] = useRecoilState(focusIdState);

  const decimalToHex = (alpha: number) =>
    alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

  const handleChangeColor = (
    newColor: ColorResult,
    id: number,
    key: keyof ButtonStyle
  ) => {
    const colorHex = `${newColor.hex}${decimalToHex(newColor.rgb.a || 0)}`;
    const newButtons = [...buttons];
    newButtons[id] = { ...newButtons[id], [key]: colorHex };
    setButtons(newButtons);
  };
  return (
    <Grid container>
      <div
        style={{
          margin: 10,
          color: buttons[focusId].color,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        文字色{buttons[focusId].color}
        <CopyButton text={buttons[focusId].color} />
        <SketchPicker
          color={buttons[focusId].color}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, focusId, "color");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: buttons[focusId].bgColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        背景{buttons[focusId].bgColor}
        <CopyButton text={buttons[focusId].bgColor} />
        <SketchPicker
          color={buttons[focusId].bgColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, focusId, "bgColor");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: buttons[focusId].hoverColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        ホバー時{buttons[focusId].hoverColor}
        <CopyButton text={buttons[focusId].hoverColor} />
        <SketchPicker
          color={buttons[focusId].hoverColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, focusId, "hoverColor");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: buttons[focusId].activeColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        クリック時{buttons[focusId].activeColor}
        <CopyButton text={buttons[focusId].activeColor} />
        <SketchPicker
          color={buttons[focusId].activeColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, focusId, "activeColor");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: buttons[focusId].borderColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        ボーダー{buttons[focusId].borderColor}
        <CopyButton text={buttons[focusId].borderColor} />
        <SketchPicker
          color={buttons[focusId].borderColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, focusId, "borderColor");
          }}
        />
      </div>
    </Grid>
  );
};

export default ColorPickers;
