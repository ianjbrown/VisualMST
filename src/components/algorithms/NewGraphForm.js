import { useRef } from "react";

import classes from "./NewGraphForm.module.css";

function NewGraphForm(props) {
  const verticesInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredVertexNo = verticesInputRef.current.value;

    props.onGenGraph(enteredVertexNo);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label>Number of Vertices</label>
        <input
          type="number"
          min="5"   
          max="15"
          required
          id="vertices"
          ref={verticesInputRef}
        />
      </div>
      <div className={classes.actions}>
          <button>Generate Graph</button>
      </div>
    </form>
  );
}

export default NewGraphForm;
