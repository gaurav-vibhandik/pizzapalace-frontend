import React from "react";
import { Col, Row } from "react-bootstrap";
import Order from "../interfaces/orderInterface";
import styles from "../orderDisplay/CardOrderLine.module.css";
import CardOrderLine from "../orderDisplay/CardOrderLine";
type PropsOrder = {
  order: Order;
};

const EditOrder = (props: PropsOrder) => {
  const curOrder = props.order;
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
            {curOrder.orderLines.map((ol) => (
              <li
                className={styles.cardOrderLine}
                key={`${ol.orderLineId}_` + Math.random()}
              >
                <CardOrderLine ol={ol} />
              </li>
            ))}
          </ul>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default EditOrder;
