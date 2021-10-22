import React from "react";
import { Redirect } from 'react-router-dom';

import Card from "../components/ui/Card";

function VisualisationPage(props) {
  if (!props.graph) {
    alert("An error has occurred, redirecting to homepage.");
    return <Redirect to='/'/>
  }
  var graphToString = props.graph.toString();
  return (
    <div>
      <h3>We begin with the following generated graph:</h3>
    <Card>
      <ul>{graphToString.map((line) => <li>{line}</li>)}</ul>
    </Card>
    </div>
  );
}

export default VisualisationPage;
