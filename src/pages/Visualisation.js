import { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Circle from "../datastructures/Circle";
import Card from "../components/ui/Card";
import PlayPause from "../components/ui/PlayBack";

function VisualisationPage(props) {
  const [algorithmState, setAlgorithmState] = useState(0);
  const [backgroundOn, setBackgroundOn] = useState(true);
  const [Paused, setPaused] = useState(true);
  const notInitialRender = useRef(false);

  let circles = [];
  let graph = props.graph;
  let MSTGraph = props.MSTGraph;
  let startingVertex = props.startingVertex;
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  let canvasStyle = {
    border: "1px solid black",
    width: "800px",
    height: "750px",
  };

  function prepareCanvas() {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctxRef.current = ctx;
    ctx.font = "30px Arial";
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  function drawCircles() {
    circles = [];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (var i = 0; i < graph.noOfVertices; i++) {
      if (i === parseInt(startingVertex)) var colour = "orange";
      else var colour = "black";
      var circle = new Circle(
        240 + 200 * Math.cos((i * 2 * Math.PI) / graph.noOfVertices),
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
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawCircles();
    if (backgroundOn) drawGraph(graph.AdjList);

    var steps = MSTGraph[1];
    for (var i = 0; i < algorithmState; i++) {
      // console.log(steps);
      var step = steps[i];
      var p1 = step[0];
      var p2 = step[1];
      var weight = step[2];

      ctx.font = "bold 12.5px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        weight,
        (circles[p1].x + circles[p2].x + 5) / 2,
        (circles[p1].y + circles[p2].y + 5) / 2
      );
      ctx.clearRect(0, 0, 125, 100);
      ctx.fillStyle = "#eee";
      ctx.fillRect(0, 0, 125, 100)
      ctx.fillStyle = "blue";
      ctx.fillText("Step " + (i + 1), 15, 30);
      ctx.fillText("Add shortest edge...", 15, 50);
      ctx.fillText("between " + p1 + " and " + p2, 15, 70);
      if (i === graph.noOfVertices - 2) {
        ctx.fillText("MST found", 15, 90);
      }

      ctx.beginPath();
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 1;
      ctx.moveTo(circles[p1].x, circles[p1].y);
      ctx.lineTo(circles[p2].x, circles[p2].y);
      ctx.stroke();
    }
  }

  function backHandler() {
    if (algorithmState <= 0 || !Paused) return;
    setAlgorithmState(algorithmState - 1);
  }

  function forwardHandler() {
    if (algorithmState >= MSTGraph[0].noOfVertices - 1 || !Paused) return;
    setAlgorithmState(algorithmState + 1);
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
  }, []);

  useEffect(() => {
    if (notInitialRender.current) {
      graphStep(MSTGraph);
      if (!Paused) play();
    } else notInitialRender.current = true;
  }, [algorithmState, backgroundOn]);

  return (
    <div>
      <div>
        <canvas style={canvasStyle} ref={canvasRef} />
        <div>
          <PlayPause
            onBack={backHandler}
            onForward={forwardHandler}
            onToggleBackgroundGraph={toggleBackgoundGraphHandler}
            onPlayPause={playPauseHandler}
          />
        </div>
      </div>
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
