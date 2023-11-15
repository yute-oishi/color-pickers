import { SxProps, Theme } from "@mui/material";

export const background: React.CSSProperties = {
  overflow: "auto",
  background:
    "var(--linear, linear-gradient(45deg, #b1f5eccc 0%, #86d5f9cc 100%))",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 0,
  padding: 12,
};

export const primaryColor: string = "#4484e4";
export const primaryColorHover: string = "#446de3";
export const getDefaultButtonStyle: SxProps<Theme> = {
  textTransform: "none",
  color: "#FFFFFF",
  backgroundColor: primaryColor,
  borderRadius: 10,
  border: "",
  "&:hover": {
    backgroundColor: primaryColorHover,
  },
};
