import React, { useRef } from "react";
import { Button, Col, FormLabel, Row } from "react-bootstrap";
import Order from "../interfaces/orderInterface";
import styles from "../orderDisplay/CardOrderLine.module.css";
import ModalEditOrderCart_EditOrderLine from "./ModalEditOrderCart_EditOrderLine";
import OrderLine from "../interfaces/orderLineInterface";

type curProps = {
  orderList: Order[];
  curOrderId: string;
  onBtnAddQuantity: (orderId: string, orderLineId: string) => void;
  onBtnRemoveQuantity: (
    orderId: string,
    orderLineId: string,
    curQuantity: number
  ) => void;
  onBtnEditOrderLine: (
    orderId: string,
    curOl: OrderLine,
    newOl: OrderLine
  ) => void;
  onBtnDeleteOrder: (orderId: string) => void;
  onBtnUpdateOrder: (order: Order) => void;
};

const EditOrder = (props: curProps) => {
  const curOrderId = props.curOrderId;

  const curOrder =
    props.orderList[props.orderList.findIndex((o) => o.orderId === curOrderId)];

  // Providing a type annotation for addressRef
  const addressRef = useRef<HTMLTextAreaElement | null>(null);

  const handleUpdateOrder = () => {
    //console.log("textArea= " + addressRef.current!.value);
    const newOrder = {
      ...curOrder,
      deliveryAddress: addressRef.current!.value,
      orderLines: curOrder.orderLines,
    };
    // console.log("Sending details : \n");
    // console.log(newOrder.customerId);
    // console.log(newOrder.orderId);
    // console.log(newOrder.deliveryAddress);
    // console.log(newOrder.totalAmount);
    // console.log(newOrder.status);
    // console.log(newOrder.orderLines.length);

    props.onBtnUpdateOrder(newOrder);
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Row className="d-flex justify-content-end m-1">
          {curOrder.orderLines.length > 0 && (
            <Button
              variant="success"
              onClick={() => {
                handleUpdateOrder();
              }}
              style={{ width: "fit-content" }}
            >
              Update Order
            </Button>
          )}

          {curOrder.orderLines.length == 0 && (
            <Button
              variant="danger"
              onClick={() => {
                props.onBtnDeleteOrder(curOrder.orderId!);
              }}
              style={{ width: "fit-content" }}
            >
              Delete Order
            </Button>
          )}
        </Row>
        <Row>
          <Col>{`CustomerId = ${curOrder.customerId}`}</Col>
          <Col>{`Order_Status = ${curOrder.status}`}</Col>
          <Col>{`Order Placed On = ${curOrder.orderDateTime}`}</Col>
          <Col>
            {`Total Order Amount = Rs.`}
            <span className={styles.orderPrice1}>{curOrder.totalAmount}</span>
          </Col>
        </Row>

        <Row className="mt-1">
          <FormLabel htmlFor="cusAddress">Delivery Address :</FormLabel>
          <textarea ref={addressRef} name="cusAddress">
            {curOrder.deliveryAddress}
          </textarea>
        </Row>
        <Row>
          OrderLines:
          <ul className={styles.cardOrderLineDisplayBox}>
            {curOrder.orderLines.map((ol) => (
              <li
                className={styles.cardOrderLine}
                key={`${ol.orderLineId}_` + Math.random()}
              >
                <ModalEditOrderCart_EditOrderLine
                  ol={ol}
                  onBtnAddQuantity={props.onBtnAddQuantity}
                  onBtnRemoveQuantity={props.onBtnRemoveQuantity}
                  onBtnEditOrderLine={props.onBtnEditOrderLine}
                />
              </li>
            ))}
          </ul>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default EditOrder;
