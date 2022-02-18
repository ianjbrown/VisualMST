import FirstPageIcon from "@mui/icons-material/FirstPage";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import LastPageIcon from "@mui/icons-material/LastPage";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function TooltipIcon(props) {
  switch (props.id) {
    case "first":
      return (
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>First Step</strong>
            </Tooltip>
          }
        >
          <FirstPageIcon
            sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
            onClick={props.firstHandler}
          />
        </OverlayTrigger>
      );
    case "back":
      return (
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Previous Step</strong>
            </Tooltip>
          }
        >
          <ArrowBackIosNewOutlinedIcon
            sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
            onClick={props.backHandler}
          />
        </OverlayTrigger>
      );
    case "play":
      return (
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>{props.symbolToolTip}</strong>
            </Tooltip>
          }
        >
          {props.symbol}
        </OverlayTrigger>
      );
    case "forward":
      return (
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Next Step</strong>
            </Tooltip>
          }
        >
          <ArrowForwardIosOutlinedIcon
            sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
            onClick={props.forwardHandler}
          />
        </OverlayTrigger>
      );
    case "last":
      return (
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Final Step</strong>
            </Tooltip>
          }
        >
          <LastPageIcon
            sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
            onClick={props.lastHandler}
          />
        </OverlayTrigger>
      );
    }
}

export default TooltipIcon;
