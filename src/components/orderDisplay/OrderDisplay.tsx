import React, { useContext } from "react";
import styles from "./OrderDisplay.module.css";
import OrderLineContext from "../../context/orderLineContext";
import OrderLine from "../interfaces/orderLineInterface";
import CardOrderLine from "./CardOrderLine";
import { Button, Col, Row } from "react-bootstrap";

const OrderDisplay = () => {
  const orderLineState = useContext(OrderLineContext);
  const orderLineList = orderLineState.orderLineList;
  let totalOrdeCartPrice = 0;
  orderLineList.map(
    (ol) => (totalOrdeCartPrice += ol.quantity * ol.orderLinePrice)
  );
  return (
    <React.Fragment>
      <div className={styles.orderDisplay}>
        <div className={styles.orderCart}>
          <div className={styles.displayOrderLine}>
            {orderLineList.map((ol) => (
              <CardOrderLine key={`${ol.pizzaId}_${ol.crustId}`} ol={ol} />
            ))}
          </div>
          <div className={styles.orderCartPriceNCheckout}>
            <div className="container">
              {
                <b>
                  {`SubTotal : Rs. `}
                  <span className={styles.price}>
                    {totalOrdeCartPrice > 0 ? totalOrdeCartPrice : ""}
                  </span>
                </b>
              }
            </div>

            <div className="container">
              <Button type="submit" href="/orderCart">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderDisplay;
