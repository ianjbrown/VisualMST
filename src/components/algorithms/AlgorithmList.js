import AlgorithmItem from "./AlgorithmItem";
import classes from "./AlgorithmList.module.css";

function AlgorithmList(props) {
  return (
    <div>
      <h2>Please select an algorithm for visualisation.</h2>
      <ul className={classes.list}>
        {props.algorithms.map((algorithm) => (
          <AlgorithmItem
            id={algorithm.id}
            title={algorithm.title}
            description={algorithm.description}
            steps={algorithm.steps}
          />
        ))}
      </ul>
    </div>
  );
}

export default AlgorithmList;
