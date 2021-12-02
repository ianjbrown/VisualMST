import { useState } from "react";
import classes from "./PlayBack.module.css";

function PlayBack(props) {
  const [Paused, setPaused] = useState(true);
  const [backgroundOn, setBackgroundOn] = useState(true);

  const thing = Paused ? "▶" : '||'
  function backHandler() {
    props.onBack();
  }

  function forwardHandler() {
    props.onForward();
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
    <div className={classes.actions}>
      <button onClick={backHandler}>&#x2190;</button>
      <span> </span>
      <button onClick={playPauseHandler}>{thing}</button>
      <span> </span>
      <button onClick={forwardHandler}>&#x2192;</button>
      <span> </span>
      <button onClick={toggleBackgroundGraph}>Toggle Original Graph</button>
    </div>
  );
}

export default PlayBack;