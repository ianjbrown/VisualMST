import { useRef } from "react";
import { Form, Button } from "react-bootstrap";


function StartingVertexForm(props) {
  const startingVertexRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const startingVertexNo = startingVertexRef.current.value;
    props.onSubmit(startingVertexNo);
  }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Select Starting Vertex</Form.Label>
        <Form.Control
          type="number"
          min={0}
          max={props.noOfVertices - 1}
          required
          id="startingvertex"
          ref={startingVertexRef}
        />

        <Button className="mt-2" variant="primary" type="submit">
          Confirm
        </Button>
      </Form.Group>
    </Form>
  );
}

export default StartingVertexForm;
