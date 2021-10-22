import { Link } from "react-router-dom";

import Card from "../ui/Card";
import classes from './AlgorithmItem.module.css';

function AlgorithmItem(props) {
    
  return (
    <Card>
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>The outline of the steps to find the MST using {props.title} are as follows:</p>
        {props.steps}
      </div>
      <div className={classes.action}>
        <Link to={"/algorithms/" + props.id }>
          <button>Go!</button>
        </Link>
      </div>
    </Card>
  );
}

export default AlgorithmItem;
