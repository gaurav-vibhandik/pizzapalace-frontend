import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Order from "../interfaces/orderInterface";
import OrderLine from "../interfaces/orderLineInterface";

type curProps = {
  children: any;
  curOrder: Order;
  onBtnCancelEditOrder: (orderId: string) => void;
  onBtnSaveChanges: (
    newOrderData: Order,
    updatedOrderLineList: OrderLine[]
  ) => void;
};

const ModalWrapper = (props: curProps) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>
        Edit My Order
      </Button>
      <Button variant="danger">Delete Order</Button>

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
          <Button variant="success" onClick={() => {}}>
            Update Order
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWrapper;
