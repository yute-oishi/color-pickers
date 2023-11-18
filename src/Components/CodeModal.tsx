import { getCodeTextJs, getCodeTextTs } from "@/modules";
import { Box, IconButton, Modal, Tab, Tabs } from "@mui/material";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useRecoilState } from "recoil";
import { buttonsState, focusIdState } from "@/atoms";
import infoSVG from "@/assets/info.svg";
import CustomTooltip from "./CustomTooltip";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  border: "2px solid #AAAAAA",
  backgroundColor: "#333333",
  borderRadius: 4,
  p: 1,
};

const CodeModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [buttons] = useRecoilState(buttonsState);
  const [focusId] = useRecoilState(focusIdState);
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={style}>
        <Tabs
          value={value}
          onChange={handleChange}
          style={{ color: "white", display: "flex" }}
        >
          <Tab
            label="Typescript"
            sx={{ color: "white", textTransform: "none" }}
          />
          <Tab
            label="Javascript"
            sx={{ color: "white", textTransform: "none" }}
          />
        </Tabs>
        <div
          style={{
            height: "0",
            textAlign: "right",
            position: "relative",
            top: "-48px",
          }}
        >
          <CustomTooltip
            title={`npm install @mui/materialによるパッケージインストールが必要です。`}
          >
            <IconButton>
              <img src={infoSVG} />
            </IconButton>
          </CustomTooltip>
        </div>
        <div style={{ fontSize: "18px", overflowY: "auto", height: "400px" }}>
          <SyntaxHighlighter language="typescript" style={agate}>
            {value === 0
              ? getCodeTextTs(buttons[focusId])
              : getCodeTextJs(buttons[focusId])}
          </SyntaxHighlighter>
        </div>
      </Box>
    </Modal>
  );
};

export default CodeModal;
