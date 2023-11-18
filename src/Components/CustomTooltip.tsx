import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

const CustomTooltip = (props: TooltipProps) => {
  return (
    <Tooltip
      slotProps={{
        popper: {
          style: { translate: "0px 8px" },
        },
      }}
      arrow
      placement="top"
      TransitionProps={{ timeout: 400 }}
      {...props}
    >
      {props.children}
    </Tooltip>
  );
};

export default CustomTooltip;
