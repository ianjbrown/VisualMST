import { useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Centered from "../components/ui/Centered";
import VisualisationPage from "./Visualisation";
import MainNavigation from "../components/layout/MainNavigation";
import Graph from "../datastructures/Graph";
import NewGraphForm from "../components/algorithms/VisulisationForm";
import { Container, Tabs, Tab, Alert } from "react-bootstrap";

function AlgorithmsPage() {
  const [noOfVertices, setNoOfVertices] = useState("6");
  const [startingVertex, setStartingVertex] = useState("0");
  const [genImp, setGenImp] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [selectedGraph, setSelectedGraph] = useState();
  const [selectedMSTGraph, setSelectedMSTGraph] = useState();
  const [importError, setImportError] = useState(false);
  const [key, setKey] = useState("kruskal");

  const history = useHistory();
  const match = useRouteMatch();

  function handleVerticesChange(value) {
    setNoOfVertices(value);
  }

  function handleStartingChange(value) {
    setStartingVertex(value);
  }

  function handleGenImpChange(value) {
    setGenImp(value);
  }

  function handleFileChange(value) {
    setSelectedFile(value);
  }

  function generateHelper() {
    var fileName = noOfVertices + ".txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("Get", "/text/" + fileName, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = rawFile.responseText;
          var lines = allText.split(/[\r\n]+/g);
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
      }
    };
    rawFile.send(null);
  }

  function importHelper() {
    console.log(selectedFile);
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

  function submitHandler(event) {
    console.log("HELLO");
    if (genImp === "Generate Graph") {
      generateHelper();
    } else if (genImp === "Import Graph") {
      importHelper();
    }
  }

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:algorithmId`}>
          <VisualisationPage
            graph={selectedGraph}
            MSTGraph={selectedMSTGraph}
            alg={key}
            startingVertex={startingVertex}
          />
        </Route>
        <Route exact path={match.path}>
          <MainNavigation />
          <Container className="pt-5">
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
                  <NewGraphForm
                    genImp={genImp}
                    onVerticesChange={handleVerticesChange}
                    onGenImpChange={handleGenImpChange}
                    onFileChange={handleFileChange}
                    onSubmit={submitHandler}
                    alg={key}
                  />
                </Tab>
                <Tab eventKey="prim" title="Prim's">
                  <NewGraphForm
                    genImp={genImp}
                    noOfVertices={noOfVertices}
                    onVerticesChange={handleVerticesChange}
                    onStartingChange={handleStartingChange}
                    onGenImpChange={handleGenImpChange}
                    onFileChange={handleFileChange}
                    onSubmit={submitHandler}
                    alg={key}
                  />
                </Tab>
              </Tabs>
            </Centered>
          </Container>
        </Route>
      </Switch>
    </div>
  );
}

export default AlgorithmsPage;
