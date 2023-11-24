import React from "react";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  buttonsState,
  focusIdState,
  backStackState,
  forwardStackState,
} from "@/atoms";

const FocusButtonTextField = ({ textId }: { textId: string }) => {
  const [buttons, setButtons] = useRecoilState(buttonsState);
  const [focusId] = useRecoilState(focusIdState);
  const [backStacks, setBackStacks] = useRecoilState(backStackState);
  const [forwardStacks, setForwardStacks] = useRecoilState(forwardStackState);

  // 進む・戻るのための、前回のフォーカス時のテキストを保持するステート変数
  const [focusButtonText, setFocusButtonText] = React.useState<string>(
    buttons[focusId].text
  );

  React.useEffect(() => {
    setFocusButtonText(buttons[focusId].text);
  }, [backStacks, forwardStacks, focusId]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = event.target.value;
    const newButtons = [...buttons];
    newButtons[focusId] = { ...newButtons[focusId], ["text"]: text };
    setButtons(newButtons);
  };

  const handleBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = event.target.value;
    const focusButtonStyle = { ...buttons[focusId], text: focusButtonText };
    const newFocusButtonStyle = { ...buttons[focusId], text: text };
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
    setFocusButtonText(text);
  };

  return (
    <div style={{ alignItems: "center", display: "flex", margin: 5 }}>
      <TextField
        size="small"
        sx={{ backgroundColor: "#F6F6F6" }}
        variant="outlined"
        defaultValue={buttons[focusId].text}
        key={focusId.toString() + textId}
        onChange={handleTextChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default FocusButtonTextField;
