import React from "react";
import MainNavigaton from "../components/layout/MainNavigation";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <React.Fragment>
      <MainNavigaton />
      <Container className="pt-5">
        <h1>Home</h1>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
