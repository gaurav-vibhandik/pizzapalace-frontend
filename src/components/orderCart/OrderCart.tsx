import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "./orderCart.module.css";
import Order from "../interfaces/orderInterface";
import OrderLine from "../interfaces/orderLineInterface";
import { Accordion, Button, Col, Row } from "react-bootstrap";
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
          <h2>Welcome Customer :"CUS---"</h2>
        </div>
        <div className={styles.orderCartDisplayOrdersBlock}>
          <Accordion className="">
            {customerOrderData.orders.map((o) => (
              <Accordion.Item eventKey={o.orderId!}>
                <Accordion.Header>
                  {`Order No : ${o.orderId} Status=${o.status}`}
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
                  <div className={styles.olTable}></div>
                </Accordion.Body>
              </Accordion.Item>
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
