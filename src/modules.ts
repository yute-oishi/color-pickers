import { ButtonStyle } from "./types";

export const getCodeTextTs = (buttonProps: ButtonStyle): string => {
  return `import { Button, SxProps, Theme } from "@mui/material";
import React from "react";

const style: SxProps<Theme> = {
  textTransform: "none",
  borderRadius: 2,
  color: "${buttonProps.color}",
  backgroundColor: "${buttonProps.bgColor}",
  border: "1px solid ${buttonProps.borderColor}",
  "&:hover": {
    backgroundColor: "${buttonProps.hoverColor}",
  },
  "&:active": {
    backgroundColor: "${buttonProps.activeColor}",
  },
};

const CustomButton: React.FC = () => {
  return <Button sx={style}>${buttonProps.text}</Button>;
};

export default CustomButton;`;
};

export const getCodeTextJs = (buttonProps: ButtonStyle): string => {
  return `import { Button } from "@mui/material";
import React from "react";

const style = {
  textTransform: "none",
  borderRadius: 2,
  color: "${buttonProps.color}",
  backgroundColor: "${buttonProps.bgColor}",
  border: "1px solid ${buttonProps.borderColor}",
  "&:hover": {
    backgroundColor: "${buttonProps.hoverColor}",
  },
  "&:active": {
    backgroundColor: "${buttonProps.activeColor}",
  },
};

const CustomButton = () => {
  return <Button sx={style}>${buttonProps.text}</Button>;
};

export default CustomButton;`;
};
