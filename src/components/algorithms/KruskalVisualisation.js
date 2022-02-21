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
import { Row } from "react-bootstrap";

function KruskalVisualisationPage(props) {
  const [algorithmState, setAlgorithmState] = useState(0);
  const [algorithmStep, setAlgorithmStep] = useState(0);
  const [backgroundOn, setBackgroundOn] = useState(true);
  const [Paused, setPaused] = useState(true);
  const [Expanded, setExpanded] = useState(true);
  const [inverseSpeed, setInverseSpeed] = useState(1000);

  const edgesQueueStages = JSON.parse(JSON.stringify(props.MSTGraph[2]));

  const expandInfo = useSpring({
    opacity: Expanded ? 1 : 0,
    marginLeft: Expanded ? 0 : 470,
  });
  const expandCanvas = useSpring({
    // to: async (next, cancel) => {
    //   await next({opacity: 1})
    //   await next({opacity: 0})
    // }
    left: Expanded ? "10px" : window.innerWidth / 8 + "px",
    right: Expanded ? "500px" : "500px" + window.innerWidth / 8 + "px",
    // scale: Expanded ? (1, 1) : (1, 1),
  });
  // const fadeMessage = useSpring({
  //   opacity: 0,
  // });

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
    playPauseToolTip = "Play Visualisation";
  } else {
    playPause = (
      <PauseOutlinedIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={playPauseHandler}
      />
    );
    playPauseToolTip = "Pause Visualisation";
  }
  
  let algName = "Kruskal's Algorithm";
  let circles = [];
  let graph = props.graph;
  let noOfVertices = graph.noOfVertices;
  let MSTGraph = props.MSTGraph;
  let minWeight = MSTGraph[3];
  let edgesQStages = edgesQueueStages;
  let edgesQ = Object.assign([], edgesQStages[algorithmStep]);
  let edgesQueuePrint;
  if (typeof edgesQ != "undefined") {
    edgesQueuePrint = edgesQ.map((edge) => (
      <li>
        (({edge.elem[0]},{edge.elem[1]}). {edge.prio})
      </li>
    ));
  }
  // const disjointSetsPrint = ufs.map((uf) => <li>{uf}</li>);

  let edge;
  if (typeof edgesQ[0] == "undefined") {
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

  function foundTree() {
    let count = 0;
    MSTGraph[4].slice(0, algorithmStep).forEach((edge) => {
      if (edgeInMST(edge)) {
        count++;
      }
    });
    if (count === noOfVertices - 1) {
      return true;
    }
    return false;
  }

  function prepareCanvas() {
    const canvas = canvasRef.current;
    const canvas2 = canvasRef2.current;
    canvas.width = 1920;
    canvas.height = 969;
    canvas2.width = 1920;
    canvas2.height = 969;

    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    ctx.scale(2.2, 2.1);
    ctx2.scale(2.2, 2.1);

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
    for (var i = 0; i < noOfVertices; i++) {
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

    var steps = MSTGraph[4];
    for (var i = 0; i < algorithmStep; i++) {
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
        fillStyle = "lightgrey";
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
      ctx.moveTo(circles[edgesQ[0].elem[0]].x, circles[edgesQ[0].elem[0]].y);
      ctx.lineTo(circles[edgesQ[0].elem[1]].x, circles[edgesQ[0].elem[1]].y);
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQ[0].elem[0]],
        circles[edgesQ[0].elem[1]],
        edgesQ[0].prio,
        "blue"
      );
    }

    if (algorithmState === 3) {
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.moveTo(circles[edgesQ[0].elem[0]].x, circles[edgesQ[0].elem[0]].y);
      ctx.lineTo(circles[edgesQ[0].elem[1]].x, circles[edgesQ[0].elem[1]].y);
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQ[0].elem[0]],
        circles[edgesQ[0].elem[1]],
        edgesQ[0].prio,
        "blue"
      );
    }

    if (algorithmState === 4) {
      ctx.beginPath();
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 1;
      ctx.moveTo(circles[edgesQ[0].elem[0]].x, circles[edgesQ[0].elem[0]].y);
      ctx.lineTo(circles[edgesQ[0].elem[1]].x, circles[edgesQ[0].elem[1]].y);
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQ[0].elem[0]],
        circles[edgesQ[0].elem[1]],
        edgesQ[0].prio,
        "orange"
      );
    }
    if (algorithmState === 5) {
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.moveTo(circles[edgesQ[0].elem[0]].x, circles[edgesQ[0].elem[0]].y);
      ctx.lineTo(circles[edgesQ[0].elem[1]].x, circles[edgesQ[0].elem[1]].y);
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQ[0].elem[0]],
        circles[edgesQ[0].elem[1]],
        edgesQ[0].prio,
        "blue"
      );
    }
    if (algorithmState === 6) {
      ctx.beginPath();
      ctx.strokeStyle = "lightgrey";
      ctx.lineWidth = 1;
      ctx.moveTo(circles[edgesQ[0].elem[0]].x, circles[edgesQ[0].elem[0]].y);
      ctx.lineTo(circles[edgesQ[0].elem[1]].x, circles[edgesQ[0].elem[1]].y);
      ctx.stroke();
      drawEdgeWeights(
        circles[edgesQ[0].elem[0]],
        circles[edgesQ[0].elem[1]],
        edgesQ[0].prio,
        "lightgrey"
      );
    }
  }

  function expandHandler() {
    setExpanded(!Expanded);
    graphStep(MSTGraph);
  }

  function timeoutHandler(value) {
    setInverseSpeed(value);
  }

  function firstHandler() {
    if (!Paused) return;
    setAlgorithmStep(0);
    setAlgorithmState(0);
    edgesQ = JSON.parse(JSON.stringify(props.MSTGraph[2][0]));
  }

  function backHandler() {
    if (algorithmState <= 0 || !Paused) return;
    if (algorithmState === 7) {
      setAlgorithmState(1);
    } else if (algorithmState === 1 && algorithmStep > 0) {
      let recoverEdge = MSTGraph[4][algorithmStep - 1];
      edgesQ = edgesQStages[algorithmStep - 1];
      setAlgorithmStep(algorithmStep - 1);
      if (edgeInMST(recoverEdge)) {
        setAlgorithmState(4);
      } else {
        setAlgorithmState(6);
      }
    } else if (algorithmState === 5) {
      setAlgorithmState(3);
    } else {
      setAlgorithmState(algorithmState - 1);
    }
  }
  function forwardStep() {
    if (algorithmState === 7) {
      return;
    }
    if (algorithmState === 1 && (!edgesQ.length || foundTree())) {
      setAlgorithmState(7);
      setPaused(true);
    } else if (algorithmState === 3 && !edgeInMST(edgesQ[0])) {
      setAlgorithmState(5);
    } else if (algorithmState === 4 || algorithmState === 6) {
      setAlgorithmStep(algorithmStep + 1);
      setAlgorithmState(1);
    } else {
      setAlgorithmState(algorithmState + 1);
    }
  }

  function forwardHandler() {
    if (!Paused) return;
    forwardStep();
  }

  function lastHandler() {
    if (!Paused) return;
    setAlgorithmStep(MSTGraph[4].length);
    setAlgorithmState(7);
    edgesQ = edgesQStages[edgesQStages.length - 1];
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
    await sleep();
    forwardStep();
  }

  useEffect(() => {
    prepareCanvas();
    drawCircles();
    drawGraph(graph.AdjList);
  }, []);

  useEffect(() => {
    if (notInitialRender.current) {
      graphStep(MSTGraph);
      if (!Paused) play();
    } else notInitialRender.current = true;
  }, [algorithmState, backgroundOn, Paused]);

  return (
    <React.Fragment>
      <h2 className="pt-1">{algName}</h2>
      <div className={classes.closeButton}>
        <Link to="/" className="btn btn-close" />
      </div>
      <Row>{algorithmStateMessage}</Row>

      <animated.div className={classes.canvasDiv} style={expandCanvas}>
        <canvas className={classes.canvasStyle} ref={canvasRef2} />
        <canvas className={classes.canvasStyle} ref={canvasRef} />
      </animated.div>

      <div className={classes.infoPanelTab}>{expandArrow}</div>
      <animated.div className={classes.infoPanel} style={expandInfo}>
        <h1>Pseudocode</h1>
        <PseudoCode algName={algName} algorithmState={algorithmState} />
        <h1>Edges Queue</h1>
        <div className={classes.edgesQueueList}>
          <ol>{edgesQueuePrint}</ol>
        </div>
      </animated.div>

      <Row className={classes.fixedRowBottom}>
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
      </Row>
    </React.Fragment>
  );
}

export default KruskalVisualisationPage;
