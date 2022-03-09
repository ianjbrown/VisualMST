import FirstPageIcon from "@mui/icons-material/FirstPage";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import LastPageIcon from "@mui/icons-material/LastPage";
import PlayButtonToggle from "./PlayButtonToggle";
import HideGraphToggle from "./HideGraphToggle";
import classes from "./PlayBack.module.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function TooltipIcon(props) {
  function firstHandler() {
    props.firstHandler();
  }

  function backHandler() {
    props.backHandler();
  }

  function pauseHandler() {
    props.pauseHandler();
  }

  function forwardHandler() {
    props.forwardHandler();
  }

  function lastHandler() {
    props.lastHandler();
  }

  function toggleHandler() {
    props.toggleHandler();
  }

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
            onClick={firstHandler}
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
            onClick={backHandler}
          />
        </OverlayTrigger>
      );
    case "play":
      return (
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>
                {props.paused ? "Play Visualisation" : "Pause Visualisation"}
              </strong>
            </Tooltip>
          }
        >
          <div>
            <PlayButtonToggle paused={props.paused} onClick={pauseHandler} />
          </div>
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
            onClick={forwardHandler}
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
            onClick={lastHandler}
          />
        </OverlayTrigger>
      );
    case "hide":
      return (
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>
                {props.backgroundOn
                  ? "Hide original graph edges"
                  : "Show original graph edges"}
              </strong>
            </Tooltip>
          }
        >
          <div className={classes.barToggle}>
            <HideGraphToggle
              backgroundOn={props.backgroundOn}
              toggleHandler={toggleHandler}
            />
          </div>
        </OverlayTrigger>
      );
  }
}

export default TooltipIcon;
