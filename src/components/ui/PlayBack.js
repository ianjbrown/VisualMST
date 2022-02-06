import React, { useState, useRef } from "react";
import classes from "./PlayBack.module.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import Slider from "@mui/material/Slider";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function PlayBack(props) {
  const [backgroundOn, setBackgroundOn] = useState(true);
  const [firstStepShow, setFirstStepShow] = useState(false);
  const firstStep = useRef(null);

  // const [timeout, setTimeout] = useState(1000);

  let toggle;
  let toggleText;
  if (backgroundOn) {
    toggle = (
      <ToggleOffOutlinedIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={toggleBackgroundGraph}
      ></ToggleOffOutlinedIcon>
    );
    toggleText = "Hide Original Graph";
  } else {
    toggle = (
      <ToggleOnOutlinedIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={toggleBackgroundGraph}
        color="success"
      ></ToggleOnOutlinedIcon>
    );
    toggleText = "Show Original Graph";
  }

  const timeoutHandler = (event, newValue) => {
    console.log(newValue);
    props.onTimeoutChange(newValue);
  };

  function firstHandler() {
    props.onFirst();
  }

  function backHandler() {
    props.onBack();
  }

  function forwardHandler() {
    props.onForward();
  }

  function lastHandler() {
    props.onLast();
  }

  function toggleBackgroundGraph() {
    props.onToggleBackgroundGraph(!backgroundOn);
    setBackgroundOn(!backgroundOn);
  }

  return (
    <div className={classes.bar}>
      <div className={classes.slowText}>Slow</div>
      <div className={classes.fastText}>Fast</div>
      <div className={classes.setSpeed}>
        <Slider
          aria-label="Speed"
          defaultValue={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => <div>Speed: {value / 200}</div>}
          step={100}
          marks
          min={100}
          max={2000}
          onChangeCommitted={timeoutHandler}
        />
      </div>
      <OverlayTrigger
        placement={"top"}
        overlay={
          <Tooltip id={`tooltip-top`}>
            <strong>First Step</strong>
          </Tooltip>
        }
      >
        <FirstPageIcon
          ref={firstStep}
          onHover={() => setFirstStepShow(!firstStepShow)}
          sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
          onClick={firstHandler}
        />
      </OverlayTrigger>

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

      <OverlayTrigger
        placement={"top"}
        overlay={
          <Tooltip id={`tooltip-top`}>
            <strong>
              Hide the original graph edges
            </strong>
          </Tooltip>
        }
      >
        <div className={classes.barToggle}>{toggle}</div>
      </OverlayTrigger>
      <div className={classes.barToggleText}>{toggleText}</div>
    </div>
  );
}

export default PlayBack;
