import { render, screen, cleanup } from "@testing-library/react";
import Layout from "../Layout";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Layout matches snapshot", () => {
  const tree = renderer.create(
    <Layout>
      <div>Hello World</div>
    </Layout>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Layout component loads and is correctly passed children", () => {
  render(
    <Layout>
      <h1>Hello World</h1>
    </Layout>
  );
  const container = screen.getByTestId("layout");
  expect(container).toBeInTheDocument();
  expect(container).toContainHTML("<h1>Hello World</h1>");
});
