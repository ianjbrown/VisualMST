import { Form, Button } from "react-bootstrap";

const exampleGraph = `0,1,1` + `\n` + `0,4,4` + `\n` + `0,5,5` + `\n` + `1,2,2` + `\n` + `1,3,5` + `\n` + `1,4,4` + `\n` + `2,3,5` + `\n` + `3,4,7`

function VisualisationForm(props) {
  function verticesChangeHandler(event) {
    event.preventDefault();
    props.onVerticesChange(event.target.value);
  }

  function startingChangeHandler(event) {
    event.preventDefault();
    props.onStartingChange(event.target.value);
  }

  function genImpChangeHandler(event) {
    event.preventDefault();
    props.onGenImpChange(event.target.value);
  }

  function fileChangeHandler(event) {
    event.preventDefault();
    props.onFileChange(event.target.files[0]);
  }

  function textBoxChangeHandler(event) {
    event.preventDefault();
    props.onTextBoxChange(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    props.onSubmit(event);
  }

  return (
    <Form data-testid="form" onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="vertices">Number of Vertices</Form.Label>
        <Form.Control
          onChange={verticesChangeHandler}
          type="number"
          min="5"
          max="10"
          required
          id="vertices"
          defaultValue="5"
        />
      </Form.Group>
      {props.alg === "prim" && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="startingvertex">
            Select Starting Vertex
          </Form.Label>
          <Form.Control
            onChange={startingChangeHandler}
            type="number"
            min={0}
            max={props.noOfVertices - 1}
            required
            id="startingvertex"
            defaultValue="0"
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="select">Generate or Import Graph?</Form.Label>
        <Form.Select id="select" onChange={genImpChangeHandler}>
          <option>Select</option>
          <option>Generate Graph</option>
          <option>Import Graph from file</option>
          <option>Import Graph from text box</option>
        </Form.Select>
      </Form.Group>
      {props.genImp === "Import Graph from file" && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="file">Graph File</Form.Label>
          <Form.Control
            id="file"
            type="file"
            name="file"
            onChange={fileChangeHandler}
          />
        </Form.Group>
      )}
      {props.genImp === "Import Graph from text box" && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="text">Create Graph</Form.Label>
          <Form.Control
            as="textarea"
            name="textarea"
            id="textarea"
            rows={15}
            defaultValue={exampleGraph}
            onChange={textBoxChangeHandler}
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Button className="mt-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default VisualisationForm;
