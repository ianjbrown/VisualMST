import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import Circle from "../../datastructures/Circle";
import PlayBack from "../ui/PlayBack";
import PseudoCode from "../ui/PseudoCode";
import classes from "../../pages/Visualisation.module.css";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";

function KruskalVisualisationPage(props) {
  const [algorithmState, setAlgorithmState] = useState(0);
  const [algorithmStep, setAlgorithmStep] = useState(0);
  const [edgesQueue, setEdgesQueue] = useState(
    JSON.parse(JSON.stringify(props.MSTGraph[2]))
  );
  const [edgesQueueRemoved, setEdgesQueueRemoved] = useState([]);
  const [backgroundOn, setBackgroundOn] = useState(true);
  const [Paused, setPaused] = useState(true);
  const [Expanded, setExpanded] = useState(true);
  const [inverseSpeed, setInverseSpeed] = useState(1000);

  const expandInfo = useSpring({
    opacity: Expanded ? 1 : 0,
    marginLeft: Expanded ? 0 : 470,
  });
  const expandCanvas = useSpring({
    // to: async (next, cancel) => {
    //   await next({opacity: 1})
    //   await next({opacity: 0})
    // }
    left: Expanded ? "10px" : "305px",
    right: Expanded ? "500px" : "245px",
    // scale: Expanded ? (1, 1) : (1, 1),
  });
  const fadeMessage = useSpring({
    opacity: 0,
  });

  const notInitialRender = useRef(false);

  let expandArrow;
  if (Expanded) {
    expandArrow = (
      <ArrowForwardIosOutlinedIcon
        onClick={expandHandler}
      ></ArrowForwardIosOutlinedIcon>
    );
  } else {
    expandArrow = (
      <ArrowBackIosNewOutlinedIcon
        onClick={expandHandler}
      ></ArrowBackIosNewOutlinedIcon>
    );
  }

  let playPause;
  let playPauseToolTip;
  if (Paused) {
    playPause = (
      <PlayArrowIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={playPauseHandler}
      />
    );
    playPauseToolTip = "Play Visualisation"
  } else {
    playPause = (
      <PauseOutlinedIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={playPauseHandler}
      />
    );
    playPauseToolTip = "Pause Visualisation"
  }

  let circles = [];
  let graph = props.graph;
  let MSTGraph = props.MSTGraph;
  console.log(MSTGraph);
  let minWeight = MSTGraph[3];
  // let ufs = MSTGraph[3];
  let edgesQ = edgesQueue;
  let edgesQRemoved = edgesQueueRemoved;
  const edgesQueuePrint = edgesQueue.map((edge) => (
    <li>
      (({edge.elem[0]},{edge.elem[1]}), {edge.prio})
    </li>
  ));
  // const disjointSetsPrint = ufs.map((uf) => <li>{uf}</li>);

  let edge;
  if (typeof edgesQueue[0] == "undefined") {
    edge = [0, 0, 0];
  } else {
    edge = [edgesQ[0].elem[0], edgesQ[0].elem[1], edgesQ[0].prio];
  }

  const AlgorithmStates = [
    "Edges are sorted by their weight in non-decreasing order",
    "While there are still edges to be process in the queue, select edge with lowest weight",
    `The edge between vertices ${edge[0]} and ${edge[1]}, with weight = ${edge[2]}`,
    "If adding e to MST doesn't create cycle;",
    "Add e to MST",
    "Else",
    "Reject e from MST",
    `Found spanning tree with n-1 (${
      MSTGraph[0].AdjList.size - 1
    }) edges and minimum weight ${minWeight}`,
  ];

  let algorithmStateMessage = (
    <animated.div className={classes.algorithmStateMessage}>
      {AlgorithmStates[algorithmState]}
    </animated.div>
  );

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  const ctxRef = useRef(null);
  const ctxRef2 = useRef(null);

  function edgeInMST(edge) {
    let found;
    MSTGraph[1].forEach((MSTEdge) => {
      if (
        edge.elem[0] === MSTEdge[0] &&
        edge.elem[1] === MSTEdge[1] &&
        edge.prio === MSTEdge[2]
      ) {
        found = true;
      }
    });
    return found;
  }

  function prepareCanvas() {
    const canvas = canvasRef.current;
    const canvas2 = canvasRef2.current;

    canvas.width = window.innerWidth * (5 / 8);
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth * (5 / 8);
    canvas2.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    ctx.scale(1.3, 2.1);
    ctx2.scale(1.3, 2.1);

    ctx.lineCap = "round";
    ctx2.lineCap = "round";

    ctx.strokeStyle = "black";
    ctx2.strokeStyle = "black";

    ctx2.lineWidth = 1;
    ctx2.font = "30px Arial";

    ctxRef.current = ctx;
    ctxRef2.current = ctx2;
  }

  function drawCircles() {
    circles = [];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (var i = 0; i < graph.noOfVertices; i++) {
      var circle = new Circle(
        400 + 300 * Math.cos((i * 2 * Math.PI) / graph.noOfVertices),
        235 + 200 * Math.sin((i * 2 * Math.PI) / graph.noOfVertices),
        i,
        "black"
      );
      circle.draw(ctx);
      circles.push(circle);
    }
    return circles;
  }

  function drawEdgeWeights(p1, p2, weight, colour) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    const canvas = canvasRef2.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "12.5px Arial";
    ctx.fillStyle = colour;
    ctx.save();
    ctx.translate(p1.x + dx * (1 / 2), p1.y + dy * (1 / 2));
    if (dx < 0) {
      ctx.rotate(Math.atan2(dy, dx) - Math.PI);
    } else {
      ctx.rotate(Math.atan2(dy, dx));
    }
    ctx.fillText(weight, 0, 0);
    if (weight > 9) {
      ctx.fillText("__", 0, 0);
    } else {
      ctx.fillText("_", 0, 0);
    }
    ctx.restore();
  }

  function drawGraph(AdjList) {
    const canvas = canvasRef2.current;
    const ctx = canvas.getContext("2d");
    var get_keys = AdjList.keys();
    for (var i of get_keys) {
      var currentCircle = circles[i];
      var get_values = AdjList.get(i);
      for (var j of get_values) {
        if (j.node < i) continue;
        var adjacentCircle = circles[j.node];
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(currentCircle.x, currentCircle.y);
        ctx.lineTo(adjacentCircle.x, adjacentCircle.y);
        ctx.stroke();
        drawEdgeWeights(currentCircle, adjacentCircle, j.weight, "black");
      }
    }
  }

  function graphStep(MSTGraph) {
    const canvas = canvasRef2.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawCircles();
    if (backgroundOn) drawGraph(graph.AdjList);

    var steps = MSTGraph[2];
    console.log(steps);
    console.log(algorithmStep);
    for (var i = 0; i < algorithmStep; i++) {
      // console.log(steps);
      var step = steps[i];
      var p1 = step.elem[0];
      var p2 = step.elem[1];
      var weight = step.prio;

      if (edgeInMST(step)) {
        ctx.strokeStyle = "orange";
        var fillStyle = "orange";
        ctx.lineWidth = 1.25;
      } else {
        ctx.strokeStyle = "lightgrey";
        var fillStyle = "lightgrey";
        ctx.lineWidth = 1;
      }
      ctx.beginPath();
      ctx.moveTo(circles[p1].x, circles[p1].y);
      ctx.lineTo(circles[p2].x, circles[p2].y);
      ctx.stroke();
      drawEdgeWeights(circles[p1], circles[p2], weight, fillStyle);
    }
    if (algorithmState === 2) {
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[edgesQueue[0].elem[0]].x,
        circles[edgesQueue[0].elem[0]].y
      );
      ctx.lineTo(
        circles[edgesQueue[0].elem[1]].x,
        circles[edgesQueue[0].elem[1]].y
      );
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQueue[0].elem[0]],
        circles[edgesQueue[0].elem[1]],
        edgesQueue[0].prio,
        "blue"
      );
    }

    if (algorithmState === 3) {
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[edgesQueue[0].elem[0]].x,
        circles[edgesQueue[0].elem[0]].y
      );
      ctx.lineTo(
        circles[edgesQueue[0].elem[1]].x,
        circles[edgesQueue[0].elem[1]].y
      );
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQueue[0].elem[0]],
        circles[edgesQueue[0].elem[1]],
        edgesQueue[0].prio,
        "blue"
      );
    }

    if (algorithmState === 4) {
      ctx.beginPath();
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[edgesQueue[0].elem[0]].x,
        circles[edgesQueue[0].elem[0]].y
      );
      ctx.lineTo(
        circles[edgesQueue[0].elem[1]].x,
        circles[edgesQueue[0].elem[1]].y
      );
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQueue[0].elem[0]],
        circles[edgesQueue[0].elem[1]],
        edgesQueue[0].prio,
        "orange"
      );
    }
    if (algorithmState === 5) {
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[edgesQueue[0].elem[0]].x,
        circles[edgesQueue[0].elem[0]].y
      );
      ctx.lineTo(
        circles[edgesQueue[0].elem[1]].x,
        circles[edgesQueue[0].elem[1]].y
      );
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQueue[0].elem[0]],
        circles[edgesQueue[0].elem[1]],
        edgesQueue[0].prio,
        "blue"
      );
    }
    if (algorithmState === 6) {
      ctx.beginPath();
      ctx.strokeStyle = "lightgrey";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[edgesQueue[0].elem[0]].x,
        circles[edgesQueue[0].elem[0]].y
      );
      ctx.lineTo(
        circles[edgesQueue[0].elem[1]].x,
        circles[edgesQueue[0].elem[1]].y
      );
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQueue[0].elem[0]],
        circles[edgesQueue[0].elem[1]],
        edgesQueue[0].prio,
        "lightgrey"
      );
    }
  }

  function expandHandler() {
    setExpanded(!Expanded);
    graphStep(MSTGraph);
  }

  function timeoutHandler(value) {
    console.log(value);
    setInverseSpeed(value);
  }

  function firstHandler() {
    if (!Paused) return;
    setAlgorithmStep(0);
    setAlgorithmState(0);
    edgesQRemoved = [];
    edgesQ = JSON.parse(JSON.stringify(props.MSTGraph[2]));
    setEdgesQueue(edgesQ);
    setEdgesQueueRemoved(edgesQRemoved);
  }

  function backHandler() {
    if (algorithmState <= 0 || !Paused) return;
    if (algorithmState === 7) {
      setAlgorithmState(1);
    } else if (algorithmState === 1 && algorithmStep > 0) {
      console.log(edgesQRemoved);
      let unshiftEdge = edgesQRemoved.pop();
      console.log("UNSHIFT EDGE");
      console.log(unshiftEdge);
      edgesQ.unshift(unshiftEdge);
      setEdgesQueue(edgesQ);
      setEdgesQueueRemoved(edgesQRemoved);
      setAlgorithmStep(algorithmStep - 1);
      if (edgeInMST(unshiftEdge)) {
        setAlgorithmState(4);
      } else {
        setAlgorithmState(6);
      }
    } else if (algorithmState === 5) {
      setAlgorithmState(3);
    } else {
      setAlgorithmState(algorithmState - 1);
    }
    // setAlgorithmState(algorithmState - 1);
  }
  function forwardStep() {
    if (algorithmState === 7) {
      console.log("0");
      return;
    }
    if (algorithmState === 1 && !edgesQ.length) {
      console.log("1");
      console.log(MSTGraph);
      setAlgorithmState(7);
      setPaused(true);
    } else if (algorithmState === 3 && !edgeInMST(edgesQ[0])) {
      console.log("2");
      setAlgorithmState(5);
    } else if (algorithmState === 4 || algorithmState === 6) {
      console.log("3");
      setAlgorithmStep(algorithmStep + 1);
      setAlgorithmState(1);
      edgesQRemoved.push(edgesQ[0]);
      edgesQ.shift();
      setEdgesQueue(edgesQ);
      setEdgesQueueRemoved(edgesQRemoved);
    } else {
      console.log("4");
      setAlgorithmState(algorithmState + 1);
    }
  }

  function forwardHandler() {
    if (!Paused) return;
    forwardStep();
  }

  function lastHandler() {
    if (!Paused) return;
    setAlgorithmStep(MSTGraph[2].length);
    setAlgorithmState(7);
    edgesQRemoved = edgesQ;
    edgesQ = [];
    setEdgesQueue(edgesQ);
    setEdgesQueueRemoved(edgesQRemoved);
  }

  function toggleBackgoundGraphHandler(toggle) {
    setBackgroundOn(toggle);
  }

  function playPauseHandler() {
    setPaused(!Paused);
  }

  async function sleep() {
    return new Promise((r) => setTimeout(r, 2100 - inverseSpeed));
  }

  async function play() {
    // console.log(inverseSpeed);
    await sleep();
    forwardStep();
  }

  useEffect(() => {
    prepareCanvas();
    drawCircles();
    drawGraph(graph.AdjList);
    // setEdgesQueue(JSON.parse(JSON.stringify(MSTGraph[2])));
  }, []);

  useEffect(() => {
    if (notInitialRender.current) {
      graphStep(MSTGraph);
      if (!Paused) play();
    } else notInitialRender.current = true;
  }, [algorithmState, backgroundOn, Paused]);

  return (
    <React.Fragment>
      <Link to="/" className="btn btn-primary">
        Exit
      </Link>
      {algorithmStateMessage}
      <animated.div className={classes.canvasDiv} style={expandCanvas}>
        <canvas className={classes.canvasStyle} ref={canvasRef2} />
        <canvas className={classes.canvasStyle} ref={canvasRef} />
      </animated.div>
      <div className={classes.infoPanelTab}>{expandArrow}</div>
      <animated.div className={classes.infoPanel} style={expandInfo}>
        <h1>Pseudocode</h1>
        <PseudoCode algName={props.algName} algorithmState={algorithmState} />
        <div className={classes.edgesQueue}>
          <h1>Edges Queue</h1>
        </div>
        <div className={classes.edgesQueueList}>
          <ol>{edgesQueuePrint}</ol>
        </div>
      </animated.div>
      <PlayBack
        symbolToolTip={playPauseToolTip}
        symbol={playPause}
        onTimeoutChange={timeoutHandler}
        onFirst={firstHandler}
        onBack={backHandler}
        onForward={forwardHandler}
        onLast={lastHandler}
        onToggleBackgroundGraph={toggleBackgoundGraphHandler}
      />
    </React.Fragment>
  );
}

export default KruskalVisualisationPage;
