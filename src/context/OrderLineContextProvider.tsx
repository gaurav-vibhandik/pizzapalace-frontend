import React, { useReducer } from "react";
import OrderLine from "../components/interfaces/orderLineInterface";
import OrderLineContext from "./orderLineContext";

const orderLineReducer = (
  state: any,
  action: { type: string; item: OrderLine }
) => {
  if (action.type === "ADD") {
    //This will add new OL entry or update existing one by incrementing existing quantity
    let updatedOrderLineList: OrderLine[];
    const existingOrderLineIndex = state.orderLineList.findIndex(
      (ol: OrderLine) => ol.pizzaId === action.item.pizzaId
    );

    //if OL exists increase its quantity
    let existingOrderLine = state.orderLineList[existingOrderLineIndex];
    if (existingOrderLine) {
      //NOTE : We must not change prev state as it may be refer by other also
      //Make isolated changes and then return them
      updatedOrderLineList = [...state.orderLineList];
      updatedOrderLineList[existingOrderLineIndex].quantity += 1;
    } else {
      //NOTE : We must not change prev state as it may be refer by other also
      //Make isolated changes and then return them
      //concat method will return new Array without changing original one
      updatedOrderLineList = state.orderLineList.concat(action.item);
    }

    return { orderLineList: updatedOrderLineList };
  }

  if (action.type === "REMOVE") {
    //This will update existing OL entry by decrementing existing quantity or
    // remove OL from olList if quantity reaches zero
    let updatedOrderLineList: OrderLine[];
    const existingOrderLineIndex = state.orderLineList.findIndex(
      (ol: OrderLine) => ol.pizzaId === action.item.pizzaId
    );
    const existingOrderLine = state.orderLineList[existingOrderLineIndex];
    const existingQuantity = existingOrderLine.quantity;
    if (existingQuantity == 1) {
      //remove the OL entry from olList
      updatedOrderLineList = state.orderLineList.filter(
        (ol: OrderLine) => ol.pizzaId !== action.item.pizzaId
      );
    } else {
      //decrement ol quantity by 1
      updatedOrderLineList = [...state.orderLineList];
      updatedOrderLineList[existingOrderLineIndex].quantity -= 1;
    }
    return { orderLineList: updatedOrderLineList };
  }
};

const OrderLineContextProvider = (props: any) => {
  const defaultValue = { orderLineList: [] as OrderLine[] };

  const [orderLineState, dispatchOrderLineStateAction] = useReducer(
    orderLineReducer,
    defaultValue
  );

  const orderLineContext = {
    orderLineList: orderLineState.orderLineList,
    addToOrderLineList: (item: OrderLine) =>
      dispatchOrderLineStateAction({ type: "ADD", item }),
    removeFromOrderLineList: (item: OrderLine) =>
      dispatchOrderLineStateAction({ type: "REMOVE", item }),
  };

  return (
    <React.Fragment>
      <OrderLineContext.Provider value={orderLineContext}>
        {props.children}
      </OrderLineContext.Provider>
    </React.Fragment>
  );
};

export default OrderLineContextProvider;
