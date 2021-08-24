import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const data = [
  "Animals",
  "Education",
  "Emergencies",
  "Natural Disaster",
  "Rural Development",
  "Health and Disease",
];

function Footer() {
  return (
    <>
      <div className="border py-4">
        <Container fluid='md'>
          <Row xs={1} md={4} className="g-4 mb-5 mt-3">
            <Col>
              <h1 className="display-6 text-success"><img src="/logo.svg" alt="WEREACH" /></h1>
            </Col>
            <Col>
              <h5 className="text-success">Projects</h5>
              {data.map((item) => (
                <LinkContainer
                  to={`/discover?category=${item
                    .replace(/\s+/g, "")
                    .toLowerCase()}`}
                >
                  <p className="mb-1 fs-6 fw-light pointer">{item}</p>
                </LinkContainer>
              ))}
            </Col>
            <Col>
              <h5 className="text-success">Learn More</h5>
              <LinkContainer to="/about-us">
                <p className="mb-1 fs-6 fw-light pointer">About Us</p>
              </LinkContainer>
              <LinkContainer to="/how-it-works">
                <p className="mb-1 fs-6 fw-light pointer">How it works</p>
              </LinkContainer>
              <LinkContainer to="/company-vision">
                <p className="mb-1 fs-6 fw-light pointer">Our Vision</p>
              </LinkContainer>
            </Col>

            <Col>
              <h5 className="text-success">Resources</h5>
              <LinkContainer to="/contact-us">
                <p className="mb-1 fs-6 fw-light pointer">Contact Us</p>
              </LinkContainer>
              <LinkContainer to="/success-stories">
                <p className="mb-1 fs-6 fw-light pointer">Success Stories</p>
              </LinkContainer>
              <LinkContainer to="/privavy-and-policy">
                <p className="mb-1 fs-6 fw-light pointer">Privacy and Policy</p>
              </LinkContainer>
              <LinkContainer to="/terms-and-condition">
                <p className="mb-1 fs-6 fw-light pointer">Terms and Condition</p>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-3 text-center fs-6 fw-light pointer">© 2010-2021 Civis</div>
    </>
  );
}

export default Footer;
