import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import styles from "./orderCart.module.css";
import Order from "../interfaces/orderInterface";
import OrderLine from "../interfaces/orderLineInterface";
import { Accordion, Button, Col, Modal, Row, Table } from "react-bootstrap";
import CardOrderLine from "../orderDisplay/CardOrderLine";
import InitDataContext from "../../context/InitDataContext";
import ModalWrapper from "./ModalWrapper";
import EditOrder from "./EditOrder";
import TableForOrderLine from "./TableOfOrderLine";
import { reducerFunctionForEditOrder_EditOrderLines } from "./reducerFunctions";

const OrderCart = () => {
  const [customerOrderData, setCustomerOrderData] = useState<{
    loading: boolean;
    orders: Order[];
  }>({
    loading: true,
    orders: [],
  });

  const initData = useContext(InitDataContext);
  const { pizzaMap, toppingMap } = initData;

  //========> remaining :NOTE :must disable edit button after 15min of orderPlaced
  const [editOrder, setEditOrder] = useState(true);

  //<===============================

  //=========> Declaring Reducer to handle Order n OrderLine changes
  const [orderState, dispatchToOrderState] = useReducer(
    reducerFunctionForEditOrder_EditOrderLines,
    {
      orderList: [] as Order[],
    }
  );
  const handleBtnAddQuantity = (orderId: string, orderLineId: string) => {
    dispatchToOrderState({
      type: "ADD",
      item: { orderId, orderLineId },
    });
  };

  const handleBtnRemoveQuantity = (
    orderId: string,
    orderLineId: string,
    curQuantity: number
  ) => {
    //NOTE : This method will take two paramters : olID,curQty
    //If curQty is not one , simply decrease qty by one
    dispatchToOrderState({ type: "DECREASE", item: { orderId, orderLineId } });
    //If curQty is 1 , then delete OL entry
    if (curQuantity == 1) {
      dispatchToOrderState({
        type: "DELETE_ORDERLINE",
        item: { orderId, orderLineId },
      });
    }
  };

  const handleEditOrderLine = (
    orderId: string,
    curOl: OrderLine,
    newOl: OrderLine
  ) => {
    dispatchToOrderState({
      type: "EDIT",
      item: { orderId: orderId, curOl: curOl, newOl: newOl },
    });
  };

  const handleCancelEditOrder = (orderId: string) => {
    const curOrderIndex = customerOrderData.orders.findIndex(
      (o) => o.orderId === orderId
    );
    const originalOrderLineListForCurOrder =
      customerOrderData.orders[curOrderIndex].orderLines;
    dispatchToOrderState({
      type: "RESET_ORDERLINE",
      item: {
        orderId: orderId,
        orderLineList: originalOrderLineListForCurOrder,
      },
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

  //<==================================

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        //NOTE : Following customerId must be replaced from saved cookie after signIn
        const resp = await axios.get(
          "http://localhost:8080/api/v1/orders/customer/CUS003"
        );
        console.log("===============>Fetched data :\n");
        console.log(resp.data.data.list);

        setCustomerOrderData({
          loading: false,
          orders: [...resp.data.data.list],
        });

        dispatchToOrderState({
          type: "POPULATE_ORDERSTATE",
          item: resp.data.data.list,
        });
      } catch (error) {
        console.log("====>Error in OrderCart :\n" + error);
      }
    };
    loadOrderData();
  }, []);

  if (customerOrderData.loading) {
    return (
      <React.Fragment>
        <div className={styles.orderCart}>
          <div
            className={`text-align-center ${styles.orderCartDisplayCustomerDetails}`}
          >
            <h1>Loading your CART details</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {/* {customerOrderData.orders.map((o) => (
        <p>{o.orderId}</p>
      ))} */}
      <div className={styles.orderCart}>
        <div className={styles.orderCartDisplayCustomerDetails}>
          <h2>Welcome Customer :"CUS003"</h2>
        </div>
        <div className={styles.orderCartDisplayOrdersBlock}>
          <Accordion className="">
            {orderState.orderList.map((o) => (
              <div>
                <Accordion.Item eventKey={o.orderId!}>
                  <Accordion.Header>
                    <Row className="w-100 d-flex justify-justify-content-end ">
                      <Col>Order No : {o.orderId}</Col>
                      <Col className="me-4 ">
                        Order Amount = Rs.{o.totalAmount}/-
                      </Col>
                      <Col className="me-4 ">Status : {o.status}</Col>
                    </Row>
                  </Accordion.Header>
                  <Accordion.Body className={styles.accordianBodyDisplay}>
                    <div>
                      <Row>
                        <Col>{`CustomerId = ${o.customerId}`}</Col>
                        <Col>{`Order_Status = ${o.status}`}</Col>
                        <Col>{`Order Placed On = ${o.orderDateTime}`}</Col>
                        <Col>
                          {`Total Order Amount = Rs.`}
                          <span className={styles.orderPrice1}>
                            {o.totalAmount}
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <TableForOrderLine
                      orderLines={o.orderLines}
                      pizzaMap={pizzaMap}
                      toppingMap={toppingMap}
                    />
                    <div className="editOrderModal">
                      <ModalWrapper
                        curOrder={o}
                        onBtnCancelEditOrder={handleCancelEditOrder}
                        onBtnSaveChanges={handleSaveChanges}
                      >
                        <EditOrder
                          curOrder={o}
                          onBtnAddQuantity={handleBtnAddQuantity}
                          onBtnRemoveQuantity={handleBtnRemoveQuantity}
                          onBtnEditOrderLine={handleEditOrderLine}
                        />
                      </ModalWrapper>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderCart;
