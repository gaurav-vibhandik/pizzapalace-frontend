import React from "react";
import OrderLine from "../components/interfaces/orderLineInterface";

const OrderLineContext = React.createContext({
  orderLineList: [] as OrderLine[],
  addToOrderLineList: (ol: OrderLine) => {},
  removeFromOrderLineList: (ol: OrderLine) => {},
});

export default OrderLineContext;
