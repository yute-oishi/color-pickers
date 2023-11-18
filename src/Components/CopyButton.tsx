import { IconButton } from "@mui/material";
import copySVG from "../assets/copy.svg";
import clipboardCopy from "clipboard-copy";
import CustomTooltip from "./CustomTooltip";
import React from "react";

const CopyButton = ({ text }: { text: string }) => {
  const [textDisplay, setTextDisplay] = React.useState<string>(text);

  const handleCopyClick = async () => {
    await clipboardCopy(text);
    setTextDisplay("✔");
  };

  return (
    <CustomTooltip
      title={textDisplay}
      onMouseLeave={() => {
        setTextDisplay(text);
      }}
      TransitionProps={{ timeout: 0 }}
    >
      <IconButton onClick={handleCopyClick}>
        <img src={copySVG} />
      </IconButton>
    </CustomTooltip>
  );
};

export default CopyButton;
