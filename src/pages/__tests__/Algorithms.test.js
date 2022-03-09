import AlgorithmsPage from "../Algorithms";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Algorithms page matches snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <AlgorithmsPage />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Algorithms page loads, navbar and container", () => {
  render(
    <Router>
      <AlgorithmsPage />
    </Router>
  );
  const navbar = screen.getByRole("navigation");
  const home = screen.queryByTestId("algorithm-container");

  expect(navbar).toBeInTheDocument();
  expect(home).toBeInTheDocument();
});

// test("Import Graph Error message appears on invalid file", () => {
//   render(
//     <Router>
//       <AlgorithmsPage />
//     </Router>
//   );
//   const form = screen.getByTestId("form");
//   console.log(form);
// });
