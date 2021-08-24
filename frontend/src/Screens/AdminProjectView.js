import React, { useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  ListGroup,
  Badge,
  Alert,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import NavBar from "../components/Navbar";
import moment from "moment";
import { projectById } from "../actions/projectActions";
import Avatar from "react-avatar";
import useVerifyProject from "../hooks/useVerifyProject";
import { useHistory } from "react-router-dom";

function AdminProjectView({ match }) {
  const dispatch = useDispatch();

  const { verifyProject } = useVerifyProject();
  const history = useHistory();
  const projectId = match.params.id;
  const { userInfo } = useSelector((state) => state.user);
  const { project, loading } = useSelector((state) => state.projectByIdList);

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    dispatch(projectById(projectId));
  }, [dispatch, projectId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <Container>
        <div className="py-5 mt-5">
          <Row xs={1} md={2} className="g-4">
            <Col md={8}>
              <Card>
                <div className="px-4 py-2 row align-items-center">
                  <div className="col-11 mb-2">
                    <h2 className="display-6 mb-1 ">{project?.title}</h2>
                    <span className="text-secondary">
                      <Badge bg="success" className="me-2">
                        {project?.category}
                      </Badge>
                      CreatedAt: {moment(project?.createdAt).format("LL")}
                    </span>
                  </div>
                  <div className="col-1">
                    <a
                      href={project?.videoLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon icon="fab fa-youtube" color="danger" size={2} />
                    </a>
                  </div>
                </div>
                <Card.Img src={project?.imageLink} alt="" />
                <Card.Body>
                  <p>{project?.description}</p>
                  <div className="d-flex align-items-center">
                    <Avatar
                      className="d-none d-lg-inline-block"
                      name={project?.user.name}
                      round
                      size="40"
                      textSizeRatio={2}
                    />

                    <div className="ms-2">
                      <p className="mb-0  fs-6 fw-normal text-secondary" sty>
                        Created By
                      </p>
                      <p className="mb-0 fw-light fs-5 ">
                        {project?.user?.name}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item className="p-4">
                  <h4 className="text-center text-primary mb-3">
                    Project Details
                  </h4>
                  <div className="mb-4">
                    <p className="fw-normal mb-1 fs-6">
                      Project Owner:
                      <span className="fw-bold text-success">
                        {" "}
                        {project?.user?.name}
                      </span>
                    </p>
                    <p className="fw-normal mb-1 fs-6">
                      Email Address:
                      <span className="fw-bold text-success">
                        {" "}
                        {project?.user?.email}
                      </span>
                    </p>
                    <p className="fw-normal mb-1 fs-6">
                      Project Category:
                      <span className="fw-bold text-success">
                        {" "}
                        {project?.category}
                      </span>
                    </p>
                    {project?.donationAmount && (
                      <p className="fw-normal mb-1 fs-6">
                        Amount Needed:{" "}
                        <span className="fw-bold text-success">
                          ${project?.donationAmount}
                        </span>
                      </p>
                    )}
                    {project?.volunteerNumber && (
                      <p className="fw-normal mb-1 fs-6">
                        Volunteers Needed:{" "}
                        <span className="fw-bold text-success">
                          {project?.volunteerNumber}
                        </span>
                      </p>
                    )}

                    {project?.openedFor?.length > 0 && (
                      <p className="fw-normal mb-1 fs-6">
                        OpenedFor:{" "}
                        <Badge className="me-2" bg="success">
                          {project?.openedFor[0]}
                        </Badge>
                        <Badge className="me-2" bg="warning">
                          {project?.openedFor[1]}
                        </Badge>
                        <Badge className="me-2" bg="primary">
                          {project?.openedFor[2]}
                        </Badge>
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    {project?.videoLink && (
                      <a
                        className="link"
                        href={project?.videoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="d-grid ">
                          <Button variant="warning">
                            {" "}
                            <Icon icon="fad fa-video" size="5" color="dark" />
                            Watch Video
                          </Button>
                        </div>
                      </a>
                    )}
                  </div>
                  <div className="mt-2">
                    {project?.volunteerCommunityLink && (
                      <a
                        className="link"
                        href={project?.volunteerCommunityLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="d-grid ">
                          <Button variant="primary">
                            {" "}
                            <Icon
                              icon="fad fa-person-sign"
                              size="5"
                              color="white"
                            />
                            Community Link
                          </Button>
                        </div>
                      </a>
                    )}
                  </div>
                </ListGroup.Item>
                {userInfo?.isAdmin && (
                  <ListGroup.Item className="p-4">
                    <h4 className="text-center text-primary mb-3">
                      Project Actions
                    </h4>
                    {project?.isVerified && (
                      <Alert variant="success">
                        This project has already been verified.
                      </Alert>
                    )}
                    <div className="d-grid gap-2">
                      {!project?.isVerified && (
                        <Button
                          variant="success"
                          onClick={() => verifyProject(projectId)}
                        >
                          {" "}
                          <Icon
                            icon="fad fa-badge-check"
                            size="5"
                            color="white"
                          />
                          Verify Project
                        </Button>
                      )}
                      <Button variant="danger">
                        {" "}
                        <Icon
                          icon="fad fa-times-circle"
                          size="5"
                          color="white"
                        />
                        Delete Project
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default AdminProjectView;
