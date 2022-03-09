import { render, screen, cleanup } from "@testing-library/react";
import PlayBack from "../PlayBack";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("PlayBack component matches snapshot", () => {
  const playBack = renderer.create(<PlayBack />).toJSON();
  expect(playBack).toMatchSnapshot();
});

test("Slider Col loads and has class bar", () => {
  render(<PlayBack />);
  const sliderCol = screen.getByTestId("slider-col");
  expect(sliderCol).toBeInTheDocument();
  expect(sliderCol).toHaveClass("bar");
  // expect(sliderCol).toContainElement(screen.getByTestId("slow"));
  // expect(sliderCol).toContainElement(screen.getByTestId("slider"));
  // expect(sliderCol).toContainElement(screen.getByTestId("fast"));
});

// test("Slow and Fast load and have class barText", () => {
//   render(<PlayBack />);
//   const slow = screen.getByTestId("slow");
//   const fast = screen.getByTestId("fast");
//   expect(slow).toBeInTheDocument();
//   expect(fast).toBeInTheDocument();
//   expect(slow).toHaveClass("barText");
//   expect(fast).toHaveClass("barText");
// });

// test("Slider loads and has class slider", () => {
//   render(<PlayBack />);
//   const slider = screen.getByTestId("slider");
//   expect(slider).toBeInTheDocument();
//   expect(slider).toHaveClass("slider");
// });

test("Playback Col loads and has class bar", () => {
  // const onPause = jest.fn();
  // const onTimeoutChange = jest.fn();
  // const onFirst = jest.fn();
  // const onBack = jest.fn();
  // const onForward = jest.fn();
  // const onLast = jest.fn();
  // const onToggleBackgroundGraph = jest.fn();
  render(
    <PlayBack
    // paused={true}
    // onPause={onPause}
    // onTimeoutChange={onTimeoutChange}
    // onFirst={onFirst}
    // onBack={onBack}
    // onForward={onForward}
    // onLast={onLast}
    // onToggleBackgroundGraph={onToggleBackgroundGraph}
    />
  );
  const playBackCol = screen.getByTestId("playback-col");
  expect(playBackCol).toBeInTheDocument();
  expect(playBackCol).toHaveClass("bar");
  // expect(playBackCol).toContainElement(screen.queryByTestId("first"));
  // expect(playBackCol).toContainElement(screen.getByTestId("back"));
  // expect(playBackCol).toContainElement(screen.getByTestId("play"));
  // expect(playBackCol).toContainElement(screen.getByTestId("forward"));
  // expect(playBackCol).toContainElement(screen.getByTestId("last"));
});

test("Toggle Col loads and has class bar", () => {
  render(<PlayBack />);
  const toggleCol = screen.getByTestId("toggle-col");
  expect(toggleCol).toBeInTheDocument();
  expect(toggleCol).toHaveClass("bar");
  // expect(toggleCol).toContainElement(screen.getByTestId("hide"));
  // expect(toggleCol).toContainElement(screen.getByTestId("hide-text"));
});

// test("Hide original graph loads and has class barText", () => {
//   render(<PlayBack />);
//   const barText = screen.getByTestId("hide-text");
//   expect(barText).toBeInTheDocument();
//   expect(barText).toHaveClass("barText");
// });
