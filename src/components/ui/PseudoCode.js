import { ListGroup } from "react-bootstrap";

function PseudoCode(props) {
  if (props.algName === "Kruskal's Algorithm") {
    return (
      <ListGroup variant="flush" as="ul">
        {props.algorithmState === 0 ? (
          <ListGroup.Item variant="warning" as="li">
            Sort edges in non-decreasing order;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            Sort edges in non-decreasing order;
          </ListGroup.Item>
        )}
        {props.algorithmState === 1 ? (
          <ListGroup.Item variant="warning" as="li">
            While edges remain in queue
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            While edges remain in queue
          </ListGroup.Item>
        )}
        {props.algorithmState === 2 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp; e = edge with smallest weight;&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp; e = edge with smallest weight;&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 3 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp; If adding e to MST doesn't create cycle&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp; If adding e to MST doesn't create cycle&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 4 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp;&emsp; Add e to MST;&emsp;&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp;&emsp; Add e to MST;&emsp;&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 5 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp; Else&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp; Else&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 6 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp;&emsp; Reject e from MST;&emsp;&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp;&emsp; Reject e from MST;&emsp;&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 7 ? (
          <ListGroup.Item variant="warning" as="li">
            We have found a minimum spanning tree with n-1 edges
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            We have found a minimum spanning tree with n-1 edges
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  } else if (props.algName === "Prim's Algorithm") {
    return (
      <ListGroup variant="flush" as="ul">
        {props.algorithmState === 0 ? (
          <ListGroup.Item variant="warning" as="li">
            Initialise visited set with starting vertex
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            Initialise visited set with starting vertex
          </ListGroup.Item>
        )}
        {props.algorithmState === 1 ? (
          <ListGroup.Item variant="warning" as="li">
            Add connecting edges to queue.
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            Add connecting edges to queue.
          </ListGroup.Item>
        )}
        {props.algorithmState === 2 ? (
          <ListGroup.Item variant="warning" as="li">
            While visited doesn't contain all vertices
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            While visited doesn't contain all vertices
          </ListGroup.Item>
        )}
        {props.algorithmState === 3 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp; select edge with smallest weight&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp; select edge with smallest weight&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 4 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp; If corresponding vertex not visited&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp; If corresponding vertex not visited&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 5 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp;&emsp; Add vertex to visited and adjacent edges to queue
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp;&emsp; Add vertex to visited and adjacent edges to queue
          </ListGroup.Item>
        )}
        {props.algorithmState === 6 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp; Else&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp; Else&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 7 ? (
          <ListGroup.Item variant="warning" as="li">
            &emsp;&emsp;Ignore edge&emsp;&emsp;
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            &emsp;&emsp; Ignore edge&emsp;&emsp;
          </ListGroup.Item>
        )}
        {props.algorithmState === 8 ? (
          <ListGroup.Item variant="warning" as="li">
            Found minimum spanning tree
          </ListGroup.Item>
        ) : (
          <ListGroup.Item variant="dark" as="li">
            Found minimum spanning tree
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  }
}

export default PseudoCode;
