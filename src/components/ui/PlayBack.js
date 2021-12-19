import { useState } from "react";
import classes from "./PlayBack.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

function PlayBack(props) {
  const [Paused, setPaused] = useState(true);
  const [backgroundOn, setBackgroundOn] = useState(true);

  let playPause;
  if (Paused) {
    playPause = (
      <PlayArrowIcon sx={{ fontSize: 60 }} onClick={playPauseHandler} />
    );
  } else {
    playPause = (
      <PauseOutlinedIcon sx={{ fontSize: 60 }} onClick={playPauseHandler} />
    );
  }

  let toggle;
  let toggleText;
  if (backgroundOn) {
    toggle = (
      <ToggleOffOutlinedIcon
        sx={{ fontSize: 60 }}
        onClick={toggleBackgroundGraph}
      ></ToggleOffOutlinedIcon>
    );
    toggleText = "Hide Original Graph";
  } else {
    toggle = (
      <ToggleOnOutlinedIcon
        sx={{ fontSize: 60 }}
        onClick={toggleBackgroundGraph}
        color="success"
      ></ToggleOnOutlinedIcon>
    );
    toggleText = "Show Original Graph";
  }

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

  function playPauseHandler() {
    props.onPlayPause(!Paused);
    setPaused(!Paused);
  }

  function toggleBackgroundGraph() {
    props.onToggleBackgroundGraph(!backgroundOn);
    setBackgroundOn(!backgroundOn);
  }

  return (
    <div className={classes.bar}>
      <FirstPageIcon sx={{ fontSize: 60 }} onClick={firstHandler} />
      <ArrowBackIosNewOutlinedIcon
        sx={{ fontSize: 50 }}
        onClick={backHandler}
      />
      {playPause}
      <ArrowForwardIosOutlinedIcon
        sx={{ fontSize: 50 }}
        onClick={forwardHandler}
      />
      <LastPageIcon sx={{ fontSize: 60 }} onClick={lastHandler} />
      
      <div className={classes.barToggle}>{toggle}</div>
      <div className={classes.barToggleText}>{toggleText}</div>
    </div>
  );
}

export default PlayBack;
