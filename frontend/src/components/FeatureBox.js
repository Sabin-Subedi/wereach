import React from "react";
import { Container, Row } from "react-bootstrap";
import { features } from "../constants/data";
import Feature from "./Feature";

function FeatureBox() {
  return (
    <div className="bg-tan py-5">
      <Container fluid='md'>
        <h2 className="text-center mb-5 py-2">Our Core Features</h2>
        <Row xs={1} sm={2} lg={3} className='py-3'>
          {features.map(feat => (
              <Feature title={feat.title} description={feat.description} icon={feat.icon} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default FeatureBox;
