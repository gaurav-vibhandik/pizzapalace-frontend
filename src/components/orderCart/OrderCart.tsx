import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
import { useNavigate } from "react-router-dom";

const OrderCart = () => {
  const [customerOrderData, setCustomerOrderData] = useState<{
    loading: boolean;
    orders: Order[];
  }>({
    loading: true,
    orders: [],
  });

  const navigate = useNavigate();
  const ref_editOrderModalClose = useRef<HTMLButtonElement>(null);
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

    console.log(
      "In customerOrderData.orders[0].orderId= " +
        customerOrderData.orders[0].orderId
    );
    console.log(
      "In customerOrderData.orders[0].orderLines[0].orderLineId= " +
        customerOrderData.orders[0].orderLines[0].orderLineId
    );
    console.log(
      "In customerOrderData.orders[0].orderLines[0].quantity= " +
        customerOrderData.orders[0].orderLines[0].quantity
    );
  };

  const handleBtnRemoveQuantity = (
    orderId: string,
    orderLineId: string,
    curQuantity: number
  ) => {
    //If curQty is 1 , then delete OL entry
    if (curQuantity === 1) {
      console.log(
        "here in dispatcher handleBtnRemoveQuantity:Deleting OrderLine: "
      );
      console.log(orderId + "  " + orderLineId);

      dispatchToOrderState({
        type: "DELETE_ORDERLINE",
        item: { orderId, orderLineId },
      });
    } else {
      //If curQty is not one , simply decrease qty by one
      dispatchToOrderState({
        type: "DECREASE",
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

  const handleCancelEditOrder = (resetOrderId: string) => {
    console.log("Inside reset handler");

    const curOrderIndex = customerOrderData.orders.findIndex(
      (o) => o.orderId === resetOrderId
    );
    const originalOrder = customerOrderData.orders[curOrderIndex];
    console.log(
      "originalOrder ol.quantity: " + originalOrder.orderLines[0].quantity
    );

    dispatchToOrderState({
      type: "RESET_ORDER",
      item: {
        orderId: resetOrderId,
        order: originalOrder,
      },
    });
  };

  const handleUpdateOrder = (newOrder: Order) => {
    //hit backend for updating Order .If success update entry in reducer state also
    axios
      .put("http://localhost:8080/api/v1/orders/" + newOrder.orderId, newOrder)
      .then((resp) => {
        if (resp.data.success) {
          //if backend orderData has been updated , reflect same in given orderState
          dispatchToOrderState({ type: "UPDATE_ORDER", item: newOrder });
          console.log("resp succes:state updated");
          ref_editOrderModalClose.current!.click();
        }
      })
      .catch((error) => {
        console.log("Failed to update order details :" + error.data.message);
        //reset changes done current orderState
        handleCancelEditOrder(newOrder.orderId!);
      });
  };

  const handleDeleteOrder = (orderId: string) => {
    //hit backend for deleting Order .If success remove entry from reducer state also
    axios
      .delete("http://localhost:8080/api/v1/orders/" + orderId)
      .then((resp) => {
        //console.log(resp);

        if (resp.status == 204) {
          //if backend orderData has been deleted , reflect same in given orderState
          dispatchToOrderState({ type: "DELETE_ORDER", item: orderId });
          console.log("resp succes:state deleted: " + orderId);
        }
      })
      .catch((error) => {
        console.log("Failed to delete orderId :" + orderId);
        //reset changes done current orderState
        handleCancelEditOrder(orderId!);
      });
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

        const fetchedOrderListForState: Order[] = [...resp.data.data.list];

        setCustomerOrderData({
          loading: false,
          orders: fetchedOrderListForState,
        });
        const fetchedOrderListForReducer: Order[] = [...resp.data.data.list];
        dispatchToOrderState({
          type: "POPULATE_ORDERSTATE",
          item: fetchedOrderListForReducer,
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
              <div key={"orderCart_" + o.orderId}>
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
                    <div
                      className="editOrderModal"
                      key={"orderCart_ModalWrapper_" + o.orderId}
                    >
                      <ModalWrapper
                        curOrder={o}
                        refModalWrapperClose={ref_editOrderModalClose}
                        onBtnCancelEditOrder={handleCancelEditOrder}
                        onBtnDeleteOrder={handleDeleteOrder}
                      >
                        <EditOrder
                          key={"orderCart_ModalWrapper_EditOrder_" + o.orderId}
                          orderList={orderState.orderList}
                          curOrderId={o.orderId!}
                          onBtnAddQuantity={handleBtnAddQuantity}
                          onBtnRemoveQuantity={handleBtnRemoveQuantity}
                          onBtnEditOrderLine={handleEditOrderLine}
                          onBtnDeleteOrder={handleDeleteOrder}
                          onBtnUpdateOrder={handleUpdateOrder}
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
