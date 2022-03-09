import { render, screen, cleanup } from "@testing-library/react";
import MainNavigaton from "../MainNavigation";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Test Navigation Bar matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <MainNavigaton />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

const links = [
  { text: "Home", location: "/" },
  { text: "About", location: "/about" },
  { text: "Contact", location: "/contact" },
  { text: "Algorithms", location: "/algorithms" },
];

test.each(links)("Check if Navigation Bar has %s link", (link) => {
  render(
    <Router>
      <MainNavigaton />
    </Router>
  );
  const linkDOM = screen.getByText(link.text);
  expect(linkDOM).toHaveAttribute("href", link.location);
});
