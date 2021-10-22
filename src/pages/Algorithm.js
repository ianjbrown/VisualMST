import { useState } from "react";
import { useParams, useRouteMatch, Switch, Route, useHistory, Redirect } from "react-router-dom";
import Graph from "../components/algorithms/Graph";
import NewGraphForm from "../components/algorithms/NewGraphForm";
import VisualisationPage from "./Visualisation";

function AlgorithmPage(props) {
  const [generatedGraph, setGeneratedGraph] = useState();
  const match = useRouteMatch();
  const history = useHistory();
  let found;
  let { algorithmId } = useParams();
  for (var i of props.algorithms) {
    if (i.id === algorithmId) {
      found = true;
    }
  }
  if (!found) {
    alert("An error has occurred, redirecting to homepage.");
    return <Redirect to='/'/>
  } 
  
  let algName;

  function generateGraphHandler(enteredVertexNo) {
    var g = new Graph(enteredVertexNo);
    g.generateGraph();
    setGeneratedGraph(g);
    if (algorithmId === 'kruskal') history.replace('/algorithms/kruskal/visualisation');
    if (algorithmId === 'prim') history.replace('/algorithms/prim/visualisation');
  }

  if (algorithmId === "kruskal") {
    algName = "Kruskal's Algorithm";
  } else if (algorithmId === "prim") {
    algName = "Prim's Algorithm";
  }

  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}/visualisation`}>
          <h1>{algName}</h1>
          <VisualisationPage graph={generatedGraph} />
        </Route>
        <Route exact path={match.path}>
          <h1>{algName}</h1>
          <NewGraphForm onGenGraph={generateGraphHandler} />
        </Route>
      </Switch>
    </div>
  );
}

export default AlgorithmPage;

