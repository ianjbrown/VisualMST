import { useRef } from "react";
import { Form, Button } from "react-bootstrap";

function NewGraphForm(props) {
  const verticesInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredVertexNo = verticesInputRef.current.value;
    props.onSubmit(enteredVertexNo);
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Number of Vertices</Form.Label>
        <Form.Control
          type="number"
          min="5"
          max="10"
          required
          id="vertices"
          ref={verticesInputRef}
        />

        <Button className="mt-2" variant="primary" type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}

export default NewGraphForm;
