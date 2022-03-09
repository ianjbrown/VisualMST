import React, { useState } from "react";
import classes from "./PlayBack.module.css";
import TooltipIcon from "./TooltipIcon";

import Slider from "@mui/material/Slider";
import { Col } from "react-bootstrap";

function PlayBack(props) {
  const [backgroundOn, setBackgroundOn] = useState(true);

  const timeoutHandler = (event, newValue) => {
    props.onTimeoutChange(newValue);
  };

  function firstHandler() {
    props.onFirst();
  }

  function backHandler() {
    props.onBack();
  }

  function pauseHandler() {
    props.onPause();
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
      <Col data-testid="slider-col" xs={3} className={classes.bar}>
        <div data-testid="slow" className={classes.barText}>Slow</div>
        <Slider
          data-testid="slider"
          className={classes.slider}
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
        <div data-testid="fast" className={classes.barText}>Fast</div>
      </Col>
      <Col data-testid="playback-col" xs={6} className={classes.bar}>
        <TooltipIcon data-testid="first" id="first" firstHandler={firstHandler} />
        <TooltipIcon data-testid="back" id="back" backHandler={backHandler} />
        <TooltipIcon
          data-testid="play"
          id="play"
          pauseHandler={pauseHandler}
          paused={props.paused}
        />
        <TooltipIcon data-testid="forward" id="forward" forwardHandler={forwardHandler} />
        <TooltipIcon data-testid="last" id="last" lastHandler={lastHandler} />
      </Col>
      <Col data-testid="toggle-col" xs={3} className={classes.bar}>
        <TooltipIcon
          data-testid="hide"
          id="hide"
          toggleHandler={toggleBackgroundGraph}
          backgroundOn={backgroundOn}
        />
        <div data-testid="hide-text" className={classes.barText}>Hide Original Graph</div>
      </Col>
    </>
  );
}

export default PlayBack;
