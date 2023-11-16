import plusSVG from "@/assets/plus.svg";
import { Grid, Button, IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { buttonsState, focusIdState } from "@/atoms";
import { getDefaultButtonStyle } from "@/types";

const ButtonsDisplayBox = ({ bgColor }: { bgColor: string }) => {
  const [buttons, setButtons] = useRecoilState(buttonsState);
  const [focusId, setFocusId] = useRecoilState(focusIdState);

  const getButtonStyle = (id: number) => {
    return {
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
    <Grid
      container
      sx={{
        backgroundColor: bgColor,
        borderRadius: 8,
        p: 2,
        my: 2,
        alignItems: "center",
      }}
    >
      {buttons.map((_, index) => (
        <Button
          key={index}
          variant="contained"
          sx={
            index !== focusId
              ? getButtonStyle(index)
              : {
                  ...getButtonStyle(index),
                  top: "-8px",
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

      <IconButton
        onClick={() => {
          setButtons([...buttons, getDefaultButtonStyle()]);
        }}
      >
        <img src={plusSVG} />
      </IconButton>
    </Grid>
  );
};

export default ButtonsDisplayBox;
