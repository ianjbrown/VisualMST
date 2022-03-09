import HomePage from "../Home";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Home Page matches snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <HomePage />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Home page loads: navbar and container", () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );
  const navbar = screen.getByRole("navigation");
  const home = screen.queryByTestId("home-container");

  expect(navbar).toBeInTheDocument();
  expect(home).toBeInTheDocument();
});

test("Get started button link and class is correct", () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );
  const button = screen.getByText("Get Started");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("btn btn-primary");
  expect(button).toHaveAttribute("href", "/algorithms");
});

test("About button link and class is correct", () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );
  const button = screen.getByTestId("About");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("btn btn-secondary");
  expect(button).toHaveAttribute("href", "/about");
});

test("gif image loads", () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
});
