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
import { Accordion, Col, Row } from "react-bootstrap";
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

  const ref_editOrderModalClose = useRef<HTMLButtonElement>(null);
  const initData = useContext(InitDataContext);
  const { pizzaMap, crustMap, toppingMap } = initData;

  //=========> Declaring Reducer to handle Order n OrderLine changes
  const [orderStateReducer, dispatchToOrderStateReducer] = useReducer(
    reducerFunctionForEditOrder_EditOrderLines,
    {
      orderList: [] as Order[],
    }
  );
  const handleBtnAddQuantity = (orderId: string, orderLineId: string) => {
    dispatchToOrderStateReducer({
      type: "ADD",
      item: { orderId, orderLineId },
    });
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

      dispatchToOrderStateReducer({
        type: "DELETE_ORDERLINE",
        item: { orderId, orderLineId },
      });
    } else {
      //If curQty is not one , simply decrease qty by one
      dispatchToOrderStateReducer({
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
    dispatchToOrderStateReducer({
      type: "EDIT",
      item: { orderId: orderId, curOl: curOl, newOl: newOl },
    });
  };

  const handleCancelEditOrder = (resetOrderId: string) => {
    const curOrderIndex = customerOrderData.orders.findIndex(
      (o) => o.orderId === resetOrderId
    );
    const originalOrder = customerOrderData.orders[curOrderIndex];
    dispatchToOrderStateReducer({
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
          //if backend orderData has been updated , reflect same in given customerOrderData.orders and
          //  orderStateReducer

          const updatedCustomerOrderDataOrderList = [
            ...customerOrderData.orders,
          ];

          const existingOrderIndex = customerOrderData.orders.findIndex(
            (o) => o.orderId === newOrder.orderId
          );
          updatedCustomerOrderDataOrderList[existingOrderIndex] = newOrder;
          setCustomerOrderData({
            loading: false,
            orders: updatedCustomerOrderDataOrderList,
          });

          dispatchToOrderStateReducer({ type: "UPDATE_ORDER", item: newOrder });
          console.log("resp succes:state updated");
          ref_editOrderModalClose.current!.click();
        }
      })
      .catch((error) => {
        console.log("Failed to update order details :" + error.data.message);
        //reset changes done current orderStateReducer
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
          //if backend orderData has been deleted , reflect same in fetched customerDataOrderList and orderStateReducer

          let updatedCustomerOrderDataOrderList = [...customerOrderData.orders];

          updatedCustomerOrderDataOrderList =
            updatedCustomerOrderDataOrderList.filter(
              (o) => o.orderId !== orderId
            );
          setCustomerOrderData({
            loading: false,
            orders: updatedCustomerOrderDataOrderList,
          });
          dispatchToOrderStateReducer({ type: "DELETE_ORDER", item: orderId });
          console.log("resp succes:state deleted: " + orderId);
        }
      })
      .catch((error) => {
        console.log("Failed to delete orderId :" + orderId);
        //reset changes done current orderStateReducer
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
        console.log("===============>Fetched data in OrderCart :\n");
        console.log(resp.data.data.list);
        //============>check 1 : SHALLOW COPY : note : [...SourceArr] => it returns new array but object within new array still points to original source array objects
        // This approach makes both OrderList for state n reducer to point at same OrderList object==================================>
        const backendOrderList: Order[] = resp.data.data.list;
        backendOrderList.forEach((fetchedOrder) => {
          fetchedOrder.orderLines!.forEach((fetchedOL) => {
            fetchedOL.singlePizzaPrice =
              fetchedOL.totalPrice / fetchedOL.quantity;
          });
        });

        /*//Method 1 : universal deep object copy solution
        const fetchedBackendOrderList = structuredClone(backendOrderList);

        const fetchedOrderListForReducer = structuredClone(backendOrderList);
        */

        //Method 2 : deep copying using "const destArr = JSON.parse(JSON.stringify(srcArr))"
        const fetchedBackendOrderList = JSON.parse(
          JSON.stringify(backendOrderList)
        );

        const fetchedOrderListForReducer = JSON.parse(
          JSON.stringify(backendOrderList)
        );

        /*// Method 3 : using custom deepCopy functions 
        // Following getDeepNestedArrayCopyFrom must be designed to handle nesting of objects in given srcArr item , so its not universal deep copy function
        const fetchedBackendOrderList =
          getDeepNestedArrayCopyFrom(backendOrderList);
        const fetchedOrderListForReducer =
          getDeepNestedArrayCopyFrom(backendOrderList);
          */
        //<====check1==============================================================

        //following data is used for backup of original orderList when we cancels an UpdateOrder
        setCustomerOrderData({
          loading: false,
          orders: fetchedBackendOrderList!,
        });

        //following data is used for local reference(of above data) after page has loaded
        //(ideally its changes should not reflect in above customerOrderData)
        dispatchToOrderStateReducer({
          type: "POPULATE_ORDERSTATE",
          item: fetchedOrderListForReducer!,
        });

        console.log(
          "🚀 ~ file: OrderCart.tsx:221 ~ loadOrderData ~Initial value of fetchedOrderListForReducer:",
          fetchedOrderListForReducer
        );

        /*
        //For Debugging ONLY :
        console.log("======Debugging starts==========>  Ordercart dispatched");
        console.log(
          "==============>Checking deep clone copy of fetchedOListForReducer and fetchedOListForState  "
        );
        fetchedOrderListForReducer[0].orderLines[0].totalPrice = 999999;
        console.log(fetchedBackendOrderList[0].orderLines[0]);
        console.log(fetchedOrderListForReducer[0].orderLines[0]);
        console.log("<====Debugging Ends==================");
        */
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
            {customerOrderData.orders.map((o) => (
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
                      <div>Delivery Address : {o.deliveryAddress}</div>
                    </div>
                    <TableForOrderLine
                      orderLines={o.orderLines}
                      pizzaMap={pizzaMap}
                      crustMap={crustMap}
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
                          orderList={orderStateReducer.orderList}
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
