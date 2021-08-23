import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import useAddVolunteer from "../hooks/useAddVolunteer";

function VolunteerModal(props) {
  const { addVolunteer, loading, message, error, success } = useAddVolunteer();
  const { addToast } = useToasts();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    token && addVolunteer(props.data?._id, token);
    window.open(props?.data?.volunteerCommunityLin, "_blank");
    props.onHide();
    message &&
      addToast(message, {
        appearance: "success",
        autoDismiss: true,
      });
  };

  useEffect(() => {
    error &&
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
  }, [message, addToast, error]);

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter ">
            Are you sure you want to be a volunteer for this project?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="/volunteer.svg" alt="" width="100%" />
        </Modal.Body>
        <Modal.Footer>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <Button
              style={{ width: "49%" }}
              variant="danger"
              onClick={props.onHide}
            >
              Cancel
            </Button>
            <Button
              style={{ width: "49%" }}
              variant="success"
              onClick={handleClick}
            >
              Confirm
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VolunteerModal;
