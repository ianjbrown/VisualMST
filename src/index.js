import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/Home";
import AlgorithmsPage from "./pages/Algorithms";
import Layout from "./components/layout/Layout";

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/algorithms" component={AlgorithmsPage} />
        </Switch>
      </Router>
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
