import React from "react";
import { Link } from "react-router-dom";
import MainNavigaton from "../components/layout/MainNavigation";
import { Container, Image } from "react-bootstrap";
import vis from "../images/vis.gif";

function HomePage() {
  return (
    <React.Fragment>
      <MainNavigaton />
      <Container data-testid="home-container" className="pt-5">
        <h1>VisualMST</h1>
        <h6 style={{ marginBottom: "30px" }}>
          A web application for visualising minimum spanning tree algorithms.
        </h6>
        <Link to="/algorithms" className="btn btn-primary">
          Get Started
        </Link>
        <span> </span>
        <Link data-testid="About" to="/about" className="btn btn-secondary">
          About
        </Link>
        <Image
          style={{
            display: "flex",
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: "55px",
            width: "75%",
          }}
          src={vis}
          alt="visualisation_gif"
        />
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
