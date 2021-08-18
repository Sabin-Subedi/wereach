import React, { useEffect } from "react";
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProjects } from "../actions/projectActions";
import CardBox from "../components/CardBox";
import NavBar from "../components/Navbar";

function HomeScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { projectList } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  return (
    <>
      <NavBar />
      <Container>
        <Row xs={1} md={3} className="g-4">
          {projectList.map((project) => (
            <Col>
              <CardBox data={project} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeScreen;
