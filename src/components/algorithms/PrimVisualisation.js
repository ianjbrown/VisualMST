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

function PrimVisualisationPage(props) {
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
    left: Expanded ? "10px" : "305px",
    right: Expanded ? "500px" : "245px",
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
      <PlayArrowIcon sx={{ fontSize: 60 }} onClick={playPauseHandler} />
    );
    playPauseToolTip = "Play Visualisation";
  } else {
    playPause = (
      <PauseOutlinedIcon sx={{ fontSize: 60 }} onClick={playPauseHandler} />
    );
    playPauseToolTip = "Pause Visualisation";
  }

  let algName = "Prim's Algorithm";
  let circles = [];
  let graph = props.graph;
  let MSTGraph = props.MSTGraph;
  console.log(MSTGraph);
  console.log(MSTGraph[5].length);
  console.log(algorithmStep);
  let minWeight = MSTGraph[4];
  let edgesQStages = edgesQueueStages;
  let edgesQ = Object.assign([], edgesQStages[algorithmStep]);
  let edgesQueuePrint;
  if (typeof edgesQ != "undefined") {
    edgesQueuePrint = edgesQ.map((edge) => (
      <li>
        (({edge.elem[0]},{edge.elem[1]}), {edge.prio})
      </li>
    ));
  }

  let edge;
  if (typeof edgesQ[0] == "undefined") {
    edge = [0, 0, 0];
  } else {
    edge = [edgesQ[0].elem[0], edgesQ[0].elem[1], edgesQ[0].prio];
  }

  const AlgorithmStates = [
    `Initialize visited set with starting vertex = {${MSTGraph[3][0]}}`,
    `Add connecting edges to queue.`,
    "While visited doesn't contain all vertices",
    `Select edge with smallest weight, ((${edge[0]},${edge[1]}),${edge[2]})`,
    `If corresponding vertex ${edge[1]} is not visited:`,
    `Add ${edge[1]} to visited and add adjacent edges to queue.`,
    "Else",
    "Ignore edge",
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

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

    ctx.fillStyle = "#fff";
  }

  function drawCircles() {
    circles = [];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (var i = 0; i < graph.noOfVertices; i++) {
      let colour;
      if (MSTGraph[3][algorithmStep].includes(i)) colour = "orange";
      else colour = "black";
      var circle = new Circle(
        400 + 300 * Math.cos((i * 2 * Math.PI) / graph.noOfVertices),
        235 + 200 * Math.sin((i * 2 * Math.PI) / graph.noOfVertices),
        i,
        colour
      );
      circle.draw(ctx);
      circles.push(circle);
    }
    return circles;
  }

  function drawLegend() {
    const canvas = canvasRef2.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillText("Visited:", 600, 50);
    ctx.fillText("Unvisited:", 600, 65);
    ctx.fillRect(657, 56, 10, 10);
    ctx.fillStyle = "orange";
    ctx.fillRect(645, 41, 10, 10);
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
        ctx.strokeStyle = "lightgrey";
        ctx.lineWidth = 1;
        ctx.moveTo(currentCircle.x, currentCircle.y);
        ctx.lineTo(adjacentCircle.x, adjacentCircle.y);
        ctx.stroke();
        drawEdgeWeights(currentCircle, adjacentCircle, j.weight, "lightgrey");
      }
    }
    drawLegend();
  }

  function graphStep(MSTGraph) {
    const canvas = canvasRef2.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawCircles();
    if (backgroundOn) drawGraph(graph.AdjList);
    drawLegend();
    var steps = MSTGraph[5];
    for (var i = 0; i < algorithmStep; i++) {
      var step = steps[i];
      console.log(step);
      var p1 = step.elem[0];
      var p2 = step.elem[1];
      var weight = step.prio;

      var fillStyle = edgeInMST(step) ? "orange" : "lightgrey";
      ctx.strokeStyle = edgeInMST(step) ? "orange" : "lightgrey";
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.moveTo(circles[p1].x, circles[p1].y);
      ctx.lineTo(circles[p2].x, circles[p2].y);
      ctx.stroke();
      drawEdgeWeights(circles[p1], circles[p2], weight, fillStyle);
    }
    if (algorithmState === 1) {
      for (i = 0; i < edgesQ.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(circles[edgesQ[i].elem[0]].x, circles[edgesQ[i].elem[0]].y);
        ctx.lineTo(circles[edgesQ[i].elem[1]].x, circles[edgesQ[i].elem[1]].y);
        ctx.stroke();
        drawEdgeWeights(
          circles[edgesQ[i].elem[0]],
          circles[edgesQ[i].elem[1]],
          edgesQ[i].prio,
          "black"
        );
      }
    }
    if (algorithmState === 2) {
      for (i = 0; i < edgesQ.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(circles[edgesQ[i].elem[0]].x, circles[edgesQ[i].elem[0]].y);
        ctx.lineTo(circles[edgesQ[i].elem[1]].x, circles[edgesQ[i].elem[1]].y);
        ctx.stroke();
        drawEdgeWeights(
          circles[edgesQ[i].elem[0]],
          circles[edgesQ[i].elem[1]],
          edgesQ[i].prio,
          "black"
        );
      }
    }

    if (algorithmState === 3) {
      for (i = 1; i < edgesQ.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(circles[edgesQ[i].elem[0]].x, circles[edgesQ[i].elem[0]].y);
        ctx.lineTo(circles[edgesQ[i].elem[1]].x, circles[edgesQ[i].elem[1]].y);
        ctx.stroke();

        drawEdgeWeights(
          circles[edgesQ[i].elem[0]],
          circles[edgesQ[i].elem[1]],
          edgesQ[i].prio,
          "black"
        );
      }
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
      for (i = 1; i < edgesQ.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(circles[edgesQ[i].elem[0]].x, circles[edgesQ[i].elem[0]].y);
        ctx.lineTo(circles[edgesQ[i].elem[1]].x, circles[edgesQ[i].elem[1]].y);
        ctx.stroke();

        drawEdgeWeights(
          circles[edgesQ[i].elem[0]],
          circles[edgesQ[i].elem[1]],
          edgesQ[i].prio,
          "black"
        );
      }
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
    if (algorithmState === 5) {
      for (i = 1; i < edgesQ.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(circles[edgesQ[i].elem[0]].x, circles[edgesQ[i].elem[0]].y);
        ctx.lineTo(circles[edgesQ[i].elem[1]].x, circles[edgesQ[i].elem[1]].y);
        ctx.stroke();

        drawEdgeWeights(
          circles[edgesQ[i].elem[0]],
          circles[edgesQ[i].elem[1]],
          edgesQ[i].prio,
          "black"
        );
      }
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
      circles[edgesQ[0].elem[1]].setColour("orange");
      circles[edgesQ[0].elem[1]].draw(ctx);
    }
    if (algorithmState === 6) {
      for (i = 0; i < edgesQ.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(circles[edgesQ[i].elem[0]].x, circles[edgesQ[i].elem[0]].y);
        ctx.lineTo(circles[edgesQ[i].elem[1]].x, circles[edgesQ[i].elem[1]].y);
        ctx.stroke();

        drawEdgeWeights(
          circles[edgesQ[i].elem[0]],
          circles[edgesQ[i].elem[1]],
          edgesQ[i].prio,
          "black"
        );
      }
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
    if (algorithmState === 7) {
      for (i = 1; i < edgesQ.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(circles[edgesQ[i].elem[0]].x, circles[edgesQ[i].elem[0]].y);
        ctx.lineTo(circles[edgesQ[i].elem[1]].x, circles[edgesQ[i].elem[1]].y);
        ctx.stroke();

        drawEdgeWeights(
          circles[edgesQ[i].elem[0]],
          circles[edgesQ[i].elem[1]],
          edgesQ[i].prio,
          "black"
        );
      }
      // ctx.beginPath();
      // ctx.strokeStyle = "lightgrey";
      // ctx.lineWidth = 1;
      // ctx.moveTo(circles[edgesQ[0].elem[0]].x, circles[edgesQ[0].elem[0]].y);
      // ctx.lineTo(circles[edgesQ[0].elem[1]].x, circles[edgesQ[0].elem[1]].y);
      // ctx.stroke();
      // drawEdgeWeights(circles[edgesQ[0].elem[0]], circles[edgesQ[0].elem[1]], edgesQ[0].prio, "lightgrey")
    }
  }
  function expandHandler() {
    setExpanded(!Expanded);
    graphStep(MSTGraph);
  }

  function timeoutHandler(value) {
    // console.log(value);
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
    if (algorithmState === 8) {
      setAlgorithmState(2);
    } else if (algorithmState === 2 && algorithmStep > 0) {
      let recoverEdge = MSTGraph[5][algorithmStep - 1];
      edgesQ = edgesQStages[algorithmStep - 1];
      setAlgorithmStep(algorithmStep - 1);
      if (edgeInMST(recoverEdge)) {
        setAlgorithmState(5);
      } else {
        setAlgorithmState(7);
      }
    } else if (algorithmState === 6) {
      setAlgorithmState(4);
    } else {
      setAlgorithmState(algorithmState - 1);
    }
  }
  function forwardStep() {
    if (algorithmState === 8) {
      // console.log("0");
      return;
    }
    // console.log(algorithmStep);
    // console.log(MSTGraph[3][algorithmStep].length);
    // console.log(graph.noOfVertices);
    if (
      algorithmState === 2 &&
      MSTGraph[3][algorithmStep].length === parseInt(graph.noOfVertices)
    ) {
      setAlgorithmState(8);
      setPaused(true);
    } else if (algorithmState === 4 && !edgeInMST(edgesQ[0])) {
      // console.log("2");
      setAlgorithmState(6);
    } else if (algorithmState === 4 && edgeInMST(edgesQ[0])) {
      // console.log("HIIIIII");
      setAlgorithmState(algorithmState + 1);
    } else if (algorithmState === 5 || algorithmState === 7) {
      // console.log("3");
      setAlgorithmStep(algorithmStep + 1);
      setAlgorithmState(2);
    } else {
      // console.log("4");
      setAlgorithmState(algorithmState + 1);
    }
  }

  function forwardHandler() {
    if (!Paused) return;
    forwardStep();
  }

  function lastHandler() {
    if (!Paused) return;
    setAlgorithmStep(MSTGraph[5].length);
    setAlgorithmState(8);
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
    // // console.log(inverseSpeed);
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

export default PrimVisualisationPage;
