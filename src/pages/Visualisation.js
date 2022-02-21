import KruskalVisualisationPage from "../components/algorithms/KruskalVisualisation";
import PrimVisualisationPage from "../components/algorithms/PrimVisualisation";

function VisualisationPage(props) {
  let graph = props.graph;
  let MSTGraph = props.MSTGraph;
  if (props.alg === "kruskal") {
    return (
      <KruskalVisualisationPage
        graph={graph}
        MSTGraph={MSTGraph}
        algName={props.algName}
      />
    );
  } else if (props.alg === "prim") {
    return (
      <PrimVisualisationPage
        graph={graph}
        MSTGraph={MSTGraph}
        algName={props.algName}
        startingVertex={props.startingVertex}
      />
    );
  }
}

export default VisualisationPage;
