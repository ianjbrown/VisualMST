import { useRef } from "react";

import classes from "./NewGraphForm.module.css";

function StartingVertexForm(props) {
  const startingVertexRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const startingVertexNo = startingVertexRef.current.value;
    props.onSubmit(startingVertexNo);
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label>Select Starting Vertex</label>
        <input
          type="number"
          min={0}
          max={props.noOfVertices - 1}
          required
          id="startingvertex"
          ref={startingVertexRef}
        />
        <div className={classes.actions}>
          <button onClick={submitHandler}>Confirm</button>
        </div>
      </div>
    </form>
  );
}

export default StartingVertexForm;
