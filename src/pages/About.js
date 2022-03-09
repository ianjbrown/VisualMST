import MainNavigaton from "../components/layout/MainNavigation";
import AboutAccordion from "../components/ui/AboutAccordion";
import { Container } from "react-bootstrap";
import Centered from "../components/ui/Centered";
function AboutPage() {
  return (
    <>
      <MainNavigaton />
      <Container data-testid="home-container" className="pt-5">
        <Centered>
          <h3>About...</h3>
          <AboutAccordion />
        </Centered>
      </Container>
    </>
  );
}

export default AboutPage;
