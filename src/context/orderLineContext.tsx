import React from "react";
import OrderLine from "../components/interfaces/orderLineInterface";

const OrderLineContext = React.createContext({
  orderLineList: [] as OrderLine[],
  addToOrderLineList: (ol: OrderLine) => {},
  removeFromOrderLineList: (ol: OrderLine) => {},
  replaceOrderLineInOrderLineList: ({
    oldOl,
    newOl,
  }: {
    oldOl: OrderLine;
    newOl: OrderLine;
  }) => {},
});

export default OrderLineContext;
