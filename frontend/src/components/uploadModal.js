import React from "react";

import { Button, Container, Modal, Spinner } from "react-bootstrap";

function UploadModal(props) {
  return (
    <div>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Project Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          {props.loading}
          {props.loading ? (
            <div className="my-5 d-flex flex-column  align-items-cente">
              <Spinner
                className="align-self-center"
                animation="border"
                variant="success"
              />
              <p className="text-success mt-2">Uploading Your Image</p>
            </div>
          ) : (
            <div>
              <img src={props.image} alt="hello" style={{ width: "100%" }} />
              <div className="d-grid mt-3">
                <Button variant="success" onClick={props.onHide}>
                  Done
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UploadModal;
