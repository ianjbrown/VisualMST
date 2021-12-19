import { Switch, Route, useRouteMatch } from "react-router-dom";
import AlgorithmPage from "./Algorithm";
import AlgorithmList from "../components/algorithms/AlgorithmList";
import Graph from "../datastructures/Graph";
import MainNavigation from "../components/layout/MainNavigation";

function AlgorithmsPage() {
  var g = new Graph();
  const match = useRouteMatch();
  const algorithmsData = [
    {
      id: "kruskal",
      title: "Kruskal's algorithm",
      description:
        "Kruskal's algorithm finds a minimum spanning Tree of an connected undirected edge-weighted graph. It first appeared in 1956 and was written by Joesph Kruskal ",
      steps: (
        <ol>
          <li>Sort the edges by their weight in non-decreasing order.</li>
          <li>
            Pick the edge with the smallest weight. Check if it forms a cycle
            with the tree formed thus far. If no cycle is formed, we can include
            this edge. Else, discard it.
          </li>
          <li>
            Repeat the previous step until there are (V-1) edges in the created
            spanning tree.
          </li>
        </ol>
      ),
    },
    {
      id: "prim",
      title: "Prim's algorithm",
      description:
        "Prim's algorithm finds a minimum spanning Tree of an connected undirected edge-weighted graph. It was first developed by Vojtěch Jarník in 1930 and was rediscovered and republished by Robert C. Prim in 1957. ",
      steps: (
        <ol>
          <li>
            Create a set mstSet that keeps track of vertices already included in
            the minimum spanning tree
          </li>
          <li>
            Assign a key value to all vertices in the input graph. Initialize
            all key values as infinite. Assign key value as 0 for the first
            vertex so that it is picked first.
          </li>
          <li>
            While mstSet doesn't include all vertices
            <ol type="A">
              <li>
                Select vertex u which is not in mstSet and has minimum key value
              </li>
              <li>Add u to mstSet</li>
              <li>
                Update key value of all vertices adjacent to u. (iterate through
                all adjacent vertices and for each adjacent vertex v, if weight
                of edge u-v is less than the previous key value of v, update the
                key value as weight of u-v)
              </li>
            </ol>
          </li>
        </ol>
      ),
    },
  ];

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:algorithmId`}>
          <AlgorithmPage algorithms={algorithmsData}/>
        </Route>
        <Route exact path={match.path}>
          <MainNavigation/>
          <AlgorithmList algorithms={algorithmsData} />
        </Route>
      </Switch>
    </div>
  );
}

export default AlgorithmsPage;
