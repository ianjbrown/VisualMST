import { render, screen, cleanup } from "@testing-library/react";
import AboutAccordion from "../AboutAccordion";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("About page matches snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <AboutAccordion />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Accordion loads, containing 5 items", () => {
  render(
    <Router>
      <AboutAccordion />
    </Router>
  );
  const accordion = screen.getByTestId("accordion");
  expect(accordion).toBeInTheDocument();
  expect(accordion).toContainElement(screen.getByTestId("accordion-item-0"));
  expect(accordion).toContainElement(screen.getByTestId("accordion-item-1"));
  expect(accordion).toContainElement(screen.getByTestId("accordion-item-2"));
  expect(accordion).toContainElement(screen.getByTestId("accordion-item-3"));
  expect(accordion).toContainElement(screen.getByTestId("accordion-item-4"));
});

test("Accordion item 0 loads correctly", () => {
  render(
    <Router>
      <AboutAccordion />
    </Router>
  );

  const accordionZero = screen.getByTestId("accordion-item-0");
  const accordionZeroHeader = screen.getByTestId("accordion-item-0-header");
  const accordionZeroBody = screen.getByTestId("accordion-item-0-body");

  expect(accordionZero).toBeInTheDocument();
  expect(accordionZero).toContainElement(accordionZeroHeader);
  expect(accordionZero).toContainElement(accordionZeroBody);
  expect(accordionZeroHeader.textContent).toBe("This Web Application");
  expect(accordionZeroBody).toHaveTextContent(
    "VisualMST has been created as the product"
  );
});

test("Accordion item 1 loads correctly", () => {
  render(
    <Router>
      <AboutAccordion />
    </Router>
  );

  const accordionOne = screen.getByTestId("accordion-item-1");
  const accordionOneHeader = screen.getByTestId("accordion-item-1-header");
  const accordionOneBody = screen.getByTestId("accordion-item-1-body");

  expect(accordionOne).toBeInTheDocument();
  expect(accordionOne).toContainElement(accordionOneHeader);
  expect(accordionOne).toContainElement(accordionOneBody);
  expect(accordionOneHeader.textContent).toBe("Minimum Spanning Trees");
  expect(accordionOneBody).toHaveTextContent(
    "A Minimum Spanning tree is a subset of the edges"
  );
});

test("Accordion item 2 loads correctly", () => {
  render(
    <Router>
      <AboutAccordion />
    </Router>
  );

  const accordionTwo = screen.getByTestId("accordion-item-2");
  const accordionTwoHeader = screen.getByTestId("accordion-item-2-header");
  const accordionTwoBody = screen.getByTestId("accordion-item-2-body");

  expect(accordionTwo).toBeInTheDocument();
  expect(accordionTwo).toContainElement(accordionTwoHeader);
  expect(accordionTwo).toContainElement(accordionTwoBody);
  expect(accordionTwoHeader.textContent).toBe("Kruskal's Algorithm");
  expect(accordionTwoBody).toHaveTextContent(
    "Kruskal's Algorithm is a minimum spanning tree algorithm"
  );
});

test("Accordion item 3 loads correctly", () => {
  render(
    <Router>
      <AboutAccordion />
    </Router>
  );

  const accordionThree = screen.getByTestId("accordion-item-3");
  const accordionThreeHeader = screen.getByTestId("accordion-item-3-header");
  const accordionThreeBody = screen.getByTestId("accordion-item-3-body");

  expect(accordionThree).toBeInTheDocument();
  expect(accordionThree).toContainElement(accordionThreeHeader);
  expect(accordionThree).toContainElement(accordionThreeBody);
  expect(accordionThreeHeader.textContent).toBe("Prim's Algorithm");
  expect(accordionThreeBody).toHaveTextContent(
    "Prim's Algorithm (also known as Prim-Jarnik algorithm)"
  );
});

test("Accordion item 4 loads correctly", () => {
  render(
    <Router>
      <AboutAccordion />
    </Router>
  );

  const accordionFour = screen.getByTestId("accordion-item-4");
  const accordionFourHeader = screen.getByTestId("accordion-item-4-header");
  const accordionFourBody = screen.getByTestId("accordion-item-4-body");

  expect(accordionFour).toBeInTheDocument();
  expect(accordionFour).toContainElement(accordionFourHeader);
  expect(accordionFour).toContainElement(accordionFourBody);
  expect(accordionFourHeader.textContent).toBe("The Developer");
  expect(accordionFourBody).toHaveTextContent(
    "Hi. I'm Ian, a fourth year Computing Science student"
  );
});

test("Social links working", () => {
  render(
    <Router>
      <AboutAccordion />
    </Router>
  );
  const ghlink = screen.getByTestId("github-link");
  const lilink = screen.getByTestId("linkedin-link");

  expect(ghlink).toHaveAttribute("href", "https://github.com/ianjbrown");
  expect(lilink).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/ian-brown-a164581b7/"
  );
});
