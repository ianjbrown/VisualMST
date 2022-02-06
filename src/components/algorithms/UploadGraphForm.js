import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function UploadGraphForm(props) {
  const [selectedFile, setSelectedFile] = useState();

  function changeHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  function submitHandler(event) {
    event.preventDefault();
    props.onUploadGraph(selectedFile);
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Graph File</Form.Label>
        <Form.Control type="file" name="file" onChange={changeHandler} />

        <Button className="mt-2" variant="primary" type="submit">Import Graph</Button>
      </Form.Group>
    </Form>
  );
}

export default UploadGraphForm;
