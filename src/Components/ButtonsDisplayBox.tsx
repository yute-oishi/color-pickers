import plusSVG from "@/assets/plus.svg";
import copyButtonSVG from "@/assets/copy_button.svg";
import codeSVG from "@/assets/code.svg";
import paletteSVG from "@/assets/palette.svg";
import deleteSVG from "@/assets/delete.svg";
import saveSVG from "@/assets/save.svg";
import dragSVG from "@/assets/drag.svg";
import clickSVG from "@/assets/click.svg";
import backSVG from "@/assets/back.svg";
import forwardSVG from "@/assets/forward.svg";
import backDisabledSVG from "@/assets/back_disabled.svg";
import forwardDisabledSVG from "@/assets/forward_disabled.svg";
import deleteDisabledSVG from "@/assets/delete_disabled.svg";
import saveDisabledSVG from "@/assets/save_disabled.svg";
import { ColorResult, CompactPicker } from "react-color";
import { Grid, Button, IconButton, Box } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  buttonsState,
  focusIdState,
  backStackState,
  forwardStackState,
  lastSavedDataState,
} from "@/atoms";
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
import { ButtonStyle, UserOperation } from "@/modules/types";

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
  const [backStacks, setBackStacks] = useRecoilState(backStackState);
  const [forwardStacks, setForwardStacks] = useRecoilState(forwardStackState);
  const [lastSavedData, setLastSavedData] = useRecoilState(lastSavedDataState);
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

        setBackStacks([
          ...backStacks,
          { type: "dnd", index: oldIndex, newIndex: newIndex },
        ]);
        setForwardStacks([]);

        const newState = arrayMove(buttons, oldIndex, newIndex);
        setButtons(newState);
        setFocusId(newState.findIndex((b) => b.id === focusButtonId));
      }
    },
    [buttons]
  );

  const handleModalOpen = () => setModalOpen(true);

  const handleCopyButton = () => {
    const buttonStyle: ButtonStyle = { ...buttons[focusId], id: uuidv4() };
    setBackStacks([
      ...backStacks,
      { type: "add", color: buttonStyle, index: buttons.length },
    ]);
    setForwardStacks([]);
    setButtons([...buttons, buttonStyle]);
  };

  const handleRandomAddButton = () => {
    const buttonStyle: ButtonStyle = getRandomButton();
    setBackStacks([
      ...backStacks,
      { type: "add", color: buttonStyle, index: buttons.length },
    ]);
    setForwardStacks([]);
    setButtons([...buttons, buttonStyle]);
  };
  const handleDeleteButton = () => {
    if (buttons.length !== 1) {
      setBackStacks([
        ...backStacks,
        { type: "delete", color: buttons[focusId], index: focusId },
      ]);
      setForwardStacks([]);
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

  const handleBack = () => {
    if (backStacks.length === 0) {
      return;
    }
    handleBackForward(true);
  };

  const handleForward = () => {
    if (forwardStacks.length === 0) {
      return;
    }
    handleBackForward(false);
  };

  const handleChangeBgColor = (color: ColorResult) => {
    const newBgColor: string = `${color.hex}${decimalToHex(color.rgb.a || 0)}`;
    setBackStacks([
      ...backStacks,
      { type: "bgColor", bgColor: bgColor, newBgColor: newBgColor },
    ]);
    setForwardStacks([]);
    setBgColor(newBgColor);
  };

  const handleBackForward = (isBack: boolean) => {
    const [state, setState] = isBack
      ? [backStacks, setBackStacks]
      : [forwardStacks, setForwardStacks];
    const [anotherState, setAnotherState] = isBack
      ? [forwardStacks, setForwardStacks]
      : [backStacks, setBackStacks];

    const operate: UserOperation = state[state.length - 1];
    if (
      operate.type == "focus" &&
      operate.index !== undefined &&
      operate.newIndex !== undefined
    ) {
      setFocusId(operate.index);
      setState(state.filter((_, i) => i !== state.length - 1));
      setAnotherState([
        ...anotherState,
        { type: "focus", index: operate.newIndex, newIndex: operate.index },
      ]);
    }
    if (
      operate.type == "add" &&
      operate.color !== undefined &&
      operate.index !== undefined
    ) {
      setButtons(buttons.filter((_, i) => i !== operate.index));
      setState(state.filter((_, i) => i !== state.length - 1));
      setAnotherState([
        ...anotherState,
        { type: "delete", index: operate.index, color: operate.color },
      ]);
      setTextId(uuidv4());
    }
    if (
      operate.type == "delete" &&
      operate.index !== undefined &&
      operate.color !== undefined
    ) {
      setButtons([
        ...buttons.slice(0, operate.index),
        operate.color,
        ...buttons.slice(operate.index),
      ]);
      setState(state.filter((_, i) => i !== state.length - 1));
      setAnotherState([
        ...anotherState,
        { type: "add", index: operate.index, color: operate.color },
      ]);
      setTextId(uuidv4());
    }
    if (
      operate.type == "bgColor" &&
      operate.bgColor !== undefined &&
      operate.newBgColor !== undefined
    ) {
      setBgColor(operate.bgColor);
      setState(state.filter((_, i) => i !== state.length - 1));
      setAnotherState([
        ...anotherState,
        {
          type: "bgColor",
          bgColor: operate.newBgColor,
          newBgColor: operate.bgColor,
        },
      ]);
    }
    if (
      operate.type == "dnd" &&
      operate.index !== undefined &&
      operate.newIndex !== undefined
    ) {
      const newState = arrayMove(buttons, operate.newIndex, operate.index);
      const focusButtonId = buttons[focusId].id;
      setButtons(newState);
      setFocusId(newState.findIndex((b) => b.id === focusButtonId));
      setState(state.filter((_, i) => i !== state.length - 1));
      setAnotherState([
        ...anotherState,
        {
          type: "dnd",
          index: operate.newIndex,
          newIndex: operate.index,
        },
      ]);
    }
    if (
      operate.type == "button" &&
      operate.index !== undefined &&
      operate.color !== undefined &&
      operate.newColor !== undefined
    ) {
      const newButtons = [...buttons];
      newButtons[operate.index] = operate.color;
      setButtons(newButtons);
      setState(state.filter((_, i) => i !== state.length - 1));
      setAnotherState([
        ...anotherState,
        {
          type: "button",
          index: operate.index,
          color: operate.newColor,
          newColor: operate.color,
        },
      ]);
      setTextId(uuidv4());
    }
  };

  const handleClickSave = () => {
    if (
      localStorage.getItem("buttonsData") === null ||
      localStorage.getItem("buttonsData") !== JSON.stringify(buttons)
    ) {
      const buttonsData = JSON.stringify(buttons);
      localStorage.setItem("buttonsData", buttonsData);
      setLastSavedData(buttonsData);
      toast("保存に成功しました。", {
        position: "top-center",
        autoClose: 600, // ミリ秒単位でトーストが表示される時間
        hideProgressBar: true,
      });
    }
  };

  const handleFocus = (index: number) => {
    setBackStacks([
      ...backStacks,
      { type: "focus", index: focusId, newIndex: index },
    ]);
    setForwardStacks([]);
    setFocusId(index);
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
      cursor: isDragMode ? "grab" : "pointer",
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
                handleChangeBgColor(color);
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
            <IconButton
              onClick={handleClickSave}
              sx={{
                p: 0,
                mx: 1,
                cursor:
                  lastSavedData === JSON.stringify(buttons)
                    ? "default"
                    : "pointer",
              }}
              disableRipple={lastSavedData === JSON.stringify(buttons)}
            >
              {lastSavedData === JSON.stringify(buttons) ? (
                <img src={saveDisabledSVG} />
              ) : (
                <img src={saveSVG} />
              )}
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="操作を1つ戻します。">
            <IconButton
              onClick={handleBack}
              sx={{
                p: 0,
                mx: 1,
                cursor: backStacks.length === 0 ? "default" : "pointer",
              }}
              disableRipple={backStacks.length === 0}
            >
              {backStacks.length === 0 ? (
                <img src={backDisabledSVG} />
              ) : (
                <img src={backSVG} />
              )}
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="操作を1つ進めます。">
            <IconButton
              onClick={handleForward}
              sx={{
                p: 0,
                mx: 1,
                cursor: forwardStacks.length === 0 ? "default" : "pointer",
              }}
              disableRipple={forwardStacks.length === 0}
            >
              {forwardStacks.length === 0 ? (
                <img src={forwardDisabledSVG} />
              ) : (
                <img src={forwardSVG} />
              )}
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
            <IconButton sx={{ p: 0, mx: 0.5 }} onClick={handleRandomAddButton}>
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
            <IconButton
              onClick={handleDeleteButton}
              sx={{
                p: 0,
                mx: 1,
                cursor: buttons.length === 1 ? "default" : "pointer",
              }}
              disableRipple={buttons.length === 1}
            >
              {buttons.length === 1 ? (
                <img src={deleteDisabledSVG} />
              ) : (
                <img src={deleteSVG} />
              )}
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
                      handleFocus(index);
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
