import moment from "moment";
import React from "react";
import { Badge, Button, Col, Modal, Row } from "react-bootstrap";


function SponsorModal(props) {
  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter ">
            Want to sponsor {props?.data?.title}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={5}>
              <img src="/sponsor.svg" alt="" width="100%" />
            </Col>
            <Col xs={7}>
              <h3>Contact Project Owner</h3>
              <div>
                <p className="fw-normal mb-1 fs-5">
                  Project Owner:{" "}
                  <span className="fw-light">{props?.data?.user.name}</span>
                </p>
                <p className="fw-normal mb-1  fs-5">
                  Email Address:{" "}
                  <span className="fw-light">{props?.data?.user.email}</span>
                </p>
                <p className="fw-normal mb-1  fs-5">
                  Project Category:{" "}
                  <Badge bg="primary">{props?.data?.category}</Badge>
                </p>
                <p className="fw-normal mb-1  fs-5">
                  Created At:{" "}
                  <span className="fw-light">
                    {moment(props?.data?.createdAt).format("LLL")}
                  </span>
                </p>
                <p className="fw-normal mb-1  fs-5">
                  Sponsor Amount:{" "}
                  <span className="fw-light">
                    $ {props?.data?.donationAmount}
                  </span>
                </p>
              </div>
              <div className="d-grid mt-2">
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${props?.data?.user?.email}&su=Sponsorshipfor${props?.data?.title}`}>
                  <Button variant="warning">Send Mail</Button>
                </a>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SponsorModal;
