import ContactPage from "../Contact";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import evalsheet from "../../images/VisualMST_Eval.pdf";

afterEach(() => {
  cleanup();
});

test("Contact Page matches snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <ContactPage />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Contact Page loads, navbar and container", () => {
    render(<Router><ContactPage /></Router>);
    const navbar = screen.getByRole("navigation")
    const contact = screen.queryByTestId("contact-container");
    
    expect(navbar).toBeInTheDocument();
    expect(contact).toBeInTheDocument();
})

test("test evaluation sheet link is correct", () => {
    render(<Router><ContactPage /></Router>);
    const link = screen.getByText("Evaluation Briefing Sheet.");
    expect(link).toHaveAttribute("href", evalsheet);
})

test("Form loads and action attribute is correct", () => {
    render(<Router><ContactPage /></Router>);
    const form = screen.getByTestId("form");
    expect(form).toHaveAttribute("action", "https://public.herotofu.com/v1/755bbcc0-90a6-11ec-8462-6960be7ce578");
})

test("Name field", () => {
    render(<Router><ContactPage /></Router>);
    const nameField = screen.getByLabelText("Name:");
    userEvent.type(nameField, "Ian");
    expect(nameField.value).toBe("Ian");
})

test("Email field", () => {
    render(<Router><ContactPage /></Router>);
    const emailField = screen.getByLabelText("Email:");
    userEvent.type(emailField, "example@email.co.uk");
    expect(emailField.value).toBe("example@email.co.uk");
})

test("Message field", () => {
    render(<Router><ContactPage /></Router>);
    const messageField = screen.getByLabelText("Your Message:");
    userEvent.type(messageField, "example message");
    expect(messageField.value).toBe("example message");
})

test("Complete input", () => {
    render(<Router><ContactPage /></Router>);
    userEvent.type(screen.getByLabelText("Name:"), "Ian");
    userEvent.type(screen.getByLabelText("Email:"), "example@email.co.uk");
    userEvent.type(screen.getByLabelText("Your Message:"), "example message");
    userEvent.click(screen.getByRole("button", {name: "Submit"}));
    expect(screen.getByTestId("form")).toBeValid();
})