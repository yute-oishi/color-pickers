import { IconButton } from "@mui/material";
import copySVG from "../assets/copy.svg";
import clipboardCopy from "clipboard-copy";

const CopyButton = ({ text }: { text: string }) => {
  const handleCopyClick = async () => {
    await clipboardCopy(text);
  };

  return (
    <IconButton onClick={handleCopyClick}>
      <img src={copySVG} />
    </IconButton>
  );
};

export default CopyButton;
