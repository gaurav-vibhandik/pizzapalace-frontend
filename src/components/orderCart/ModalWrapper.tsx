import React, { RefObject, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Order from "../interfaces/orderInterface";

type curProps = {
  children: any;
  curOrder: Order;
  refModalWrapperClose: any;
  onBtnCancelEditOrder: (orderId: string) => void;
  onBtnDeleteOrder: (orderId: string) => void;
};

const ModalWrapper = (props: curProps) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const refHandleModalClose = props.refModalWrapperClose;
  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>
        Edit My Order
      </Button>
      <Button
        variant="danger"
        onClick={() => props.onBtnDeleteOrder(props.curOrder.orderId!)}
        style={{ marginLeft: "1rem" }}
      >
        Delete Order
      </Button>

      <Modal show={show} backdrop="static">
        <Modal.Header>
          <Modal.Title>Edit OrderNo : {}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              props.onBtnCancelEditOrder(props.curOrder.orderId!);
              handleClose();
            }}
          >
            Cancel
          </Button>

          <Button
            ref={refHandleModalClose}
            className="d-none"
            variant="success"
            onClick={() => {
              handleClose();
            }}
          >
            Handle Close Modal By EditOrder
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWrapper;
