import React, { useContext } from "react";
import styles from "./OrderDisplay.module.css";
import OrderLineContext from "../../context/orderLineContext";
import { Button, Col, Image, Row } from "react-bootstrap";
import Order from "../interfaces/orderInterface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardOrderLine from "./CardOrderLine";
import EmptyOrderDisplayImage from "../images/EmptyOrderDisplayImage/EmptyOrderDisplayImage.jpg";

const OrderDisplay = () => {
  const orderLineState = useContext(OrderLineContext);
  const orderLineList = orderLineState.orderLineList;

  //Calculating Total Order Price
  let totalOrderPrice = 0;
  orderLineList.map((ol) => (totalOrderPrice += ol.totalPrice));

  //Handling Navigation Routing
  const navigate = useNavigate();

  //====>Handle Checkout
  const handleCheckout = () => {
    const order: Order = {
      customerId: "CUS003",
      totalAmount: totalOrderPrice,
      deliveryAddress: "delivery address1",
      orderLines: orderLineList,
    };
    console.log(order);
    axios
      .post("http://localhost:8080/api/v1/orders", order, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data.data.list);
      })
      .catch((error) => {
        console.log(error);
      });

    //Handle idle time to wait before navigating(so that data can be fetched in OrderCart)
    // such that user can not click multiple times checkouts
    setTimeout(() => {
      navigate("/checkout");
    }, 30);
  };

  //<===============

  return (
    <React.Fragment>
      <div className={styles.orderDisplay}>
        {orderLineState.orderLineList.length == 0 && (
          <div className={styles.orderCart}>
            <div className={styles.emptyOrderBlock}>
              <Image
                className={styles.emptyOrderDisplayImage}
                src={EmptyOrderDisplayImage}
              />
              <p>
                <b>YOUR CART IS EMPTY</b>
              </p>
              <p>Please add some items from the menu.</p>
            </div>
          </div>
        )}
        {orderLineState.orderLineList.length > 0 && (
          <div className={styles.orderCart}>
            <div className={styles.displayOrderLine}>
              {orderLineList.map((ol) => (
                <CardOrderLine
                  key={`${ol.pizzaId}_${ol.crustId}_` + Math.random()}
                  ol={ol}
                  onReplace={orderLineState.replaceOrderLineInOrderLineList}
                />
              ))}
            </div>
            <div className={styles.orderCartPriceNCheckout}>
              <div className="container">
                {
                  <b>
                    {`SubTotal : Rs. `}
                    <span className={styles.price}>
                      {totalOrderPrice > 0 ? totalOrderPrice : ""}
                    </span>
                  </b>
                }
              </div>

              <div className="container">
                <Button
                  type="button"
                  onClick={handleCheckout}
                  disabled={
                    orderLineState.orderLineList.length == 0 ? true : false
                  }
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderDisplay;
