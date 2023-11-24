import { defaultButtonStyle } from "@/styles";
import { ButtonStyle } from "@/modules/types";
import { Box, Button, Modal, SxProps, Theme, useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { buttonsState, lastSavedDataState } from "@/atoms";
import React from "react";

const getButtonStyle = (button: ButtonStyle) => {
  return {
    textTransform: "none",
    borderRadius: 2,
    m: 1.2,
    width: "20%",
    color: button.color,
    backgroundColor: button.bgColor,
    height: "3em",
    border: `1px solid ${button.borderColor}`,
    "&:hover": {
      backgroundColor: button.hoverColor,
    },
    "&:active": {
      backgroundColor: button.activeColor,
    },
  };
};

const StorageLoadAskModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [_, setButtons] = useRecoilState(buttonsState);

  const [__, setLastSavedData] = useRecoilState(lastSavedDataState);

  const theme = useTheme();
  const style: SxProps<Theme> = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "40%",
    },
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
    border: "2px solid #AAAAAA",
    backgroundColor: "#CCCCCC",
    borderRadius: 4,
    p: 2,
    fontSize: 20,
  };

  const handleLoadData = () => {
    const storedData = localStorage.getItem("buttonsData");
    if (storedData) {
      const buttonsData = JSON.parse(storedData);
      setButtons(buttonsData);
      setLastSavedData(storedData);
    }
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Box sx={{ m: 1 }}>
          前回のデータが残っています。 <br />
          前回のデータ内容から始めますか？
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            sx={getButtonStyle(defaultButtonStyle)}
            onClick={handleLoadData}
          >
            はい
          </Button>
          <Button
            sx={getButtonStyle(defaultButtonStyle)}
            onClick={() => setOpen(false)}
          >
            いいえ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StorageLoadAskModal;
