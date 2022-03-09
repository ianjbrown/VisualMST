import { render, screen, cleanup } from "@testing-library/react";
import Centered from "../Centered";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Centered component matches snapshot", () => {
  const tree = renderer.create(<Centered>Hello World</Centered>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Centered component loads and has correct className", () => {
  render(<Centered>Hello World</Centered>);
  const centeredDiv = screen.getByTestId("centered-div");
  expect(centeredDiv).toBeInTheDocument();
  expect(centeredDiv).toHaveClass("centered");
});

test("Centered component is correctly passed children", () => {
  render(
    <Centered>
      <h1>Hello World</h1>
    </Centered>
  );
  const centeredDiv = screen.getByTestId("centered-div");
  expect(centeredDiv).toContainHTML("<h1>Hello World</h1>");
});
