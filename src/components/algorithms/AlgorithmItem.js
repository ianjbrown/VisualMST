import { Link } from "react-router-dom";

import { Card, Col, Button } from "react-bootstrap";
import React from "react";

function AlgorithmItem(props) {
  return (
    <Col className="pb-3">
      <Card style={{ width: "600px" }} className="px-1">
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            <p>{props.description}</p>
            {/* <p>
            The outline of the steps to find the MST using {props.title} are as
            follows:
          </p> */}
            {/* <p>{props.steps}</p> */}

            <Link to={"/algorithms/" + props.id + "-generate"}>
              <Button className="align-self-end" variant="primary">
                Generate Graph
              </Button>
            </Link>
            <span> </span>
            <Link to={"/algorithms/" + props.id + "-import"}>
              <Button variant="primary">Import Graph</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AlgorithmItem;
