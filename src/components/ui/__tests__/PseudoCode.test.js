import { render, screen, cleanup } from "@testing-library/react";
import PseudoCode from "../PseudoCode";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

const kPseudoLines = [
  "Sort edges in non-decreasing order;",
  "While edges remain in queue",
  "e = edge with smallest weight;",
  "If adding e to MST doesn't create cycle",
  "Add e to MST;",
  "Else",
  "Reject e from MST;",
  "We have found a minimum spanning tree with n-1 edges",
];

const pPseudoLines = [
  "Initialise visited set with starting vertex",
  "Add connecting edges to queue.",
  "While visited doesn't contain all vertices",
  "select edge with smallest weight",
  "If corresponding vertex not visited",
  "Add vertex to visited and adjacent edges to queue",
  "Else",
  "Ignore edge",
  "Found minimum spanning tree",
];

test("Kruskal's PseudoCode matches snapshot", () => {
  const tree = renderer
    .create(<PseudoCode algName="Kruskal's Algorithm" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Prim's PseudoCode matches snapshot", () => {
  const tree = renderer
    .create(<PseudoCode algName="Prim's Algorithm" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Kruskal's PseudoCode loads and has correct attributes", () => {
  render(<PseudoCode algName="Kruskal's Algorithm" />);
  const kruskalListGroup = screen.getByTestId("kruskal-list-group");
  expect(kruskalListGroup).toBeInTheDocument();
  expect(kruskalListGroup).toHaveClass("list-group list-group-flush");
});

test("Prim's PseudoCode loads and has correct attributes", () => {
  render(<PseudoCode algName="Prim's Algorithm" />);
  const primListGroup = screen.getByTestId("prim-list-group");
  expect(primListGroup).toBeInTheDocument();
  expect(primListGroup).toHaveClass("list-group list-group-flush");
});

// test kruskal pseudocode highlight for each algorithmstate.
for (let i = 0; i < kPseudoLines.length; i++) {
  test(`Kruskal's PseudoCode Highlighting ${i}`, () => {
    render(<PseudoCode algName="Kruskal's Algorithm" algorithmState={i} />);
    const highlightLine = screen.queryByText(kPseudoLines[i]);
    expect(highlightLine).toBeInTheDocument();
    expect(highlightLine).toHaveClass(
      "list-group-item list-group-item-warning"
    );

    for (let j = 0; j < kPseudoLines.length; j++) {
      if (j === i) continue;
      const line = screen.getByText(kPseudoLines[j]);
      expect(line).toBeInTheDocument();
      expect(line).toHaveClass("list-group-item list-group-item-dark");
    }
  });
}

// test prim pseudocode highlight for each algorithmstate
for (let i = 0; i < pPseudoLines.length; i++) {
  test(`Prim's PseudoCode Highlighting ${i}`, () => {
    render(<PseudoCode algName="Prim's Algorithm" algorithmState={i} />);
    const highlightLine = screen.queryByText(pPseudoLines[i]);
    expect(highlightLine).toBeInTheDocument();
    expect(highlightLine).toHaveClass(
      "list-group-item list-group-item-warning"
    );

    for (let j = 0; j < pPseudoLines.length; j++) {
      if (j === i) continue;
      const line = screen.getByText(pPseudoLines[j]);
      expect(line).toBeInTheDocument();
      expect(line).toHaveClass("list-group-item list-group-item-dark");
    }
  });
}
