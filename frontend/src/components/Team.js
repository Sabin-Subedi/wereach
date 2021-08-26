import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Teams } from "../constants/data";
import Icon from "./Icon";

function Team() {
  return (
    <Container id="team" className="py-5 mt-5">
      <h2 className="text-center mb-5 display-5">Our Awesome Team</h2>
      <Row xs={1} sm={2} lg={3} className="justify-content-center">
        {Teams.map((item) => (
          <Col className="mb-5">
            <div className="d-flex flex-column align-items-center ">
              <img src={item.photo} alt={item.name} style={{ width: "80%" }} />
              <div className="text-center my-3">
                <h2 className="my-0">{item.name}</h2>
                <p className="my-0 fw-normal text-success fs-6 fw-bold">
                  {item.title}
                </p>
              </div>
              <div>
                {item.instagram && (
                  <a href={item.instagram} target="_blank" rel="noreferrer">
                    <Icon
                      className="pointer icon_hover"
                      icon="fab fa-instagram"
                      color="secondary"
                      size="4"
                    />
                  </a>
                )}
                {item.linkedin && (
                  <a href={item.linkedin} target="_blank" rel="noreferrer">
                    <Icon
                      className="pointer icon_hover"
                      icon="fab fa-linkedin"
                      color="secondary"
                      size="4"
                    />
                  </a>
                )}
                {item.github && (
                  <a href={item.github} target="_blank" rel="noreferrer">
                    <Icon
                      className="pointer icon_hover"
                      icon="fab fa-github"
                      color="secondary"
                      size="4"
                    />
                  </a>
                )}
                {item.web && (
                  <a href={item.web} target="_blank" rel="noreferrer">
                    <Icon
                      className="pointer icon_hover"
                      icon="far fa-globe"
                      color="secondary"
                      size="4"
                    />
                  </a>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Team;
