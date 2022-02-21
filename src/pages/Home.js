import React from "react";
import { Link } from "react-router-dom";
import MainNavigaton from "../components/layout/MainNavigation";
import ImageContainer from "../components/ui/ImageContainer";
import { Container } from "react-bootstrap";
import vis from "../images/vis.gif";

function HomePage() {
  return (
    <React.Fragment>
      <MainNavigaton />
      <Container className="pt-5">
        <h1>VisualMST</h1>
        <h6 style={{marginBottom: "30px"}}>
          A web application for visualising minimum spanning tree algorithms.
        </h6>
        <Link to="/algorithms" className="btn btn-primary">Get Started</Link>
        <span> </span>
        <Link to="/about" className="btn btn-secondary">About</Link>
        <ImageContainer type="home" src={vis} alt="visualisation_gif" />
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
