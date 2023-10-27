import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import OrderCart from "../orderCart/OrderCart";

const ModalWrapper = (props: any) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>
        Edit My Order
      </Button>
      <Button variant="danger">Delete Order</Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit OrderNo : {}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWrapper;
