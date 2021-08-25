import React, { useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
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
import ProgressBar from "react-customizable-progressbar";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../components/Icon";

import Loader from "../components/Loader";

import NavBar from "../components/Navbar";
import DonateModal from "../components/DonateModal";
import moment from "moment";
import VolunteerModal from "../components/VolunteerModal";
import { projectById } from "../actions/projectActions";
import { LinkContainer } from "react-router-bootstrap";
import SponsorModal from "../components/SponsorModal";
import Avatar from "react-avatar";

function ProjectScreen({ match }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState(false);
  const [volModalShow, setVolModalShow] = useState(false);
  const [sponsorModalShow, setSponsorModalShow] = useState(false);
  const community = useRef();
  const projectId = match.params.id;
  const { userInfo } = useSelector((state) => state.user);
  const { project, loading } = useSelector((state) => state.projectByIdList);
  const { loading: donationProcessing, donationSuccess } = useSelector(
    (state) => state.donation
  );

  useEffect(() => {
    dispatch(projectById(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    donationSuccess && setModalShow(false);

    donationSuccess &&
      addToast("Donation was Succesful. Thank you for donating.", {
        appearance: "success",
        autoDismiss: true,
      });

    dispatch({ type: "SET_DONATION_FALSE" });
  }, [donationSuccess, addToast, dispatch]);

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
                  <div
                    className={`${
                      project?.videoLink ? "col-11" : "col-12"
                    } mb-2`}
                  >
                    <h2 className="display-6 mb-1 ">{project?.title}</h2>
                    <span className="text-secondary">
                      <Badge bg="success" className="me-2">
                        {project?.category}
                      </Badge>
                      CreatedAt: {moment(project?.createdAt).format("LL")}
                    </span>
                  </div>
                  {project?.videoLink && (
                    <div className="col-1">
                      <a
                        href={project?.videoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon icon="fab fa-youtube" color="danger" size={2} />
                      </a>
                    </div>
                  )}
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
              <ListGroup className="">
                <ListGroup.Item className="p-4">
                  {project?.donationAmount && (
                    <div className="d-flex align-items-center ">
                      <ProgressBar
                        className="fs-8"
                        progress={
                          (project?.donatedAmount / project?.donationAmount) *
                          100
                        }
                        radius={25}
                        strokeWidth={6}
                        trackStrokeWidth={6}
                        strokeColor="#02a95c"
                      >
                        <div className="indicator">
                          <div>
                            {(
                              (project?.donatedAmount /
                                project?.donationAmount) *
                              100
                            )
                              .toString()
                              .split(".")[1]?.length > 2
                              ? (
                                  (project?.donatedAmount /
                                    project?.donationAmount) *
                                  100
                                ).toFixed(2)
                              : (project?.donatedAmount /
                                  project?.donationAmount) *
                                100}
                            %
                          </div>
                        </div>
                      </ProgressBar>
                      <div>
                        <p className="text-secondary mb-0 fw-bold">Raised</p>
                        <p className="mb-0 fs-5 text-muted fw-light">
                          <span className="text-success">
                            $
                            {new Intl.NumberFormat().format(
                              project?.donatedAmount
                            )}
                          </span>{" "}
                          out of $
                          {new Intl.NumberFormat().format(
                            project?.donationAmount
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {userInfo &&
                  userInfo?.id?.toString() !== project?.user._id?.toString() ? (
                    <div className="d-grid gap-2">
                      {project?.openedFor.includes("donate") &&
                      project?.donatedAmount < project?.donationAmount ? (
                        <Button
                          variant="success"
                          size="lg"
                          className="align-middle"
                          onClick={() => setModalShow(true)}
                        >
                          <Icon
                            icon="fas fa-hand-holding-usd"
                            size="5"
                            color="white"
                          />
                          Donate Now
                        </Button>
                      ) : (
                        project?.donationAmount && (
                          <Alert variant="success">
                            Thanks to all who have donated so far. The required
                            money has been collected.
                          </Alert>
                        )
                      )}
                      {project?.openedFor.includes("sponsor") && (
                        <Button
                          variant="warning"
                          size="lg"
                          className="align-middle"
                          onClick={() => setSponsorModalShow(true)}
                        >
                          <Icon
                            icon="fas fa-handshake-alt"
                            size="5"
                            color="dark"
                          />
                          Sponsor the Project
                        </Button>
                      )}
                      {project?.openedFor.includes("volunteer") &&
                      project?.volunteerList?.volunteers?.filter(
                        (a) =>
                          a?.user?._id?.toString() === userInfo?.id?.toString()
                      ).length === 0 ? (
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => setVolModalShow(true)}
                        >
                          <Icon
                            icon="fas fa-person-sign"
                            size="5"
                            color="white"
                          />
                          Be the Volunteer
                        </Button>
                      ) : (
                        project?.openedFor.includes("volunteer") && (
                          <a
                            href={project?.volunteerCommunityLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="d-grid" ref={community}>
                              <Button variant="primary" size="lg">
                                <Icon
                                  icon="fas fa-person-sign"
                                  size="5"
                                  color="white"
                                />
                                Join Community Group
                              </Button>
                            </div>
                          </a>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="d-grid gap-2">
                      <LinkContainer
                        to={`/projects/${userInfo?.id}?project=${project?._id}#donation_list `}
                      >
                        <Button
                          variant="success"
                          size="lg"
                          className="align-middle"
                        >
                          <Icon
                            icon="fas fa-hand-holding-usd"
                            size="5"
                            color="white"
                          />
                          LatestDonations
                        </Button>
                      </LinkContainer>

                      <LinkContainer
                        to={`/projects/${userInfo?.id}?project=${project?._id}#donation_list`}
                      >
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => setVolModalShow(true)}
                        >
                          <Icon
                            icon="fas fa-person-sign"
                            size="5"
                            color="white"
                          />
                          Volunteer Lists
                        </Button>
                      </LinkContainer>
                    </div>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
        <DonateModal
          show={modalShow}
          id={projectId}
          onHide={() => setModalShow(false)}
          data={project}
        />
        <VolunteerModal
          show={volModalShow}
          id={projectId}
          onHide={() => setVolModalShow(false)}
          data={project}
          community={community}
        />
        <SponsorModal
          show={sponsorModalShow}
          id={projectId}
          onHide={() => setSponsorModalShow(false)}
          data={project}
          community={community}
        />
      </Container>
    </>
  );
}

export default ProjectScreen;
