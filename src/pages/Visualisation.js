import { useState, useRef, useEffect, Children } from "react";
import { Redirect } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import Circle from "../datastructures/Circle";
import PlayPause from "../components/ui/PlayBack";
import classes from "./Visualisation.module.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { ListItem } from "@mui/material";

function VisualisationPage(props) {
  const [algorithmState, setAlgorithmState] = useState(0);
  const [algorithmStep, setAlgorithmStep] = useState(0);
  const [edgesQueue, setEdgesQueue] = useState([]);
  const [edgesQueueRemoved, setEdgesQueueRemoved] = useState([]);
  const [backgroundOn, setBackgroundOn] = useState(true);
  const [Paused, setPaused] = useState(true);
  const [Expanded, setExpanded] = useState(true);

  const expandInfo = useSpring({
    opacity: Expanded ? 1 : 0,
    marginLeft: Expanded ? 0 : 1000,
  });
  const expandCanvas = useSpring({
    left: Expanded ? "0px" : "10px",
    right: Expanded ? "500px" : "45px",
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

  let circles = [];
  let graph = props.graph;
  let MSTGraph = props.MSTGraph;
  let startingVertex = props.startingVertex;
  let edgesQ = edgesQueue;
  let edgesQRemoved = edgesQueueRemoved;
  const edgesQueuePrint = edgesQ.map((edge) => (
    <li>
      (({edge.elem[0]},{edge.elem[1]}), {edge.prio})
    </li>
  ));

  const algorithmStates = [
    "Edges are sorted by their weight in non-decreasing order",
    "While there are still edges to be process in the queue, select the edge with the lowest weight",
    `The edge between vertices ${MSTGraph[2][0].elem[0]} and ${MSTGraph[2][0].elem[1]}, with a weight of ${MSTGraph[2][0].prio}`,
    "If adding e to MST doesn't create cycle;",
    "Add e to MST",
    "Else",
    "Reject e from MST",
    "We have found a minimum spanning tree with n-1 edges",
  ];

  let algorithmStateMessage = (
    <animated.div className={classes.algorithmStateMessage}>
      {algorithmStates[algorithmState]}
    </animated.div>
  );

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  function edgeInMST(edge) {
    console.log("Enter edgeInMST function");
    let found;
    MSTGraph[1].forEach((MSTEdge) => {
      console.log(MSTEdge);
      console.log(edge);
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
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(1, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctxRef.current = ctx;
    ctx.font = "30px Arial";
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawCircles() {
    circles = [];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (var i = 0; i < graph.noOfVertices; i++) {
      if (i === parseInt(startingVertex)) var colour = "orange";
      else colour = "black";
      var circle = new Circle(
        420 + 400 * Math.cos((i * 2 * Math.PI) / graph.noOfVertices),
        240 + 200 * Math.sin((i * 2 * Math.PI) / graph.noOfVertices),
        i,
        colour
      );
      circle.draw(ctx);
      circles.push(circle);
    }
    return circles;
  }

  function drawGraph(AdjList) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    var get_keys = AdjList.keys();
    for (var i of get_keys) {
      var currentCircle = circles[i];
      var get_values = AdjList.get(i);
      for (var j of get_values) {
        if (j.node < i) continue;
        var adjacentCircle = circles[j.node];

        ctx.font = "12.5px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(
          j.weight,
          (currentCircle.x + adjacentCircle.x + 5) / 2,
          (currentCircle.y + adjacentCircle.y + 5) / 2
        );

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(currentCircle.x, currentCircle.y);
        ctx.lineTo(adjacentCircle.x, adjacentCircle.y);
        ctx.stroke();
      }
    }
  }

  function graphStep(MSTGraph) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawCircles();
    if (backgroundOn) drawGraph(graph.AdjList);

    var steps = MSTGraph[1];
    for (var i = 0; i < algorithmStep; i++) {
      // console.log(steps);
      var step = steps[i];
      var p1 = step[0];
      var p2 = step[1];
      var weight = step[2];

      ctx.font = "bold 12.5px Arial";
      ctx.fillStyle = "green";
      ctx.fillText(
        weight,
        (circles[p1].x + circles[p2].x + 5) / 2,
        (circles[p1].y + circles[p2].y + 5) / 2
      );
      // ctx.clearRect(0, 0, 125, 100);
      // ctx.fillStyle = "#eee";
      // ctx.fillRect(0, 0, 125, 100);
      // ctx.fillStyle = "blue";
      // ctx.fillText("Step " + (i + 1), 15, 30);
      // ctx.fillText("Add shortest edge...", 15, 50);
      // ctx.fillText("between " + p1 + " and " + p2, 15, 70);
      // if (i === graph.noOfVertices - 2) {
      //   ctx.fillText("MST found", 15, 90);
      // }

      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.moveTo(circles[p1].x, circles[p1].y);
      ctx.lineTo(circles[p2].x, circles[p2].y);
      ctx.stroke();
    }
    if (algorithmState === 2) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[MSTGraph[2][0].elem[0]].x,
        circles[MSTGraph[2][0].elem[0]].y
      );
      ctx.lineTo(
        circles[MSTGraph[2][0].elem[1]].x,
        circles[MSTGraph[2][0].elem[1]].y
      );
      ctx.stroke();
      ctx.font = "bold 12.5px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        MSTGraph[2][0].prio,
        (circles[MSTGraph[2][0].elem[0]].x +
          circles[MSTGraph[2][0].elem[1]].x +
          5) /
          2,
        (circles[MSTGraph[2][0].elem[0]].y +
          circles[MSTGraph[2][0].elem[1]].y +
          5) /
          2
      );
    }

    if (algorithmState === 3) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[MSTGraph[2][0].elem[0]].x,
        circles[MSTGraph[2][0].elem[0]].y
      );
      ctx.lineTo(
        circles[MSTGraph[2][0].elem[1]].x,
        circles[MSTGraph[2][0].elem[1]].y
      );
      ctx.stroke();
      ctx.font = "bold 12.5px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        MSTGraph[2][0].prio,
        (circles[MSTGraph[2][0].elem[0]].x +
          circles[MSTGraph[2][0].elem[1]].x +
          5) /
          2,
        (circles[MSTGraph[2][0].elem[0]].y +
          circles[MSTGraph[2][0].elem[1]].y +
          5) /
          2
      );
    }

    if (algorithmState === 4) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[MSTGraph[2][0].elem[0]].x,
        circles[MSTGraph[2][0].elem[0]].y
      );
      ctx.lineTo(
        circles[MSTGraph[2][0].elem[1]].x,
        circles[MSTGraph[2][0].elem[1]].y
      );
      ctx.stroke();
      ctx.font = "bold 12.5px Arial";
      ctx.fillStyle = "green";
      ctx.fillText(
        MSTGraph[2][0].prio,
        (circles[MSTGraph[2][0].elem[0]].x +
          circles[MSTGraph[2][0].elem[1]].x +
          5) /
          2,
        (circles[MSTGraph[2][0].elem[0]].y +
          circles[MSTGraph[2][0].elem[1]].y +
          5) /
          2
      );
    }
    if (algorithmState === 5) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[MSTGraph[2][0].elem[0]].x,
        circles[MSTGraph[2][0].elem[0]].y
      );
      ctx.lineTo(
        circles[MSTGraph[2][0].elem[1]].x,
        circles[MSTGraph[2][0].elem[1]].y
      );
      ctx.stroke();
      ctx.font = "bold 12.5px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        MSTGraph[2][0].prio,
        (circles[MSTGraph[2][0].elem[0]].x +
          circles[MSTGraph[2][0].elem[1]].x +
          5) /
          2,
        (circles[MSTGraph[2][0].elem[0]].y +
          circles[MSTGraph[2][0].elem[1]].y +
          5) /
          2
      );
    }
    if (algorithmState === 6) {
      ctx.beginPath();
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.moveTo(
        circles[MSTGraph[2][0].elem[0]].x,
        circles[MSTGraph[2][0].elem[0]].y
      );
      ctx.lineTo(
        circles[MSTGraph[2][0].elem[1]].x,
        circles[MSTGraph[2][0].elem[1]].y
      );
      ctx.stroke();
      ctx.font = "bold 12.5px Arial";
      ctx.fillStyle = "grey";
      ctx.fillText(
        MSTGraph[2][0].prio,
        (circles[MSTGraph[2][0].elem[0]].x +
          circles[MSTGraph[2][0].elem[1]].x +
          5) /
          2,
        (circles[MSTGraph[2][0].elem[0]].y +
          circles[MSTGraph[2][0].elem[1]].y +
          5) /
          2
      );
    }

  }

  function expandHandler() {
    setExpanded(!Expanded);
    graphStep(MSTGraph);
  }

  function firstHandler() {
    if (!Paused) return;
    setAlgorithmState(0);
  }

  function backHandler() {
    if (algorithmState <= 0 || !Paused) return;
    if (algorithmState === 7) {
      setAlgorithmState(1);
    } else if (algorithmState === 1 && algorithmStep > 0) {
      let unshiftEdge = edgesQRemoved.pop();
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
    } else {
      setAlgorithmState(algorithmState - 1);
    }
    // setAlgorithmState(algorithmState - 1);
  }

  function forwardHandler() {
    console.log(MSTGraph[2]);
    console.log(MSTGraph[1]);
    if (algorithmStep >= (MSTGraph[2].length + edgesQRemoved.length)|| !Paused) {
      console.log("0")
      return;
    }
    if (algorithmState === 1 && !edgesQ.length) {
      console.log("1");
      setAlgorithmState(7);
    } else if (algorithmState === 3 && !edgeInMST(MSTGraph[2][0])) {
      console.log("2");
      setAlgorithmState(5);

    } else if (algorithmState === 4 || algorithmState === 6) {
      console.log("3");
      setAlgorithmState(1);
      setAlgorithmStep(algorithmStep + 1);
      edgesQueueRemoved.push(MSTGraph[2][0]);
      edgesQueue.shift();
      setEdgesQueue(edgesQ);
      setEdgesQueueRemoved(edgesQRemoved);
    } else {
      console.log("4");
      setAlgorithmState(algorithmState + 1);
    }
  }

  function lastHandler() {
    if (!Paused) return;
    setAlgorithmState(MSTGraph[0].noOfVertices - 1);
  }

  function toggleBackgoundGraphHandler(toggle) {
    setBackgroundOn(toggle);
  }

  function playPauseHandler(toggle) {
    setPaused(toggle);
    play();
  }

  async function sleep() {
    return new Promise((r) => setTimeout(r, 1000));
  }

  async function play() {
    if (algorithmState === graph.noOfVertices - 1) return;
    await sleep();
    setAlgorithmState(algorithmState + 1);
  }

  useEffect(() => {
    prepareCanvas();
    drawCircles();
    drawGraph(graph.AdjList);
    setEdgesQueue(MSTGraph[2]);
  }, []);

  useEffect(() => {
    if (notInitialRender.current) {
      graphStep(MSTGraph);
      if (!Paused) play();
    } else notInitialRender.current = true;
  }, [algorithmState, backgroundOn]);

  return (
    <div>
      {algorithmStateMessage}
      <animated.div className={classes.canvasDiv} style={expandCanvas}>
        <canvas className={classes.canvasStyle} ref={canvasRef} />
      </animated.div>
      <div className={classes.infoPanelTab}>{expandArrow}</div>
      <animated.div className={classes.infoPanel} style={expandInfo}>
        <div>
          <h1>Pseudocode</h1>
          <ul style={{}}>
            <li>Sort edges in non-decreasing order;</li>
            <li>While edges remain in queue</li>
            <li>&emsp; e = edge with smallest weight;&emsp;</li>
            <li>&emsp; If adding e to MST doesn't create cycle&emsp;</li>
            <li>&emsp;&emsp; Add e to MST;&emsp;&emsp;</li>
            <li>&emsp; Else&emsp;</li>
            <li>&emsp;&emsp; Reject e from MST;&emsp;&emsp;</li>
            <li>We have found a minimum spanning tree with n-1 edges</li>
          </ul>
        </div>
        <div className={classes.edgesQueue}>
          <h1>Edges Queue</h1>
        </div>
        <div className={classes.edgesQueueList}>
          <ol>{edgesQueuePrint}</ol>
        </div>
        <div className={classes.disjointSets}>
          <h1>Disjoint Sets</h1>
        </div>
      </animated.div>
      <PlayPause
        onFirst={firstHandler}
        onBack={backHandler}
        onForward={forwardHandler}
        onLast={lastHandler}
        onToggleBackgroundGraph={toggleBackgoundGraphHandler}
        onPlayPause={playPauseHandler}
      />
    </div>
  );
}

