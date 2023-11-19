import plusSVG from "@/assets/plus.svg";
import copyButtonSVG from "@/assets/copy_button.svg";
import codeSVG from "@/assets/code.svg";
import paletteSVG from "@/assets/palette.svg";
import deleteSVG from "@/assets/delete.svg";
import { ColorResult, CompactPicker } from "react-color";
import { Grid, Button, IconButton, Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { buttonsState, focusIdState } from "@/atoms";
import CustomTooltip from "./CustomTooltip";
import React from "react";
import FocusButtonTextField from "./FocusButtonTextField";
import CodeModal from "./CodeModal";
import { getRandomButton } from "@/modules";

const decimalToHex = (alpha: number) =>
  alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

const ButtonsDisplayBox = () => {
  const [buttons, setButtons] = useRecoilState(buttonsState);
  const [focusId, setFocusId] = useRecoilState(focusIdState);
  const [bgColor, setBgColor] = React.useState<string>("#FFFFFF");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleModalOpen = () => setModalOpen(true);

  const handleCopyButton = () => {
    setButtons([...buttons, { ...buttons[focusId] }]);
  };
  const handleDeleteButton = () => {
    if (buttons.length !== 1) {
      if (focusId === buttons.length - 1) {
        setFocusId(focusId - 1);
      }
      const newButtons = buttons.filter((_, index) => index !== focusId);
      setButtons(newButtons);
    }
  };
  const handleClickBgSelect = () => {
    setBgDisplay(true);
  };

  const handleCloseBgSelect = () => {
    setBgDisplay(false);
  };

  const [bgDisplay, setBgDisplay] = React.useState<boolean>(false);

  const getButtonStyle = (id: number) => {
    return {
      textTransform: "none",
      borderRadius: 2,
      m: 1.2,
      color: buttons[id].color,
      backgroundColor: buttons[id].bgColor,
      height: "3em",
      border: `1px solid ${buttons[id].borderColor}`,
      "&:hover": {
        backgroundColor: buttons[id].hoverColor,
      },
      "&:active": {
        backgroundColor: buttons[id].activeColor,
      },
    };
  };
  return (
    <div>
      <CodeModal open={modalOpen} setOpen={setModalOpen} />
      {bgDisplay ? (
        <div
          style={{
            position: "absolute",
            zIndex: "2",
          }}
        >
          <div style={{ position: "absolute", left: "280px", top: "-42px" }}>
            <div
              style={{
                position: "fixed",
                inset: "0",
              }}
              onClick={handleCloseBgSelect}
            />
            <CompactPicker
              color={bgColor}
              onChange={(color: ColorResult) => {
                setBgColor(`${color.hex}${decimalToHex(color.rgb.a || 0)}`);
              }}
            />
          </div>
        </div>
      ) : null}
      <div style={{ height: "30px" }}></div>
      <Grid
        sx={{
          backgroundColor: bgColor,
          borderRadius: 8,
          border: "1px solid #DDDDDD",
          p: 2,
          mb: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", mb: 2 }}>
          <FocusButtonTextField />
          <CustomTooltip title="ランダムなテキスト、色でボタンを作成します。">
            <IconButton
              sx={{ p: 0, mx: 0.5 }}
              onClick={() => {
                setButtons([...buttons, getRandomButton()]);
              }}
            >
              <img src={plusSVG} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="選択中のボタンを複製します。">
            <IconButton onClick={handleCopyButton} sx={{ p: 0, mx: 1 }}>
              <img src={copyButtonSVG} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="選択中のボタンのReactコードを表示します。">
            <IconButton sx={{ p: 0, mx: 1 }} onClick={handleModalOpen}>
              <img src={codeSVG} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="このエリアの背景色を変更します。">
            <IconButton onClick={handleClickBgSelect} sx={{ p: 0, mx: 1 }}>
              <img src={paletteSVG} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="選択中のボタンを削除します。">
            <IconButton onClick={handleDeleteButton} sx={{ p: 0, mx: 1 }}>
              <img src={deleteSVG} />
            </IconButton>
          </CustomTooltip>
        </Box>
        {buttons.map((_, index) => (
          <Button
            key={index}
            variant="contained"
            sx={
              index !== focusId
                ? getButtonStyle(index)
                : {
                    ...getButtonStyle(index),
                    top: "-10px",
                    fontWeight: "bold",
                  }
            }
            onClick={() => {
              setFocusId(index);
            }}
          >
            {buttons[index].text}
          </Button>
        ))}
      </Grid>
    </div>
  );
};

export default ButtonsDisplayBox;
