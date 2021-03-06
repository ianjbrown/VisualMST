import { useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Centered from "../components/ui/Centered";
import VisualisationPage from "./Visualisation";
import MainNavigation from "../components/layout/MainNavigation";
import Graph from "../datastructures/Graph";
import VisualisationForm from "../components/ui/VisualisationForm";
import { Container, Tabs, Tab, Alert } from "react-bootstrap";
import five from "../datastructures/text/5.txt";
import six from "../datastructures/text/6.txt";
import seven from "../datastructures/text/7.txt";
import eight from "../datastructures/text/8.txt";
import nine from "../datastructures/text/9.txt";
import ten from "../datastructures/text/10.txt";

function AlgorithmsPage() {
  const [noOfVertices, setNoOfVertices] = useState(5);
  const [startingVertex, setStartingVertex] = useState(0);
  const [genImp, setGenImp] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [textBox, setTextBox] = useState(`0,1,1` + `\n` + `0,4,4` + `\n` + `0,5,5` + `\n` + `1,2,2` + `\n` + `1,3,5` + `\n` + `1,4,4` + `\n` + `2,3,5` + `\n` + `3,4,7`);
  const [selectedGraph, setSelectedGraph] = useState();
  const [selectedMSTGraph, setSelectedMSTGraph] = useState();
  const [importError, setImportError] = useState(false);
  const [key, setKey] = useState("kruskal");

  const history = useHistory();
  const match = useRouteMatch();

  function handleVerticesChange(value) {
    setNoOfVertices(parseInt(value));
  }

  function handleStartingChange(value) {
    setStartingVertex(parseInt(value));
  }

  function handleGenImpChange(value) {
    setGenImp(value);
  }

  function handleFileChange(value) {
    setSelectedFile(value);
  }

  function handleTextBoxChange(value) {
    setTextBox(value);
  }

  async function generateHelper() {
    var fileName;
    switch (noOfVertices) {
      case 5:
        fileName = five;
        break;
      case 6:
        fileName = six;
        break;
      case 7:
        fileName = seven;
        break;
      case 8:
        fileName = eight;
        break;
      case 9:
        fileName = nine;
        break;
      case 10:
        fileName = ten;
        break;
    }
    let response = await fetch(fileName);
    let data = await response.text();
    var lines = data.split(/[\r\n]+/g);
    // console.log(lines);
    var g = new Graph(noOfVertices);
    g.generateGraph(lines);
    setSelectedGraph(g);
    if (key === "kruskal") {
      setSelectedMSTGraph(g.kruskal());
    } else if (key === "prim") {
      setSelectedMSTGraph(g.prim(startingVertex));
    }
    history.replace("/algorithms/" + key);
  }

  function importHelper() {
    const prom = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        var lines = e.target.result.split(/[\r\n]+/g);
        resolve(lines);
      };
      reader.onerror = reject;
      reader.readAsText(selectedFile);
    });

    prom.then((graphLines) => {
      var g = new Graph(noOfVertices);
      g.importGraph(graphLines);
      if (!g.isConnected(0)) {
        setImportError(true);
        return history.replace("/algorithms/");
      }

      setSelectedGraph(g);

      if (key === "kruskal") {
        setSelectedMSTGraph(g.kruskal());
        history.replace("/algorithms/" + key);
      } else if (key === "prim") {
        setSelectedMSTGraph(g.prim(startingVertex));
        history.replace("/algorithms/" + key);
      }
    });
  }

  function importTextHelper() {
    const graphLines = textBox.split("\n")
    var g = new Graph(noOfVertices);
      g.importGraph(graphLines);
      if (!g.isConnected(0)) {
        setImportError(true);
        return history.replace("/algorithms/");
      }

      setSelectedGraph(g);

      if (key === "kruskal") {
        setSelectedMSTGraph(g.kruskal());
        history.replace("/algorithms/" + key);
      } else if (key === "prim") {
        setSelectedMSTGraph(g.prim(startingVertex));
        history.replace("/algorithms/" + key);
      }
  }

  function submitHandler(event) {
    if (genImp === "Generate Graph") {
      generateHelper();
    } else if (genImp === "Import Graph from file") {
      importHelper();
    } else {
      importTextHelper(event);
    }
  }

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:algorithmId`}>
          <VisualisationPage
            graph={selectedGraph}
            MSTGraph={selectedMSTGraph}
            alg={key}
          />
        </Route>
        <Route exact path={match.path}>
          <MainNavigation />
          <Container data-testid="algorithm-container" className="pt-5">
            <Centered>
              {importError && (
                <Alert variant="danger" dismissable>
                  Error, imported graph is not connected, please edit input file
                  and add edges accordingly.
                </Alert>
              )}
              <h2 className="pb-3">
                Please select an algorithm for visualisation.
              </h2>
              <Tabs
                activeKey={key}
                id="controlled-tab"
                className="mb-3"
                onSelect={(k) => {
                  setKey(k);
                  setGenImp();
                }}
              >
                <Tab eventKey="kruskal" title="Kruskal's">
                  <VisualisationForm
                    genImp={genImp}
                    onVerticesChange={handleVerticesChange}
                    onGenImpChange={handleGenImpChange}
                    onFileChange={handleFileChange}
                    onTextBoxChange={handleTextBoxChange}
                    onSubmit={submitHandler}
                    alg={key}
                  />
                </Tab>
                <Tab eventKey="prim" title="Prim's">
                  <VisualisationForm
                    genImp={genImp}
                    noOfVertices={noOfVertices}
                    onVerticesChange={handleVerticesChange}
                    onStartingChange={handleStartingChange}
                    onGenImpChange={handleGenImpChange}
                    onFileChange={handleFileChange}
                    onTextBoxChange={handleTextBoxChange}
                    onSubmit={submitHandler}
                    alg={key}
                  />
                </Tab>
              </Tabs>
            </Centered>
          </Container>
        </Route>
      </Switch>
    </>
  );
}

export default AlgorithmsPage;