export default VisualisationPage;

// below code was at top to redirect
// if (!props.graph) {
//   alert("An error has occurred, redirecting to homepage.");
//   return <Redirect to="/" />;
// }

// the below code was in the first useEffect
// ctx.beginPath();
// ctx.strokeStyle = "orange";
// ctx.lineWidth = 2;
// console.log(currentCircle);
// console.log(adjacentCircle);
// ctx.moveTo(circles[4].x, circles[4].y);
// ctx.lineTo(circles[1].x, circles[1].y);
// ctx.stroke();
// ctx.beginPath();
// ctx.moveTo(500 + 350 * Math.cos(0), 450 + 400 * Math.sin(0));
// for (var i = 1; i <= props.graph.noOfVertices; i++) {
//   ctx.lineTo(
//     500 + 350 * Math.cos((i * 2 * Math.PI) / props.graph.noOfVertices),
//     450 + 350 * Math.sin((i * 2 * Math.PI) / props.graph.noOfVertices)
//   );
// }
// ctx.strokeStyle = "black";
// ctx.lineWidth = 1;
// ctx.stroke();

// ctx.moveTo(75,50);
// ctx.lineTo(350,250);
// ctx.stroke();

// placeholder code that prints text form of graphs
//   <div>
//     <h3>We begin with the following graph:</h3>
//     <Card>
//       <ul>
//         {graph.toString().map((line) => (
//           <li>{line}</li>
//         ))}
//       </ul>
//     </Card>
//     <h3>
//       After applying {props.algName} we end up with the following graph:
//     </h3>
//     <Card>
//       <ul>
//         {MSTGraph.map((line) => (
//           <li>{line}</li>
//         ))}
//       </ul>
//     </Card>

//   </div>
// );
