import AlgorithmItem from "./AlgorithmItem";
import { Row } from "react-bootstrap";

function AlgorithmList(props) {
  return (
    <div>
      <h2 className="pb-3">Please select an algorithm for visualisation.</h2>
      <Row xxl={1} className="d-flex justify-content-center">
        {props.algorithms.map((algorithm) => (
          <AlgorithmItem
            id={algorithm.id}
            title={algorithm.title}
            description={algorithm.description}
            steps={algorithm.steps}
          />
        ))}
      </Row>
    </div>
  );
}

export default AlgorithmList;
