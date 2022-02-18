import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

function NewGraphForm(props) {
  const verticesInputRef = useRef();
  const startingVertexRef = useRef();
  const genImpRef = useRef();

  function verticesChangeHandler(event) {
    console.log(event.target.value);
    event.preventDefault();
    props.onVerticesChange(event.target.value);
  }

  function startingChangeHandler(event) {
    console.log(event.current.value);
    event.preventDefault();
    props.onStartingChange(event.current.value);
  }

  function genImpChangeHandler(event) {
    console.log(event.target.value);
    event.preventDefault();
    props.onGenImpChange(event.target.value);
  }

  function fileChangeHandler(event) {
    console.log(event.target.files[0]);
    event.preventDefault();
    props.onFileChange(event.target.files[0]);
  }

  function submitHandler(event) {
    console.log(event);
    event.preventDefault();
    console.log("hi");
    props.onSubmit(event);
    console.log("hey");
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
          defaultValue="6"
          ref={verticesInputRef}
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
            ref={startingVertexRef}
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Generate or Import Graph?</Form.Label>
        <Form.Select ref={genImpRef} onChange={genImpChangeHandler}>
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
