
import React from "react";

import { Button, Container, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

function VideoModal(props) {
  const {userInfo} = useSelector(state => state.user)

  return (
    <div>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter"     size="lg" >
          
        <Modal.Header  closeButton>
            <div className="d-flex justify-content-between" style={{width: "100%"}}>

          <Modal.Title id="contained-modal-title-vcenter">
            ABOUT US | CIVIS
          </Modal.Title>
          <LinkContainer to={userInfo ? '/create/project' : '/login'}>

          <Button variant='success'>Start Project</Button>
          </LinkContainer>
            </div>
        </Modal.Header>
        <Modal.Body className='modal_view '>
        <iframe width="100%" height='100%' src="https://www.youtube.com/embed/ByIZIKFmHOA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoModal;
