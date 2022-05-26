import VisualisationForm from "../VisualisationForm";
import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import five from "../../../datastructures/text/5.txt";

afterEach(() => {
  cleanup();
});

test("Visualisation Form matches snapshot", () => {
  const tree = renderer.create(<VisualisationForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Visualisation Form loads", () => {
  render(<VisualisationForm />);
  const form = screen.queryByTestId("form");
  expect(form).toBeInTheDocument();
});

test("Number of vertices field loads and range of input behaves as expected", () => {
  render(
    <VisualisationForm onVerticesChange={jest.fn()} onSubmit={jest.fn()} />
  );
  const form = screen.queryByTestId("form");
  const field = screen.queryByLabelText("Number of Vertices");
  const submit = screen.getByRole("button", { type: "submit" });

  expect(field).toBeInTheDocument();

  for (let i = 0; i < 20; i++) {
    userEvent.type(field, `{backspace}{backspace}${i}`);
    expect(field.value).toBe(`${i}`);
    userEvent.click(submit);
    if (i >= 5 && i <= 10) {
      expect(form).toBeValid();
    } else {
      expect(form).toBeInvalid();
    }
  }
});

test("Starting vertex field doesn't appear for Kruskal's", () => {
  render(<VisualisationForm alg="kruskal" />);
  const field = screen.queryByLabelText("Select Starting Vertex");
  expect(field).not.toBeInTheDocument();
});

test("Starting vertex field loads for Prim's and range of input behaves as expected", () => {
  render(
    <VisualisationForm
      onStartingChange={jest.fn()}
      onSubmit={jest.fn()}
      noOfVertices="6"
      alg="prim"
    />
  );
  const form = screen.queryByTestId("form");
  const field = screen.getByLabelText("Select Starting Vertex");
  const submit = screen.getByRole("button", { type: "submit" });
  expect(field).toBeInTheDocument();

  for (let i = 0; i < 20; i++) {
    userEvent.type(field, `{backspace}{backspace}${i}`);
    expect(field.value).toBe(`${i}`);
    userEvent.click(submit);
    if (i < 6) {
      expect(form).toBeValid();
    } else {
      expect(form).toBeInvalid();
    }
  }
});

test("Selection field for gen/import graph loads, file field loads when import is selected", async () => {
  const { rerender } = render(<VisualisationForm onGenImpChange={jest.fn()} />);
  const field = screen.getByLabelText("Generate or Import Graph?");
  let fileField = screen.queryByLabelText("Graph File");
  expect(field).toBeInTheDocument();
  expect(fileField).not.toBeInTheDocument();

  userEvent.selectOptions(
    field,
    screen.getByRole("option", { name: "Import Graph from file" })
  );
  rerender(
    <VisualisationForm onGenImpChange={jest.fn()} genImp="Import Graph from file" />
  );
  fileField = screen.queryByLabelText("Graph File");
  await waitFor(() => {
    expect(fileField).toBeInTheDocument();
  });
});

test("test file upload works as expected", () => {
    render(<VisualisationForm onFileChange={jest.fn()} genImp="Import Graph from file" />);
    const fileField = screen.queryByLabelText("Graph File");
    userEvent.upload(fileField, five);
    expect(fileField.files[0]).toBe(five);
})

// test("Alert displayed on invalid file input", () => { 

// })
