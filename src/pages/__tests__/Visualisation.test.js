import VisualisationPage from "../Visualisation";
import Graph from "../../datastructures/Graph";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Kruskal Visualisation page matches snapshot", () => {
  const g = new Graph(5);
  g.generateGraph(["0,1", "0,4", "1,2", "0,2", "2,3", "2,4", "3,4"]);
  const tree = renderer
    .create(
      <Router>
        <VisualisationPage alg="kruskal" graph={g} MSTGraph={g.kruskal()} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

//   test("Prim Visualisation page matches snapshot", () => {
//     const g = new Graph(5);
//     g.generateGraph(["0,1","0,4","1,2","0,2","2,3","2,4","3,4"]);
//     const tree = renderer
//       .create(
//         <Router>
//           <VisualisationPage alg="prim" graph={g} MSTGraph={g.prim("0")} />
//         </Router>
//       )
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });

// test("Prim's Visualisation loads", () => {
//   const g = new Graph(5);
//   g.generateGraph(["0,1", "0,4", "1,2", "0,2", "2,3", "2,4", "3,4"]);
//   render(
//     <Router>
//       <VisualisationPage alg="prim" graph={g} MSTGraph={g.prim("0")} />
//     </Router>
//   );

// });
