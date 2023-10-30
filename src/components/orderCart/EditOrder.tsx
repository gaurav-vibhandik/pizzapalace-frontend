import React, { useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import Order from "../interfaces/orderInterface";
import styles from "../orderDisplay/CardOrderLine.module.css";
import ModalEditOrderCart_EditOrderLine from "./ModalEditOrderCart_EditOrderLine";
import { reducerFunctionForEditOrder_EditOrderLines } from "./reducerFunctions";
import OrderLine from "../interfaces/orderLineInterface";

type curProps = {
  curOrder: Order;
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
};

const EditOrder = (props: curProps) => {
  const curOrder = props.curOrder;

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Row>
          <Col>{`CustomerId = ${curOrder.customerId}`}</Col>
          <Col>{`Order_Status = ${curOrder.status}`}</Col>
          <Col>{`Order Placed On = ${curOrder.orderDateTime}`}</Col>
          <Col>
            {`Total Order Amount = Rs.`}
            <span className={styles.orderPrice1}>{curOrder.totalAmount}</span>
          </Col>
        </Row>
        <Row>
          OrderLines:
          <ul className={styles.cardOrderLineDisplayBox}>
            {props.curOrder.orderLines.map((ol) => (
              <li
                className={styles.cardOrderLine}
                key={`${ol.orderLineId}_` + Math.random()}
              >
                <ModalEditOrderCart_EditOrderLine
                  ol={ol}
                  onBtnAddQuantity={(orderId) => props.onBtnAddQuantity()}
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
