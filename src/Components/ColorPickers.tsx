import { ColorResult, SketchPicker } from "react-color";
import { Grid } from "@mui/material";
import CopyButton from "@/Components/CopyButton";
import { ButtonStyle } from "@/modules/types";
import { useRecoilState } from "recoil";
import {
  buttonsState,
  focusIdState,
  backStackState,
  forwardStackState,
} from "@/atoms";
import React from "react";

const ColorPickers = () => {
  const [buttons, setButtons] = useRecoilState(buttonsState);
  const [focusId] = useRecoilState(focusIdState);
  // 進む・戻るのための、前回のコンプリート状態の色を保持するステート変数
  const [focusButtonStyle, setFocusButtonStyle] = React.useState<ButtonStyle>(
    buttons[focusId]
  );

  // 処理最適化のため、選択中のボタンの色だけを保持する。
  const [focusButtonColor, setFocusButtonColor] = React.useState<string>(
    buttons[focusId].color
  );
  const [focusButtonBgColor, setFocusButtonBgColor] = React.useState<string>(
    buttons[focusId].bgColor
  );
  const [focusButtonHoverColor, setFocusButtonHoverColor] =
    React.useState<string>(buttons[focusId].hoverColor);
  const [focusButtonActiveColor, setFocusButtonActiveColor] =
    React.useState<string>(buttons[focusId].activeColor);
  const [focusButtonBorderColor, setFocusButtonBorderColor] =
    React.useState<string>(buttons[focusId].borderColor);

  const [backStacks, setBackStacks] = useRecoilState(backStackState);
  const [forwardStacks, setForwardStacks] = useRecoilState(forwardStackState);

  const colorSettings = [
    ["color", "文字色", focusButtonColor],
    ["bgColor", "背景", focusButtonBgColor],
    ["hoverColor", "カーソル時", focusButtonHoverColor],
    ["activeColor", "クリック時", focusButtonActiveColor],
    ["borderColor", "枠線", focusButtonBorderColor],
  ];

  React.useEffect(() => {
    setFocusButtonStyle(buttons[focusId]);
    setFocusButtonColor(buttons[focusId].color);
    setFocusButtonBgColor(buttons[focusId].bgColor);
    setFocusButtonHoverColor(buttons[focusId].hoverColor);
    setFocusButtonActiveColor(buttons[focusId].activeColor);
    setFocusButtonBorderColor(buttons[focusId].borderColor);
  }, [buttons, backStacks, forwardStacks, focusId]);

  const decimalToHex = (alpha: number) =>
    alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

  const handleChangeColor = (newColor: ColorResult, key: keyof ButtonStyle) => {
    let setState: React.Dispatch<React.SetStateAction<string>> =
      setFocusButtonColor;
    switch (key) {
      case "bgColor":
        setState = setFocusButtonBgColor;
        break;
      case "hoverColor":
        setState = setFocusButtonHoverColor;
        break;
      case "activeColor":
        setState = setFocusButtonActiveColor;
        break;
      case "borderColor":
        setState = setFocusButtonBorderColor;
        break;
    }
    setState(`${newColor.hex}${decimalToHex(newColor.rgb.a || 0)}`);
  };

  const handleChangeCompleteColor = (
    newColor: ColorResult,
    key: keyof ButtonStyle
  ) => {
    const colorHex = `${newColor.hex}${decimalToHex(newColor.rgb.a || 0)}`;
    const newFocusButtonStyle = { ...focusButtonStyle };
    newFocusButtonStyle[key] = colorHex;
    setBackStacks([
      ...backStacks,
      {
        type: "button",
        index: focusId,
        color: focusButtonStyle,
        newColor: newFocusButtonStyle,
      },
    ]);
    setForwardStacks([]);
    const newButtons = [...buttons];
    newButtons[focusId] = newFocusButtonStyle;
    setButtons(newButtons);
    setFocusButtonStyle(newFocusButtonStyle);
  };
  return (
    <Grid container>
      {colorSettings.map((colorSetting, index) => (
        <div
          key={index}
          style={{
            margin: 10,
            color: colorSetting[2],
            textShadow: "1px 1px 1px #808080",
          }}
        >
          {colorSetting[1]}
          {colorSetting[2]}
          <CopyButton text={colorSetting[2]} />
          <SketchPicker
            color={colorSetting[2]}
            onChange={(color: ColorResult) => {
              handleChangeColor(color, colorSetting[0] as keyof ButtonStyle);
            }}
            onChangeComplete={(color: ColorResult) => {
              handleChangeCompleteColor(
                color,
                colorSetting[0] as keyof ButtonStyle
              );
            }}
          />
        </div>
      ))}

      {/* <div
        style={{
          margin: 10,
          color: focusButtonColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        文字色{focusButtonColor}
        <CopyButton text={focusButtonColor} />
        <SketchPicker
          color={focusButtonColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, "color");
          }}
          onChangeComplete={(color: ColorResult) => {
            handleChangeCompleteColor(color, "color");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: focusButtonBgColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        背景{focusButtonBgColor}
        <CopyButton text={focusButtonBgColor} />
        <SketchPicker
          color={focusButtonBgColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, "bgColor");
          }}
          onChangeComplete={(color: ColorResult) => {
            handleChangeCompleteColor(color, "bgColor");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: focusButtonHoverColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        ホバー時{focusButtonHoverColor}
        <CopyButton text={focusButtonHoverColor} />
        <SketchPicker
          color={focusButtonHoverColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, "hoverColor");
          }}
          onChangeComplete={(color: ColorResult) => {
            handleChangeCompleteColor(color, "hoverColor");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: focusButtonActiveColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        クリック時{focusButtonActiveColor}
        <CopyButton text={focusButtonActiveColor} />
        <SketchPicker
          color={focusButtonActiveColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, "activeColor");
          }}
          onChangeComplete={(color: ColorResult) => {
            handleChangeCompleteColor(color, "activeColor");
          }}
        />
      </div>
      <div
        style={{
          margin: 10,
          color: focusButtonBorderColor,
          textShadow: "1px 1px 1px #808080",
        }}
      >
        ボーダー{focusButtonBorderColor}
        <CopyButton text={focusButtonBorderColor} />
        <SketchPicker
          color={focusButtonBorderColor}
          onChange={(color: ColorResult) => {
            handleChangeColor(color, "borderColor");
          }}
          onChangeComplete={(color: ColorResult) => {
            handleChangeCompleteColor(color, "borderColor");
          }}
        />
      </div> */}
    </Grid>
  );
};

export default ColorPickers;
