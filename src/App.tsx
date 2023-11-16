import React from "react";
import { ColorResult, TwitterPicker } from "react-color";
import { Button } from "@mui/material";
import { background } from "@/styles";
import ButtonsDisplayBox from "@/Components/ButtonsDisplayBox";
import ColorPickers from "@/Components/ColorPickers";
import FocusButtonTextField from "./Components/FocusButtonTextField";

function App() {
  const [bgDisplay, setBgDisplay] = React.useState<boolean>(false);
  const [bgColor, setBgColor] = React.useState<string>("#FFFFFF");

  const decimalToHex = (alpha: number) =>
    alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

  const handleClickBgSelect = () => {
    setBgDisplay(true);
  };

  const handleCloseBgSelect = () => {
    setBgDisplay(false);
  };

  return (
    <div style={background}>
      <h1>Hello Colors</h1>
      <Button
        sx={{ color: "blue", backgroundColor: "lightBlue" }}
        onClick={handleClickBgSelect}
      >
        全体背景色
      </Button>
      {bgDisplay ? (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <div
            style={{
              position: "fixed",
              inset: "0",
            }}
            onClick={handleCloseBgSelect}
          />
          <TwitterPicker
            color={bgColor}
            onChange={(color: ColorResult) => {
              setBgColor(`${color.hex}${decimalToHex(color.rgb.a || 0)}`);
            }}
          />
        </div>
      ) : null}
      <Button sx={{ color: "blue", backgroundColor: "lightBlue" }}>
        選択中を複製
      </Button>
      <Button sx={{ color: "blue", backgroundColor: "lightBlue" }}>
        コード表示
      </Button>
      <br />
      <FocusButtonTextField />
      <ColorPickers />
      <ButtonsDisplayBox bgColor={bgColor} />
    </div>
  );
}

export default App;
