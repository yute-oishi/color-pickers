import React from "react";
import { ColorResult, SketchPicker } from "react-color";

function App() {
  const [textColor, setTextColor] = React.useState("#ffffff");
  const [bgColor, setBgColor] = React.useState("#ffffff");

  const decimalToHex = (alpha: number) =>
    alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

  const handleTextColorChange = (newColor: ColorResult) => {
    const colorHex = `${newColor.hex}${decimalToHex(newColor.rgb.a || 0)}`;
    setTextColor(colorHex);
  };
  const handleBgColorChange = (newColor: ColorResult) => {
    const colorHex = `${newColor.hex}${decimalToHex(newColor.rgb.a || 0)}`;
    setBgColor(colorHex);
  };

  return (
    <div>
      <h1>Hello Colors</h1>
      <div style={{ display: "flex" }}>
        <SketchPicker color={textColor} onChange={handleTextColorChange} />
        <SketchPicker color={bgColor} onChange={handleBgColorChange} />
      </div>
      <div
        style={{
          color: textColor,
          marginTop: "20px",
          padding: "10px",
          backgroundColor: bgColor,
        }}
      >
        文字色：{textColor}
        {"　　"}
        背景：{bgColor}
      </div>
    </div>
  );
}

export default App;
