import { Form, Button } from "react-bootstrap";

function NewGraphForm(props) {

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

  function submitHandler(event) {
    event.preventDefault();
    props.onSubmit(event);
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Number of Vertices</Form.Label>
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
          <Form.Label>Select Starting Vertex</Form.Label>
          <Form.Control
            onChange={startingChangeHandler}
            type="number"
            min={0}
            max={parseInt(props.noOfVertices) - 1}
            required
            id="startingvertex"
            defaultValue="0"
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Generate or Import Graph?</Form.Label>
        <Form.Select onChange={genImpChangeHandler}>
          <option>Select</option>
          <option>Generate Graph</option>
          <option>Import Graph</option>
        </Form.Select>
      </Form.Group>
      {props.genImp === "Import Graph" && (
        <Form.Group className="mb-3">
          <Form.Label>Graph File</Form.Label>
          <Form.Control type="file" name="file" onChange={fileChangeHandler} />
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

export default NewGraphForm;
