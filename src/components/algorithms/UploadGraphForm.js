import { useState } from "react";

import classes from "./NewGraphForm.module.css";

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
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label>Graph File</label>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
        />
      </div>
      <div className={classes.actions}>
        <button>Import Graph</button>
      </div>
    </form>
  );
}

export default UploadGraphForm;
