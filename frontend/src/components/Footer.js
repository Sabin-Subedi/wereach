import React from "react";
import { Col, Container, Row } from "react-bootstrap";


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
      <Container>
        <Row xs={1} md={4} className="g-4 mb-5 mt-3">
          <Col>
            <h1 className="display-6 text-success">CIVIS</h1>
          </Col>
          <Col>
            <h5 className="text-success">Projects</h5>
            {data.map((item) => (
              <p className="mb-1 fs-6 fw-light">{item}</p>
            ))}
          </Col>
          <Col>
            <h5 className="text-success">Learn More</h5>
            <p className="mb-1 fs-6 fw-light">About Us</p>
            <p className="mb-1 fs-6 fw-light">How it works</p>
            <p className="mb-1 fs-6 fw-light">Our Vision</p>
          </Col>

          <Col>
            <h5 className="text-success">Resources</h5>
            <p className="mb-1 fs-6 fw-light">Help Center</p>
            <p className="mb-1 fs-6 fw-light">Blog</p>
            <p className="mb-1 fs-6 fw-light">Success Stories</p>
            <p className="mb-1 fs-6 fw-light">Privacy and Policy</p>
            <p className="mb-1 fs-6 fw-light">Terms and Condition</p>
          </Col>
        </Row>
      </Container>
     
    </div>
     <div className='py-3 text-center fs-6 fw-light'>
     © 2010-2021 Civis
     </div>
     </>
  );
}

export default Footer;
