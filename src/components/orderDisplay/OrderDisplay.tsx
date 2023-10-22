import React, { useContext } from "react";
import styles from "./OrderDisplay.module.css";
import OrderLineContext from "../../context/orderLineContext";
import OrderLine from "../interfaces/orderLineInterface";
import CardOrderLine from "./CardOrderLine";
import { Button } from "react-bootstrap";

const OrderDisplay = () => {
  const orderLineState = useContext(OrderLineContext);
  const orderLineList = orderLineState.orderLineList;
  return (
    <React.Fragment>
      <div className={styles.orderDisplay}>
        <div className={styles.orderCart}>
          <div className={styles.displayOrderLine}>
            {orderLineList.map((ol) => (
              <CardOrderLine key={`${ol.pizzaId}_${ol.crustId}`} ol={ol} />
            ))}
          </div>
          <div className={styles.orderCartPriceNCheckout}></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderDisplay;

// import React, { useContext } from "react";
// import styles from "./OrderDisplay.module.css";
// import OrderLineContext from "../../context/orderLineContext";
// import OrderLine from "../interfaces/orderLineInterface";
// import CardOrderLine from "./CardOrderLine";

// const OrderDisplay = () => {
//   const orderLineState = useContext(OrderLineContext);
//   const orderLineList = orderLineState.orderLineList;
//   return (
//     <React.Fragment>
//       <div className={styles.orderDisplay}>
//         <div className={styles.orderCart}>
//           {orderLineList.map((ol) => (
//             <CardOrderLine key={`${ol.pizzaId}_${ol.crustId}`} ol={ol} />
//           ))}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default OrderDisplay;
