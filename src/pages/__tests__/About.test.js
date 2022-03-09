import AboutPage from "../About";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("About Page matches snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <AboutPage />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("About Page loads: navbar and container", () => {
  render(
    <Router>
      <AboutPage />
    </Router>
  );
  const navbar = screen.getByRole("navigation");
  const home = screen.queryByTestId("home-container");

  expect(navbar).toBeInTheDocument();
  expect(home).toBeInTheDocument();
});
