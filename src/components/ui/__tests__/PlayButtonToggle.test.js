import PlayButtonToggle from "../PlayButtonToggle";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Play matches snapshot", () => {
    const play = renderer.create(<PlayButtonToggle paused={true} />);
    expect(play).toMatchSnapshot();
})

test("Pause matches snapshot", () => {
    const pause = renderer.create(<PlayButtonToggle paused={false} />);
    expect(pause).toMatchSnapshot();
})

test("Correct button displayed when paused", () => {
    render(<PlayButtonToggle paused={true} />);
    const playButton = screen.queryByTestId("PlayArrowIcon");
    const pauseButton = screen.queryByTestId("PauseOutlinedIcon");
    expect(playButton).toBeInTheDocument();
    expect(pauseButton).not.toBeInTheDocument();
})

test("Correct button displayed when not paused", () => {
    render(<PlayButtonToggle paused={false} />);
    const playButton = screen.queryByTestId("PlayArrowIcon");
    const pauseButton = screen.queryByTestId("PauseOutlinedIcon");
    expect(playButton).not.toBeInTheDocument();
    expect(pauseButton).toBeInTheDocument();


})