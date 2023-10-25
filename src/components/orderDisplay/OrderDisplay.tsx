import React, { useContext } from "react";
import styles from "./OrderDisplay.module.css";
import OrderLineContext from "../../context/orderLineContext";
import OrderLine from "../interfaces/orderLineInterface";
import CardOrderLine from "./CardOrderLine";
import { Button, Col, Row } from "react-bootstrap";
import Order from "../interfaces/orderInterface";
import axios from "axios";

const OrderDisplay = () => {
  const orderLineState = useContext(OrderLineContext);
  const orderLineList = orderLineState.orderLineList;
  let totalOrderPrice = 0;
  orderLineList.map((ol) => (totalOrderPrice += ol.quantity * ol.totalPrice));

  //====>Handle Checkout
  const handleCheckout = () => {
    const order: Order = {
      customerId: "CUS003",
      totalAmount: totalOrderPrice,
      deliveryAddress: "delivery address1",
      orderLines: orderLineList,
    };

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
  };

  /*
       private String orderId;
    @NotBlank(message = "CustomerId is required")
    private String customerId;
    private String status ;
    @NotNull(message = "non-zero amount must be mentioned")
    private int totalAmount;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime orderDateTime;
    @NotNull(message = "delivery address must be mentioned")
    private String deliveryAddress;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<OrderLine> orderLines = new ArrayList<>();
    */

  //<===============

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
                    {totalOrderPrice > 0 ? totalOrderPrice : ""}
                  </span>
                </b>
              }
            </div>

            <div className="container">
              <Button type="button" onClick={handleCheckout} href="/orderCart">
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
