// import { useState, useRef, useEffect } from "react";
// import { useSpring, animated } from "react-spring";

// import Circle from "../datastructures/Circle";
// import PlayPause from "../components/ui/PlayBack";
// import PseudoCode from "../components/ui/PseudoCode";
import KruskalVisualisationPage from "../components/algorithms/KruskalVisualisation";
import PrimVisualisationPage from "../components/algorithms/PrimVisualisation";
// import classes from "./Visualisation.module.css";
// import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
// import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";

function VisualisationPage(props) {
  let graph = props.graph;
  let MSTGraph = props.MSTGraph;
  //   const [algorithmState, setAlgorithmState] = useState(0);
  //   const [algorithmStep, setAlgorithmStep] = useState(0);
  //   const [edgesQueue, setEdgesQueue] = useState(
  //     JSON.parse(JSON.stringify(props.MSTGraph[2]))
  //   );
  //   const [edgesQueueRemoved, setEdgesQueueRemoved] = useState([]);
  //   const [backgroundOn, setBackgroundOn] = useState(true);
  //   const [Paused, setPaused] = useState(true);
  //   const [Expanded, setExpanded] = useState(true);
  //   const [inverseSpeed, setInverseSpeed] = useState(1000);

  //   const expandInfo = useSpring({
  //     opacity: Expanded ? 1 : 0,
  //     marginLeft: Expanded ? 0 : 1000,
  //   });
  //   const expandCanvas = useSpring({
  //     to: async (next, cancel) => {
  //       await next({opacity: 1})
  //       await next({opacity: 0})
  //     }

  //     right: Expanded ? "500px" : "45px",
  //     scale: Expanded ? (1, 1) : (1, 1),
  //   });
  //   const fadeMessage = useSpring({
  //     opacity: 0,
  //   });

  //   const notInitialRender = useRef(false);

  //   let expandArrow;
  //   if (Expanded) {
  //     expandArrow = (
  //       <ArrowForwardIosOutlinedIcon
  //         onClick={expandHandler}
  //       ></ArrowForwardIosOutlinedIcon>
  //     );
  //   } else {
  //     expandArrow = (
  //       <ArrowBackIosNewOutlinedIcon
  //         onClick={expandHandler}
  //       ></ArrowBackIosNewOutlinedIcon>
  //     );
  //   }

  //   let playPause;
  //   if (Paused) {
  //     playPause = (
  //       <PlayArrowIcon sx={{ fontSize: 60 }} onClick={playPauseHandler} />
  //     );
  //   } else {
  //     playPause = (
  //       <PauseOutlinedIcon sx={{ fontSize: 60 }} onClick={playPauseHandler} />
  //     );
  //   }

  //   let circles = [];

  //   console.log(MSTGraph);
  //   let minWeight = MSTGraph[3];
  //   let ufs = MSTGraph[3];
  //   let startingVertex = props.startingVertex;
  //   let edgesQ = edgesQueue;
  //   let edgesQRemoved = edgesQueueRemoved;
  //   const edgesQueuePrint = edgesQueue.map((edge) => (
  //     <li>
  //       (({edge.elem[0]},{edge.elem[1]}), {edge.prio})
  //     </li>
  //   ));
  //   const disjointSetsPrint = ufs.map((uf) => <li>{uf}</li>);

  //   let edge;
  //   if (typeof edgesQueue[0] == "undefined") {
  //     edge = [0, 0, 0];
  //   } else {
  //     if (props.algName === "Kruskal's Algorithm") {
  //       edge = [edgesQ[0].elem[0], edgesQ[0].elem[1], edgesQ[0].prio];
  //     } else if (props.algName === "Prim's Algorithm") {
  //       edge = [edgesQ[0][0].elem[0], edgesQ[0][0].elem[1], edgesQ[0][0].prio];
  //     }
  //   }

  //   const kAlgorithmStates = [
  //     "Edges are sorted by their weight in non-decreasing order",
  //     "While there are still edges to be process in the queue, select edge with lowest weight",
  //     `The edge between vertices ${edge[0]} and ${edge[1]}, with weight = ${edge[2]}`,
  //     "If adding e to MST doesn't create cycle;",
  //     "Add e to MST",
  //     "Else",
  //     "Reject e from MST",
  //     `Found spanning tree with n-1 (${
  //       MSTGraph[0].AdjList.size - 1
  //     }) edges and minimum weight ${minWeight}`,
  //   ];

  //   const pAlgorithmStates = [
  //     `Initialize visited set with starting vertex = {${MSTGraph[3][0]}}`,
  //     `Add edges connected to ${MSTGraph[3][0]} to queue.`,
  //     "While visited doesn't contain all vertices",
  //     `Select edge with smallest weight, ((${edge[0]},${edge[1]}),${edge[2]})`,
  //     `If corresponding vertex ${edge[1]} is not visited:`,
  //     `Add ${edge[1]} to visited and add adjacent edges to queue.`,
  //     "Else",
  //     "Ignore edge",
  //     `Found spanning tree with n-1 (${
  //       MSTGraph[0].AdjList.size - 1
  //     }) edges and minimum weight ${minWeight}`,
  //   ];

  //   let algorithmStateMessage = (
  //     <animated.div className={classes.algorithmStateMessage}>
  //       {props.algName === "Kruskal's Algorithm"
  //         ? kAlgorithmStates[algorithmState]
  //         : pAlgorithmStates[algorithmState]}
  //     </animated.div>
  //   );

  //   const canvasRef = useRef(null);
  //   const ctxRef = useRef(null);

  //   function edgeInMST(edge) {
  //     let found;
  //     MSTGraph[1].forEach((MSTEdge) => {
  //       if (
  //         edge.elem[0] === MSTEdge[0] &&
  //         edge.elem[1] === MSTEdge[1] &&
  //         edge.prio === MSTEdge[2]
  //       ) {
  //         found = true;
  //       }
  //     });
  //     return found;
  //   }

  //   function prepareCanvas() {
  //     const canvas = canvasRef.current;
  //     canvas.width = window.innerWidth / 2;
  //     canvas.height = window.innerHeight;
  //     canvas.style.width = `${window.innerWidth}px`;
  //     canvas.style.height = `${window.innerHeight}px`;

  //     const ctx = canvas.getContext("2d");
  //     ctx.scale(1, 2);
  //     ctx.lineCap = "round";
  //     ctx.strokeStyle = "black";
  //     ctx.lineWidth = 1;
  //     ctxRef.current = ctx;
  //     ctx.font = "30px Arial";
  //     ctx.fillStyle = "#eee";
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   }

  //   function drawCircles() {
  //     circles = [];
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");
  //     for (var i = 0; i < graph.noOfVertices; i++) {
  //       if (i === parseInt(startingVertex)) var colour = "orange";
  //       else colour = "black";
  //       var circle = new Circle(
  //         460 + 400 * Math.cos((i * 2 * Math.PI) / graph.noOfVertices),
  //         240 + 200 * Math.sin((i * 2 * Math.PI) / graph.noOfVertices),
  //         i,
  //         colour
  //       );
  //       circle.draw(ctx);
  //       circles.push(circle);
  //     }
  //     return circles;
  //   }

  //   function drawGraph(AdjList) {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     var get_keys = AdjList.keys();
  //     for (var i of get_keys) {
  //       var currentCircle = circles[i];
  //       var get_values = AdjList.get(i);
  //       for (var j of get_values) {
  //         if (j.node < i) continue;
  //         var adjacentCircle = circles[j.node];

  //         ctx.font = "12.5px Arial";
  //         ctx.fillStyle = "blue";
  //         ctx.fillText(
  //           j.weight,
  //           (currentCircle.x + adjacentCircle.x + 5) / 2,
  //           (currentCircle.y + adjacentCircle.y + 5) / 2
  //         );

  //         ctx.beginPath();
  //         ctx.strokeStyle = "black";
  //         ctx.lineWidth = 1;
  //         ctx.moveTo(currentCircle.x, currentCircle.y);
  //         ctx.lineTo(adjacentCircle.x, adjacentCircle.y);
  //         ctx.stroke();
  //       }
  //     }
  //   }

  //   function graphStep(MSTGraph) {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.fillStyle = "#eee";
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);
  //     drawCircles();
  //     if (backgroundOn) drawGraph(graph.AdjList);

  //     var steps = MSTGraph[2];
  //     console.log(steps);
  //     console.log(algorithmStep);
  //     for (var i = 0; i < algorithmStep; i++) {
  //       console.log(steps);
  //       var step = steps[i];
  //       var p1 = step.elem[0];
  //       var p2 = step.elem[1];
  //       var weight = step.prio;

  //       ctx.strokeStyle = edgeInMST(step) ? "green" : "grey";
  //       ctx.fillStyle = edgeInMST(step) ? "green" : "grey";
  //       ctx.font = "bold 12.5px Arial";
  //       ctx.fillText(
  //         weight,
  //         (circles[p1].x + circles[p2].x + 5) / 2,
  //         (circles[p1].y + circles[p2].y + 5) / 2
  //       );

  //       ctx.beginPath();
  //       ctx.lineWidth = 1;
  //       ctx.moveTo(circles[p1].x, circles[p1].y);
  //       ctx.lineTo(circles[p2].x, circles[p2].y);
  //       ctx.stroke();
  //     }
  //     if (algorithmState === 2) {
  //       ctx.beginPath();
  //       ctx.strokeStyle = "purple";
  //       ctx.lineWidth = 1;
  //       ctx.moveTo(
  //         circles[edgesQueue[0].elem[0]].x,
  //         circles[edgesQueue[0].elem[0]].y
  //       );
  //       ctx.lineTo(
  //         circles[edgesQueue[0].elem[1]].x,
  //         circles[edgesQueue[0].elem[1]].y
  //       );
  //       ctx.stroke();
  //       ctx.font = "bold 12.5px Arial";
  //       ctx.fillStyle = "purple";
  //       ctx.fillText(
  //         edgesQueue[0].prio,
  //         (circles[edgesQueue[0].elem[0]].x +
  //           circles[edgesQueue[0].elem[1]].x +
  //           5) /
  //           2,
  //         (circles[edgesQueue[0].elem[0]].y +
  //           circles[edgesQueue[0].elem[1]].y +
  //           5) /
  //           2
  //       );
  //     }

  //     if (algorithmState === 3) {
  //       ctx.beginPath();
  //       ctx.strokeStyle = "purple";
  //       ctx.lineWidth = 1;
  //       ctx.moveTo(
  //         circles[edgesQueue[0].elem[0]].x,
  //         circles[edgesQueue[0].elem[0]].y
  //       );
  //       ctx.lineTo(
  //         circles[edgesQueue[0].elem[1]].x,
  //         circles[edgesQueue[0].elem[1]].y
  //       );
  //       ctx.stroke();
  //       ctx.font = "bold 12.5px Arial";
  //       ctx.fillStyle = "purple";
  //       ctx.fillText(
  //         edgesQueue[0].prio,
  //         (circles[edgesQueue[0].elem[0]].x +
  //           circles[edgesQueue[0].elem[1]].x +
  //           5) /
  //           2,
  //         (circles[edgesQueue[0].elem[0]].y +
  //           circles[edgesQueue[0].elem[1]].y +
  //           5) /
  //           2
  //       );
  //     }

  //     if (algorithmState === 4) {
  //       ctx.beginPath();
  //       ctx.strokeStyle = "green";
  //       ctx.lineWidth = 1;
  //       ctx.moveTo(
  //         circles[edgesQueue[0].elem[0]].x,
  //         circles[edgesQueue[0].elem[0]].y
  //       );
  //       ctx.lineTo(
  //         circles[edgesQueue[0].elem[1]].x,
  //         circles[edgesQueue[0].elem[1]].y
  //       );
  //       ctx.stroke();
  //       ctx.font = "bold 12.5px Arial";
  //       ctx.fillStyle = "green";
  //       ctx.fillText(
  //         edgesQueue[0].prio,
  //         (circles[edgesQueue[0].elem[0]].x +
  //           circles[edgesQueue[0].elem[1]].x +
  //           5) /
  //           2,
  //         (circles[edgesQueue[0].elem[0]].y +
  //           circles[edgesQueue[0].elem[1]].y +
  //           5) /
  //           2
  //       );
  //     }
  //     if (algorithmState === 5) {
  //       ctx.beginPath();
  //       ctx.strokeStyle = "purple";
  //       ctx.lineWidth = 1;
  //       ctx.moveTo(
  //         circles[edgesQueue[0].elem[0]].x,
  //         circles[edgesQueue[0].elem[0]].y
  //       );
  //       ctx.lineTo(
  //         circles[edgesQueue[0].elem[1]].x,
  //         circles[edgesQueue[0].elem[1]].y
  //       );
  //       ctx.stroke();
  //       ctx.font = "bold 12.5px Arial";
  //       ctx.fillStyle = "purple";
  //       ctx.fillText(
  //         edgesQueue[0].prio,
  //         (circles[edgesQueue[0].elem[0]].x +
  //           circles[edgesQueue[0].elem[1]].x +
  //           5) /
  //           2,
  //         (circles[edgesQueue[0].elem[0]].y +
  //           circles[edgesQueue[0].elem[1]].y +
  //           5) /
  //           2
  //       );
  //     }
  //     if (algorithmState === 6) {
  //       ctx.beginPath();
  //       ctx.strokeStyle = "grey";
  //       ctx.lineWidth = 1;
  //       ctx.moveTo(
  //         circles[edgesQueue[0].elem[0]].x,
  //         circles[edgesQueue[0].elem[0]].y
  //       );
  //       ctx.lineTo(
  //         circles[edgesQueue[0].elem[1]].x,
  //         circles[edgesQueue[0].elem[1]].y
  //       );
  //       ctx.stroke();
  //       ctx.font = "bold 12.5px Arial";
  //       ctx.fillStyle = "grey";
  //       ctx.fillText(
  //         edgesQueue[0].prio,
  //         (circles[edgesQueue[0].elem[0]].x +
  //           circles[edgesQueue[0].elem[1]].x +
  //           5) /
  //           2,
  //         (circles[edgesQueue[0].elem[0]].y +
  //           circles[edgesQueue[0].elem[1]].y +
  //           5) /
  //           2
  //       );
  //     }
  //   }

  //   function expandHandler() {
  //     setExpanded(!Expanded);
  //     graphStep(MSTGraph);
  //   }

  //   function timeoutHandler(value) {
  //     console.log(value);
  //     setInverseSpeed(value);
  //   }

  //   function firstHandler() {
  //     if (!Paused) return;
  //     setAlgorithmStep(0);
  //     setAlgorithmState(0);
  //     edgesQRemoved = [];
  //     edgesQ = JSON.parse(JSON.stringify(props.MSTGraph[2]));
  //     setEdgesQueue(edgesQ);
  //     setEdgesQueueRemoved(edgesQRemoved);
  //   }

  //   function backHandler() {
  //     if (algorithmState <= 0 || !Paused) return;
  //     if (algorithmState === 7) {
  //       setAlgorithmState(1);
  //     } else if (algorithmState === 1 && algorithmStep > 0) {
  //       console.log(edgesQRemoved);
  //       let unshiftEdge = edgesQRemoved.pop();
  //       console.log("UNSHIFT EDGE");
  //       console.log(unshiftEdge);
  //       edgesQ.unshift(unshiftEdge);
  //       setEdgesQueue(edgesQ);
  //       setEdgesQueueRemoved(edgesQRemoved);
  //       setAlgorithmStep(algorithmStep - 1);
  //       if (edgeInMST(unshiftEdge)) {
  //         setAlgorithmState(4);
  //       } else {
  //         setAlgorithmState(6);
  //       }
  //     } else if (algorithmState === 5) {
  //       setAlgorithmState(3);
  //     } else {
  //       setAlgorithmState(algorithmState - 1);
  //     }
  //     setAlgorithmState(algorithmState - 1);
  //   }
  //   function forwardStep() {
  //     if (algorithmState === 7) {
  //       console.log("0");
  //       return;
  //     }
  //     if (algorithmState === 1 && !edgesQ.length) {
  //       console.log("1");
  //       setAlgorithmState(7);
  //       setPaused(true);
  //     } else if (algorithmState === 3 && !edgeInMST(edgesQ[0])) {
  //       console.log("2");
  //       setAlgorithmState(5);
  //     } else if (algorithmState === 4 || algorithmState === 6) {
  //       console.log("3");
  //       setAlgorithmStep(algorithmStep + 1);
  //       setAlgorithmState(1);
  //       edgesQRemoved.push(edgesQ[0]);
  //       edgesQ.shift();
  //       setEdgesQueue(edgesQ);
  //       setEdgesQueueRemoved(edgesQRemoved);
  //     } else {
  //       console.log("4");
  //       setAlgorithmState(algorithmState + 1);
  //     }
  //   }

  //   function forwardHandler() {
  //     if (!Paused) return;
  //     forwardStep();
  //   }

  //   function lastHandler() {
  //     if (!Paused) return;
  //     setAlgorithmStep(MSTGraph[2].length);
  //     setAlgorithmState(7);
  //     edgesQRemoved = edgesQ;
  //     edgesQ = [];
  //     setEdgesQueue(edgesQ);
  //     setEdgesQueueRemoved(edgesQRemoved);
  //   }

  //   function toggleBackgoundGraphHandler(toggle) {
  //     setBackgroundOn(toggle);
  //   }

  //   function playPauseHandler() {
  //     setPaused(!Paused);
  //   }

  //   async function sleep() {
  //     return new Promise((r) => setTimeout(r, 2100 - inverseSpeed));
  //   }

  //   async function play() {
  //     console.log(inverseSpeed);
  //     await sleep();
  //     forwardStep();
  //   }

  //   useEffect(() => {
  //     prepareCanvas();
  //     drawCircles();
  //     drawGraph(graph.AdjList);
  //     setEdgesQueue(JSON.parse(JSON.stringify(MSTGraph[2])));
  //   }, []);

  //   useEffect(() => {
  //     if (notInitialRender.current) {
  //       graphStep(MSTGraph);
  //       if (!Paused) play();
  //     } else notInitialRender.current = true;
  //   }, [algorithmState, backgroundOn, Paused]);

  //   useEffect(() => {
  //     if (!Paused) play();
  //   }, [Paused])
  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");
  //     Expanded ? ctx.scale(0.95, 1) : ctx.scale(1.0526,1);
  //   }, [Expanded]);

  return (
    <>
      {props.algName === "Kruskal's Algorithm" && (
        <KruskalVisualisationPage
          graph={graph}
          MSTGraph={MSTGraph}
          algName={props.algName}
        />
      )}

      {props.algName === "Prim's Algorithm" && (
        <PrimVisualisationPage
          graph={graph}
          MSTGraph={MSTGraph}
          algName={props.algName}
          startingVertex={props.startingVertex}
        />
      )}
    </>
    // <div>
    //   {algorithmStateMessage}
    //   <animated.div className={classes.canvasDiv} style={expandCanvas}>
    //     <canvas className={classes.canvasStyle} ref={canvasRef} />
    //   </animated.div>
    //   <div className={classes.infoPanelTab}>{expandArrow}</div>
    //   <animated.div className={classes.infoPanel} style={expandInfo}>
    //     <div>
    //       <h1>Pseudocode</h1>
    //       <PseudoCode algName={props.algName} algorithmState={algorithmState} />
    //     </div>
    //     <div className={classes.edgesQueue}>
    //       <h1>Edges Queue</h1>
    //     </div>
    //     <div className={classes.edgesQueueList}>
    //       <ol>{edgesQueuePrint}</ol>
    //     </div>
    //     {/* <div className={classes.disjointSets}>
    //       <h1>Disjoint Sets</h1>
    //     </div> */}
    //     {/* <div className={classes.disjointSetsList}>
    //       <ol>{disjointSetsPrint}</ol>
    //     </div> */}
    //   </animated.div>
    //   <PlayPause
    //     symbol={playPause}
    //     onTimeoutChange={timeoutHandler}
    //     onFirst={firstHandler}
    //     onBack={backHandler}
    //     onForward={forwardHandler}
    //     onLast={lastHandler}
    //     onToggleBackgroundGraph={toggleBackgoundGraphHandler}
    //   />
    // </div>
  );
}

export default VisualisationPage;
