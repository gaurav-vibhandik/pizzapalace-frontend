import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "./orderCart.module.css";
import Order from "../interfaces/orderInterface";
import OrderLine from "../interfaces/orderLineInterface";
import { Accordion, Button, Col, Modal, Row, Table } from "react-bootstrap";
import CardOrderLine from "../orderDisplay/CardOrderLine";
import InitDataContext from "../../context/InitDataContext";

const OrderCart = () => {
  const [customerOrderData, setCustomerOrderData] = useState<{
    loading: boolean;
    orders: Order[];
  }>({
    loading: true,
    orders: [] as Order[],
  });

  const initData = useContext(InitDataContext);
  const { pizzaMap, crustMap, toppingMap } = initData;

  //remaining :NOTE :must disable edit button after 15min of orderPlaced
  const [editOrder, setEditOrder] = useState(true);

  //=====>Handling editOrderModal==============

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //<===============================

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        //NOTE : Following customerId must be replaced from saved cookie after signIn
        const resp = await axios.get(
          "http://localhost:8080/api/v1/orders/customer/CUS003"
        );
        setCustomerOrderData({
          orders: resp.data.data.list,
          loading: false,
        });
      } catch (error) {
        console.log("====>Error in OrderCart :\n" + error);
      }
    };
    loadOrderData();
  });

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
      <div className={styles.orderCart}>
        <div className={styles.orderCartDisplayCustomerDetails}>
          <h2>Welcome Customer :"CUS003"</h2>
        </div>
        <div className={styles.orderCartDisplayOrdersBlock}>
          <Accordion className="">
            {customerOrderData.orders.map((o) => (
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
                        <Col>
                          <Row>
                            <Col>
                              <Button type="button" variant="success">
                                Edit Order
                              </Button>
                            </Col>
                            <Col>
                              <Button type="button" variant="danger">
                                Delete Order
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                    <div className={`${styles.olTable}`}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th className={styles.olTableHeading}>
                              OrderlineId
                            </th>
                            <th className={styles.olTableName}>PizzaName</th>
                            <th className={styles.olTableSize}>Size</th>
                            <th className={styles.olTableQuantity}>Quantity</th>
                            <th className={styles.olTablePrice}>Total Price</th>
                            <th className={styles.olTableDescription}>
                              Description
                            </th>
                            <th className={styles.olTableExtraCheese}>
                              Extra Cheese
                            </th>
                            <th className={styles.olTableTopping}>Toppings</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.orderLines.map((ol) => (
                            <tr>
                              <td>{ol.orderLineId}</td>
                              <td>{pizzaMap.get(ol.pizzaId)!.name}</td>
                              <td>{ol.size}</td>
                              <td>{ol.quantity}</td>
                              <td>{ol.totalPrice}</td>
                              <td>{pizzaMap.get(ol.pizzaId)!.description}</td>
                              <td>{ol.extraCheese ? "Yes" : "No"}</td>
                              <td>
                                {ol.toppingList.length > 0
                                  ? ol.toppingList
                                      .map((tpId) => toppingMap.get(tpId)!.name)
                                      .toString()
                                  : "---"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <div className="editOrderModal">
                  <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                  </Button>

                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you are reading this text in a modal of
                      {o.orderId}...
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderCart;

// Status : working displays orderLines in form of cards in ORDER DISPLAY CART
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import styles from "./orderCart.module.css";
// import Order from "../interfaces/orderInterface";
// import OrderLine from "../interfaces/orderLineInterface";
// import { Accordion, Button, Col, Row } from "react-bootstrap";
// import CardOrderLine from "../orderDisplay/CardOrderLine";

// const OrderCart = () => {
//   const [customerOrderData, setCustomerOrderData] = useState<{
//     loading: boolean;
//     orders: Order[];
//   }>({
//     loading: true,
//     orders: [] as Order[],
//   });

//   //remaining :NOTE :must disable edit button after 15min of orderPlaced
//   const [editOrder, setEditOrder] = useState(true);

//   useEffect(() => {
//     const loadOrderData = async () => {
//       try {
//         //NOTE : Following customerId must be replaced from saved cookie after signIn
//         const resp = await axios.get(
//           "http://localhost:8080/api/v1/orders/customer/CUS003"
//         );
//         setCustomerOrderData({
//           orders: resp.data.data.list,
//           loading: false,
//         });
//       } catch (error) {
//         console.log("====>Error in OrderCart :\n" + error);
//       }
//     };
//     loadOrderData();
//   });

//   if (customerOrderData.loading) {
//     return (
//       <React.Fragment>
//         <div className={styles.orderCart}>
//           <div
//             className={`text-align-center ${styles.orderCartDisplayCustomerDetails}`}
//           >
//             <h1>Loading your CART details</h1>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }

//   return (
//     <React.Fragment>
//       <div className={styles.orderCart}>
//         <div className={styles.orderCartDisplayCustomerDetails}>
//           <h2>Welcome Customer :"CUS---"</h2>
//         </div>
//         <div className={styles.orderCartDisplayOrdersBlock}>
//           <Accordion className="">
//             {customerOrderData.orders.map((o) => (
//               <Accordion.Item eventKey={o.orderId!}>
//                 <Accordion.Header>
//                   {`Order No : ${o.orderId} Status=${o.status}`}
//                 </Accordion.Header>
//                 <Accordion.Body className={styles.accordianBodyDisplay}>
//                   <div>
//                     <Row>
//                       <Col>{`CustomerId = ${o.customerId}`}</Col>
//                       <Col>{`Order_Status = ${o.status}`}</Col>
//                       <Col>{`Order Placed On = ${o.orderDateTime}`}</Col>
//                       <Col>
//                         {`Total Order Amount = Rs.`}
//                         <span className={styles.orderPrice1}>
//                           {o.totalAmount}
//                         </span>
//                       </Col>
//                       <Col>
//                         <Row>
//                           <Col>
//                             <Button type="button" variant="success">
//                               Edit Order
//                             </Button>
//                           </Col>
//                           <Col>
//                             <Button type="button" variant="danger">
//                               Delete Order
//                             </Button>
//                           </Col>
//                         </Row>
//                       </Col>
//                     </Row>

//                     <Row>
//                       OrderLines:
//                       <ul className={styles.cardOrderLineDisplayBox}>
//                         {o.orderLines.map((ol) => (
//                           <li
//                             className={styles.cardOrderLine}
//                             key={ol.orderLineId}
//                           >
//                             <CardOrderLine ol={ol} />
//                           </li>
//                         ))}
//                       </ul>
//                     </Row>
//                   </div>
//                 </Accordion.Body>
//               </Accordion.Item>
//             ))}
//           </Accordion>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default OrderCart;
