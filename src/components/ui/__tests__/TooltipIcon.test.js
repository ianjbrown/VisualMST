import TooltipIcon from "../TooltipIcon";
import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

const buttons = [
  { symbol: "FirstPageIcon", text: "First Step", id: "first" },
  { symbol: "ArrowBackIosNewOutlinedIcon", text: "Previous Step", id: "back" },
  { symbol: "ArrowForwardIosOutlinedIcon", text: "Next Step", id: "forward" },
  { symbol: "LastPageIcon", text: "Final Step", id: "last" },
].map(button => Object.assign(button, { toString: function() { return this.id; }}));

test.each(buttons)(`%s matches snapshot`, (button) => {
  const toolTip = renderer.create(<TooltipIcon id={button.id} />).toJSON();
  expect(toolTip).toMatchSnapshot();
});

test("play matches snapshot", () => {
  const toolTip = renderer.create(<TooltipIcon id={"play"} />).toJSON();
  expect(toolTip).toMatchSnapshot();
});

test("hide matches snapshot", () => {
  const toolTip = renderer.create(<TooltipIcon id={"hide"} />).toJSON();
  expect(toolTip).toMatchSnapshot();
});

test.each(buttons)(
  "%s tooltip only visible on hover",
  async (button) => {
    render(<TooltipIcon id={button.id} />);
    expect(screen.queryByText(button.text)).not.toBeInTheDocument();
    userEvent.hover(screen.getByTestId(button.symbol));
    expect(screen.getByText(button.text)).toBeInTheDocument();
    userEvent.unhover(screen.getByTestId(button.symbol));
    await waitFor(() => {
      expect(screen.queryByText(button.text)).not.toBeInTheDocument();
    });
  }
);

test("play tooltip only visible on hover", async () => {
  render(<TooltipIcon id="play" paused={true} />);
  expect(screen.queryByText("Play Visualisation")).not.toBeInTheDocument();
  userEvent.hover(screen.getByTestId("PlayArrowIcon"));
  expect(screen.getByText("Play Visualisation")).toBeInTheDocument();
  userEvent.unhover(screen.getByTestId("PlayArrowIcon"));
  await waitFor(() => {
    expect(screen.queryByText("Play Visualisation")).not.toBeInTheDocument();
  });
});

test("pause tooltip only visible on hover", async () => {
  render(<TooltipIcon id="play" paused={false} />);
  expect(screen.queryByText("Pause Visualisation")).not.toBeInTheDocument();
  userEvent.hover(screen.getByTestId("PauseOutlinedIcon"));
  expect(screen.getByText("Pause Visualisation")).toBeInTheDocument();
  userEvent.unhover(screen.getByTestId("PauseOutlinedIcon"));
  await waitFor(() => {
    expect(screen.queryByText("Pause Visualisation")).not.toBeInTheDocument();
  });
});

test("hide graph tooltip only visible on hover", async () => {
  render(<TooltipIcon id="hide" backgroundOn={true} />);
  expect(
    screen.queryByText("Hide original graph edges")
  ).not.toBeInTheDocument();
  userEvent.hover(screen.getByTestId("ToggleOffOutlinedIcon"));
  expect(screen.getByText("Hide original graph edges")).toBeInTheDocument();
  userEvent.unhover(screen.getByTestId("ToggleOffOutlinedIcon"));  
  await waitFor(() => {
    expect(screen.queryByText("Hide original graph edges")).not.toBeInTheDocument();
  });
});

test("show graph tooltip only visible on hover", async () => {
  render(<TooltipIcon id="hide" backgroundOn={false} />);
  expect(
    screen.queryByText("Show original graph edges")
  ).not.toBeInTheDocument();
  userEvent.hover(screen.getByTestId("ToggleOnOutlinedIcon"));
  expect(screen.getByText("Show original graph edges")).toBeInTheDocument();
  userEvent.unhover(screen.getByTestId("ToggleOnOutlinedIcon"));
  await waitFor(() => {
    expect(screen.queryByText("Show original graph edges")).not.toBeInTheDocument();
  });
});

// test("Clicking pause/play toggles correctly", async () => {
//   render(<TooltipIcon id="play" paused={true} />);
//   expect(screen.queryByTestId("PlayArrowIcon")).toBeInTheDocument();
//   expect(screen.queryByTestId("PauseOutlinedIcon")).not.toBeInTheDocument();
//   fireEvent.click(screen.getByTestId("PlayArrowIcon"));
//   await waitFor(() => {
//     expect(screen.queryByTestId("PauseOutlinedIcon")).toBeInTheDocument();
//     expect(screen.queryByTestId("PlayArrowIcon")).not.toBeInTheDocument();
//   });
// });

// test("TooltipIcon component matches snapshot for play", () => {
//   const toolTip = renderer.create(
//     <TooltipIcon
//       symbol={playPause}
//       symbolToolTip="Play Visualisation"
//       id="play"
//     />
//   );
//   expect(toolTip).toMatchSnapshot();
// });
