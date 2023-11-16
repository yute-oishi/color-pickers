import React from "react";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { buttonsState, focusIdState } from "@/atoms";

const FocusButtonTextField = () => {
  const [buttons, setButtons] = useRecoilState(buttonsState);
  const [focusId] = useRecoilState(focusIdState);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = event.target.value;
    const newButtons = [...buttons];
    newButtons[focusId] = { ...newButtons[focusId], ["text"]: text };
    setButtons(newButtons);
  };

  return (
    <div style={{ alignItems: "center", display: "flex", margin: 5 }}>
      <div style={{ alignSelf: "center" }}>選択中のボタン：</div>
      <TextField
        sx={{ backgroundColor: "#F6F6F6" }}
        variant="outlined"
        defaultValue={buttons[focusId].text}
        key={focusId}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default FocusButtonTextField;
