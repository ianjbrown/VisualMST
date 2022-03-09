import HideGraphToggle from "../HideGraphToggle";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Hide matches snapshot", () => {
    const hide = renderer.create(<HideGraphToggle backgroundOn={true} />)
    expect(hide).toMatchSnapshot();
})

test("Show matches snapshot", () => {
    const show = renderer.create(<HideGraphToggle backgroundOn={false} />)
    expect(show).toMatchSnapshot();
})

test("Correct toggle position shown when background graph on", () => {
    render(<HideGraphToggle backgroundOn={true} />)
    const offToggle = screen.queryByTestId("ToggleOffOutlinedIcon");
    const onToggle = screen.queryByTestId("ToggleOnOutlinedIcon");
    expect(offToggle).toBeInTheDocument();
    expect(onToggle).not.toBeInTheDocument();
})

test("Correct toggle position shown when background graph off", () => {
    render(<HideGraphToggle backgroundOn={false} />)
    const offToggle = screen.queryByTestId("ToggleOffOutlinedIcon");
    const onToggle = screen.queryByTestId("ToggleOnOutlinedIcon");
    expect(offToggle).not.toBeInTheDocument();
    expect(onToggle).toBeInTheDocument();
})
