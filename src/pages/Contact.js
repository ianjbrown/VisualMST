import { useState } from "react";
import { Alert, Container, Form, Button } from "react-bootstrap";
import MainNavigaton from "../components/layout/MainNavigation";
import Centered from "../components/ui/Centered";
import evalsheet from "../VisualMST_Eval.pdf";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function submitHandler() {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  }

  return (
    <>
      <MainNavigaton />
      <Container data-testid="contact-container" fluid className="pt-5">
        <Centered>
          {submitted && (
            <Alert variant="success">Thank you for your feedback!</Alert>
          )}
          <h1>Evaluation</h1>
          <div style={{ marginTop: "15px", marginBottom: "40px" }}>
            <p>
              I am currently collecting feedback on this application. If you
              have a few minutes please download the briefing sheet below
              and complete the Google form. I would greatly appreciate it!
            </p>
            <p><a href={evalsheet}>Evaluation Briefing Sheet.</a></p>
          </div>
          <h1>Contact</h1>
          <p style={{ marginTop: "15px" }}>
            If you have any further comments about the application,
            please complete the short form below.
          </p>
          <Form
            data-testid="form"
            action={
              "https://public.herotofu.com/v1/755bbcc0-90a6-11ec-8462-6960be7ce578"
            }
            method="POST"
            onSubmit={submitHandler}
            target="_blank"
          >
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name:</Form.Label>
              <Form.Control id="name" placeholder="Name" name="name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                placeholder="name@example.com"
                id="email"
                type="email"
                name="email"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="message">Your Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter message here..."
                name="message"
                id="message"
              />
            </Form.Group>
            <Form.Group>
              <Button className="mt-2" variant="primary" type="submit" name="Submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Centered>
      </Container>
    </>
  );
}

export default ContactPage;
