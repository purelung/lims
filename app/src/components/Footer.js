import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">

        <Col xs="6" className="text-right">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span href="/" className="text-muted">
              MidnightData
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
