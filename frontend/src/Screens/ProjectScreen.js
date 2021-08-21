import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  CardGroup,
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
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";

import Loader from "../components/Loader";

import NavBar from "../components/Navbar";
import DonateModal from "../components/DonateModal";
import moment from "moment";

function ProjectScreen({ match }) {
  const dispatch = useDispatch()
  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState(false);
  const projectId = match.params.id;
  const { projectList, loading } = useSelector((state) => state.projects);
  const { loading: donationProcessing, donationSuccess } = useSelector(
    (state) => state.donation
  );

 
  const filteredProject = projectList?.filter(
    (p) => p._id.toString() === projectId.toString()
  )[0];

  useEffect(() => {
    donationSuccess && setModalShow(false);
   
    donationSuccess &&
      addToast("Donation was Succesful. Thank you for donating.", {
        appearance: "success",
        autoDismiss: true,
      });

      dispatch({ type: "SET_DONATION_FALSE", });
      
  }, [donationSuccess, addToast,dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <Container >
        <div className='py-5 mt-5' >
        <Row xs={1} md={2} className="g-4">
          <Col md={8}>
            <Card>
              <div className="px-4 py-2 d-flex align-items-center justify-content-between">
                <div>
                  <Card.Title className="display-6 mb-0">
                    {filteredProject?.title}
                  </Card.Title>
                  <span className="text-secondary">
                    <Badge bg="success" className="me-2">
                      {filteredProject?.category}
                    </Badge>
                    CreatedAt: {moment(filteredProject?.createdAt).format("LL")}
                  </span>
                </div>
                <Icon icon="fab fa-youtube" color="danger" size={2} />
              </div>
              <Card.Img
                src={filteredProject?.imageLink}
                alt=""
      
              />
              <Card.Body>
                <p>{filteredProject?.description}</p>
                <div className="d-flex align-items-center">
                  <Avatar source={filteredProject?.user.avatar} size={3} />
                  <div className="ms-2">
                    <p className="mb-0  fs-6 fw-normal text-secondary" sty>
                      Created By
                    </p>
                    <p className="mb-0 fw-light fs-5 ">
                      {filteredProject?.user?.name}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <ListGroup className="">
              <ListGroup.Item className="p-4">
              
                {filteredProject?.donationAmount && (
                  <div className="d-flex align-items-center ">
                    <ProgressBar
                      className="fs-8"
                      progress={
                        (((filteredProject?.donatedAmount /
                            filteredProject?.donationAmount) *
                          100))
                      }
                      radius={25}
                      strokeWidth={6}
                      trackStrokeWidth={6}
                      strokeColor="#02a95c"
                    >
                      <div className="indicator">
                        <div>
                       
                          {((filteredProject?.donatedAmount /
                            filteredProject?.donationAmount) *
                            100).toString().split('.')[1]?.length > 2 ? ((filteredProject?.donatedAmount /
                              filteredProject?.donationAmount) *
                            100).toFixed(2): ((filteredProject?.donatedAmount /
                              filteredProject?.donationAmount) *
                            100)}
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
                            filteredProject?.donatedAmount
                          )}
                        </span>{" "}
                        out of $
                        {new Intl.NumberFormat().format(
                          filteredProject?.donationAmount
                        )}
                      </p>
                    </div>
                  </div>
                )}
                <div className="d-grid gap-2">
                  {filteredProject?.openedFor.includes("donate") &&
                  filteredProject?.donatedAmount <
                    filteredProject?.donationAmount ? (
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
                    <Alert variant="success">
                      Thanks to all who have donated so far. The required money
                      has been collected.
                    </Alert>
                  )}
                  {filteredProject?.openedFor.includes("sponsor") && (
                    <Button
                      variant="warning"
                      size="lg"
                      className="align-middle"
                    >
                      <Icon icon="fas fa-handshake-alt" size="5" color="dark" />
                      Sponsor the Project
                    </Button>
                  )}
                  {filteredProject?.openedFor.includes("volunteer") && (
                    <Button variant="primary" size="lg">
                      <Icon icon="fas fa-person-sign" size="5" color="white" />
                      Be the Volunteer
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </div>
        <DonateModal
          show={modalShow}
          id={projectId}
          onHide={() => setModalShow(false)}
          data={filteredProject}
        />
      </Container>
    </>
  );
}

export default ProjectScreen;
