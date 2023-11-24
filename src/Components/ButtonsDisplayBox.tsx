import plusSVG from "@/assets/plus.svg";
import copyButtonSVG from "@/assets/copy_button.svg";
import codeSVG from "@/assets/code.svg";
import paletteSVG from "@/assets/palette.svg";
import deleteSVG from "@/assets/delete.svg";
import saveSVG from "@/assets/save.svg";
import dragSVG from "@/assets/drag.svg";
import clickSVG from "@/assets/click.svg";
import { ColorResult, CompactPicker } from "react-color";
import { Grid, Button, IconButton, Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { buttonsState, focusIdState } from "@/atoms";
import CustomTooltip from "./CustomTooltip";
import React from "react";
import FocusButtonTextField from "./FocusButtonTextField";
import CodeModal from "./CodeModal";
import { getRandomButton } from "@/modules/buttonsUtils";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { customStrategy } from "@/modules/customDnd";

interface SortableItemProps {
  id: string;
  children: React.ReactElement;
}

function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  let style = {};
  if (transform) {
    style = {
      transform: CSS.Transform.toString({ ...transform, scaleX: 1, scaleY: 1 }),
      transition: transition,
    };
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

const decimalToHex = (alpha: number) =>
  alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

const ButtonsDisplayBox = () => {
  const [buttons, setButtons] = useRecoilState(buttonsState);
  const [focusId, setFocusId] = useRecoilState(focusIdState);
  const [bgColor, setBgColor] = React.useState<string>("#FFFFFF");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [textId, setTextId] = React.useState<string>(uuidv4());
  const [isDragMode, setIsDragMode] = React.useState<boolean>(false);

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const focusButtonId = buttons[focusId].id;
      const { active, over } = event;
      if (over === null) {
        return;
      }
      if (active.id !== over.id) {
        const oldIndex = buttons.findIndex((b) => b.id == active.id);
        const newIndex = buttons.findIndex((b) => b.id == over.id);
        const newState = arrayMove(buttons, oldIndex, newIndex);
        setButtons(newState);
        setFocusId(newState.findIndex((b) => b.id === focusButtonId));
      }
    },
    [buttons]
  );

  const handleModalOpen = () => setModalOpen(true);

  const handleCopyButton = () => {
    setButtons([...buttons, { ...buttons[focusId], id: uuidv4() }]);
  };
  const handleDeleteButton = () => {
    if (buttons.length !== 1) {
      if (focusId === buttons.length - 1) {
        setFocusId(focusId - 1);
      }
      const newButtons = buttons.filter((_, index) => index !== focusId);
      setButtons(newButtons);
    }
    setTextId(uuidv4());
  };
  const handleClickBgSelect = () => {
    setBgDisplay(true);
  };

  const handleCloseBgSelect = () => {
    setBgDisplay(false);
  };

  const handleClickSave = () => {
    const buttonsData = JSON.stringify(buttons);
    localStorage.setItem("buttonsData", buttonsData);
    toast("保存に成功しました。", {
      position: "top-center",
      autoClose: 600, // ミリ秒単位でトーストが表示される時間
      hideProgressBar: true,
    });
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
      <ToastContainer />
      <CodeModal open={modalOpen} setOpen={setModalOpen} />
      {bgDisplay ? (
        <div
          style={{
            position: "absolute",
            zIndex: "2",
          }}
        >
          <div style={{ position: "absolute", left: "420px", top: "-42px" }}>
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
          <FocusButtonTextField textId={textId} />
          <CustomTooltip title="現在の状態を保存します。">
            <IconButton onClick={handleClickSave} sx={{ p: 0, mx: 1 }}>
              <img src={saveSVG} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip
            title={
              isDragMode
                ? "クリックすることで、入れ替えモードを終了します。"
                : "クリックすることで、入れ替えモードになります。"
            }
          >
            <IconButton
              onClick={() => {
                setIsDragMode(!isDragMode);
              }}
              sx={{ p: 0, mx: 1 }}
            >
              {isDragMode ? <img src={clickSVG} /> : <img src={dragSVG} />}
            </IconButton>
          </CustomTooltip>
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
        <DndContext onDragEnd={handleDragEnd} autoScroll={false}>
          <SortableContext
            items={buttons}
            strategy={customStrategy}
            disabled={!isDragMode}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {buttons.map((button, index) => (
                <SortableItem key={button.id} id={button.id}>
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
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Grid>
    </div>
  );
};

export default ButtonsDisplayBox;
