import React, { useState } from "react";
import classes from "./PlayBack.module.css";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import TooltipIcon from "./TooltipIcon";

import Slider from "@mui/material/Slider";
import { OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";

function PlayBack(props) {
  const [backgroundOn, setBackgroundOn] = useState(true);

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
    <>
      <Col xs={3} className={classes.bar}>
        <div className={classes.barText}>Slow</div>
        <Slider className={classes.slider}
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
        <div className={classes.barText}>Fast</div>
        
      </Col>
      <Col xs={6} className={classes.bar}>
        <TooltipIcon id="first" firstHandler={firstHandler} />
        <TooltipIcon id="back" backHandler={backHandler} />
        <TooltipIcon
          id="play"
          symbolToolTip={props.symbolToolTip}
          symbol={props.symbol}
        />
        <TooltipIcon id="forward" forwardHandler={forwardHandler} />
        <TooltipIcon id="last" lastHandler={lastHandler} />
      </Col>
      <Col xs={3} className={classes.bar}>
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Hide the original graph edges</strong>
            </Tooltip>
          }
        >
          <div className={classes.barToggle}>{toggle}</div>
        </OverlayTrigger>
        <div className={classes.barText}>{toggleText}</div>
      </Col>
    </>
  );
}

export default PlayBack;
