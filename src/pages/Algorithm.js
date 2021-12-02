import { useState } from "react";
import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Graph from "../datastructures/Graph";
import NewGraphForm from "../components/algorithms/NewGraphForm";
import UploadGraphForm from "../components/algorithms/UploadGraphForm";
import VisualisationPage from "./Visualisation";
import StartingVertexForm from "../components/algorithms/StartingVertexForm";

function AlgorithmPage(props) {
  const [noOfVertices, setNoOfVertices] = useState();
  const [startingVertex, setStartingVertex] = useState();
  const [selectedGraph, setSelectedGraph] = useState();
  const [selectedMSTGraph, setSelectedMSTGraph] = useState();

  const match = useRouteMatch();
  const history = useHistory();
  let { algorithmId } = useParams();
  let algName;
  //let found;

  // for (var i of props.algorithms) {
  //   if (i.id === algorithmId) {
  //     found = true;
  //   }
  // }
  // if (!found) {
  //   alert("An error has occurred, redirecting to homepage.");
  //   return <Redirect to="/" />;
  // }

  if (algorithmId === "kruskal-generate" || algorithmId === "kruskal-import") {
    algName = "Kruskal's Algorithm";
  } else if (algorithmId === "prim-generate" || algorithmId === "prim-import") {
    algName = "Prim's Algorithm";
  }

  function selectVertexNoHandler(enteredVertexNo) {
    setNoOfVertices(enteredVertexNo);
    if (algorithmId === "kruskal-generate") {
      var g = new Graph(enteredVertexNo);
      g.generateGraph();
      setSelectedGraph(g);
      setSelectedMSTGraph(g.kruskal());
      history.replace("/algorithms/" + algorithmId + "/visualisation");
    }
  }

  function selectStartingHandler(enteredVertexNo) {
    setStartingVertex(enteredVertexNo);
    if (algorithmId === "prim-generate") {
      var g = new Graph(noOfVertices);
      g.generateGraph();
      setSelectedGraph(g);
      setSelectedMSTGraph(g.prim(enteredVertexNo));
      history.replace("/algorithms/" + algorithmId + "/visualisation");
    }
  }

  function uploadGraphHandler(graphFile) {
    const prom = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        var lines = e.target.result.split(/[\r\n]+/g);
        resolve(lines);
      };
      reader.onerror = reject;
      reader.readAsText(graphFile);
    });

    prom.then((graphLines) => {
      var g = new Graph(noOfVertices);
      g.importGraph(graphLines);
      if (!g.isConnected(0)) {
        alert(
          "Error, imported graph is not connected, please edit input file and add edges accordingly."
        );
        return history.replace("/algorithms/" + algorithmId);
      }

      setSelectedGraph(g);

      if (algName === "Kruskal's Algorithm") {
        setSelectedMSTGraph(g.kruskal());
        history.replace("/algorithms/" + algorithmId + "/visualisation");
      }
      if (algName === "Prim's Algorithm") {
        setSelectedMSTGraph(g.prim(startingVertex));
        history.replace("/algorithms/" + algorithmId + "/visualisation");
      }
    });
  }

  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}/visualisation`}>
          <h1>{algName}</h1>
          <VisualisationPage
            graph={selectedGraph}
            MSTGraph={selectedMSTGraph}
            algName={algName}
            startingVertex={startingVertex}
          />
        </Route>
        <Route path={match.path}>
          <h1>{algName}</h1>
          <NewGraphForm onSubmit={selectVertexNoHandler} />
          {algName === "Prim's Algorithm" && noOfVertices && (
            <StartingVertexForm
              noOfVertices={noOfVertices}
              onSubmit={selectStartingHandler}
            />
          )}

          {(algorithmId === "kruskal-import" ||
            algorithmId === "prim-import") &&
            noOfVertices && (
              <UploadGraphForm onUploadGraph={uploadGraphHandler} />
            )}
        </Route>
      </Switch>
    </div>
  );
}

export default AlgorithmPage;
