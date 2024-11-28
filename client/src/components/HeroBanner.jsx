import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function HeroBanner() {
  return (
    <div className="hero-banner">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Welcome to Our Library</h1>
            <p>Explore a vast collection of books for every interest</p>
            <Button variant="primary">Browse Books</Button>
          </Col>
          <Col md={6}>
            <img
              src="https://via.placeholder.com/500x500"
              alt="Books"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeroBanner;
