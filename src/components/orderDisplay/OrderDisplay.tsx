import React from "react";
import styles from "./OrderDisplay.module.css";

const OrderDisplay = () => {
  return (
    <React.Fragment>
      <div className={styles.orderDisplay}>
        <div className={styles.orderCart}>This is OrderCart</div>
      </div>
    </React.Fragment>
  );
};

export default OrderDisplay;
