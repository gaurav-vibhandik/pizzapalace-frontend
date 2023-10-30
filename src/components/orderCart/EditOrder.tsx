import React, { useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import Order from "../interfaces/orderInterface";
import styles from "../orderDisplay/CardOrderLine.module.css";
import ModalEditOrderCart_EditOrderLine from "./ModalEditOrderCart_EditOrderLine";
import { reducerFunctionForEditOrder_EditOrderLines } from "./reducerFunctions";
import OrderLine from "../interfaces/orderLineInterface";
type PropsOrder = {
  order: Order;
};

const EditOrder = (props: PropsOrder) => {
  const curOrder = props.order;
  const [orderLineState, dispatchToOrderLineState] = useReducer(
    reducerFunctionForEditOrder_EditOrderLines,
    {
      orderLines: curOrder.orderLines,
    }
  );

  const handleBtnAddQuantity = (orderLineId: string) => {
    dispatchToOrderLineState({ type: "ADD", item: orderLineId });
  };

  const handleBtnRemoveQuantity = (
    orderLineId: string,
    curQuantity: number
  ) => {
    //NOTE : This method will take two paramters : olID,curQty
    //If curQty is not one , simply decrease qty by one
    dispatchToOrderLineState({ type: "DECREASE", item: orderLineId });
    //If curQty is 1 , then delete OL entry
    if (curQuantity == 1) {
      dispatchToOrderLineState({ type: "DELETE_ORDERLINE", item: orderLineId });
    }
  };

  const handleEditOrderLine = (curOl: OrderLine, newOl: OrderLine) => {
    dispatchToOrderLineState({
      type: "EDIT",
      item: { curOl: curOl, newOl: newOl },
    });
  };

  const handleCancelEditOrder = () => {
    dispatchToOrderLineState({
      type: "RESET_ORDERLINE",
      item: curOrder.orderLines,
    });
  };

  const handleSaveChanges = (
    newOrderData: Order,
    updatedOrderLineList: OrderLine[]
  ) => {
    //upon clicking on "SAVE CHANGES" , collect form data in EditModal for change in DeliveryAddress and
    //collect updatedorderLineList
    //Pass these two params from ModalEditOrderCart_EditOrderLine
  };

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
            {orderLineState.orderLines.map((ol) => (
              <li
                className={styles.cardOrderLine}
                key={`${ol.orderLineId}_` + Math.random()}
              >
                <ModalEditOrderCart_EditOrderLine
                  ol={ol}
                  onBtnAddQuantity={handleBtnAddQuantity}
                  onBtnRemoveQuantity={handleBtnRemoveQuantity}
                  onBtnEditOrderLine={handleEditOrderLine}
                  onBtnCancelEditOrder={handleCancelEditOrder}
                  onBtnSaveChanges={handleSaveChanges}
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
