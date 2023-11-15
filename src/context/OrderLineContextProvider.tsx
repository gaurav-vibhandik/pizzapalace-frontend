import React, { useReducer } from "react";
import OrderLine from "../components/interfaces/orderLineInterface";
import OrderLineContext from "./orderLineContext";

let defaultValue = {
  orderLineList: [],
};

type actionAdd = {
  type: "ADD";
  item: OrderLine;
};

type actionRemove = {
  type: "REMOVE";
  item: OrderLine;
};
type actionReplace = {
  type: "REPLACE";
  item: { oldOl: OrderLine; newOl: OrderLine };
};

type finalAction = actionAdd | actionRemove | actionReplace;

const orderLineReducer = (
  state: { orderLineList: OrderLine[] },
  action: finalAction
) => {
  if (action.type === "ADD") {
    //This will add new OL entry or update existing one by incrementing existing quantity
    let updatedOrderLineList = JSON.parse(JSON.stringify(state.orderLineList));
    // console.log(
    // "🚀 ~ file: OrderLineContextProvider.tsx:32 ~ updatedOrderLineList:Att start of ADD",
    // updatedOrderLineList
    // );
    const existingOrderLineIndex = updatedOrderLineList.findIndex(
      (ol: OrderLine) => {
        return (
          ol.pizzaId === action.item.pizzaId &&
          ol.size === action.item.size &&
          ol.crustId === action.item.crustId &&
          ol.extraCheese === action.item.extraCheese &&
          //checking first length of toppings is same or not
          ol.toppingList.length == action.item.toppingList.length &&
          new Set([...ol.toppingList]).size ===
            new Set([...ol.toppingList, ...action.item.toppingList]).size
        );
      }
    );
    // console.log(
    // "🚀 ~ file: OrderLineContextProvider.tsx:47 ~ existingOrderLineIndex:",
    // existingOrderLineIndex
    // );

    //if OL exists increase its quantity
    let existingOrderLine: OrderLine =
      updatedOrderLineList[existingOrderLineIndex];
    if (existingOrderLineIndex !== -1) {
      //NOTE : We must not change prev state as it may be refer by other also
      //Make isolated changes and then return them
      // console.log(
      // "🚀 ~ file: OrderLineContextProvider.tsx:57 ~ updatedOrderLineList[existingOrderLineIndex]:",
      // updatedOrderLineList[existingOrderLineIndex]
      // );
      existingOrderLine.quantity += 1;
      existingOrderLine.totalPrice += existingOrderLine.singlePizzaPrice!;
      updatedOrderLineList[existingOrderLineIndex] = existingOrderLine;
    } else {
      //during first time adding of OL we will have to set singlePizzaPrice as it is not there
      // action.item.singlePizzaPrice = action.item.totalPrice;

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
    let updatedOrderLineList = JSON.parse(JSON.stringify(state.orderLineList));
    const existingOrderLineIndex = updatedOrderLineList.findIndex(
      (ol: OrderLine) => {
        return (
          ol.pizzaId === action.item.pizzaId &&
          ol.size === action.item.size &&
          ol.crustId === action.item.crustId &&
          ol.extraCheese === action.item.extraCheese &&
          //checking first length of toppings is same or not
          ol.toppingList.length == action.item.toppingList.length &&
          new Set([...ol.toppingList]).size ==
            new Set([...ol.toppingList, ...action.item.toppingList]).size
        );
      }
    );
    const existingOrderLine = updatedOrderLineList[existingOrderLineIndex];
    const existingQuantity = existingOrderLine.quantity;
    if (existingQuantity == 1) {
      //remove the OL entry from olList
      updatedOrderLineList = updatedOrderLineList.filter((ol: OrderLine) => {
        return (
          ol.pizzaId !== action.item.pizzaId ||
          ol.size !== action.item.size ||
          ol.crustId !== action.item.crustId ||
          ol.extraCheese !== action.item.extraCheese ||
          //checking first length of toppings is same or not
          ol.toppingList.length !== action.item.toppingList.length ||
          new Set([...ol.toppingList]).size !==
            new Set([...ol.toppingList, ...action.item.toppingList]).size
        );
      });
    } else {
      //decrement ol quantity by 1
      existingOrderLine.quantity -= 1;
      existingOrderLine.totalPrice -= existingOrderLine.singlePizzaPrice!;
      updatedOrderLineList[existingOrderLineIndex] = existingOrderLine;
    }
    return { orderLineList: updatedOrderLineList };
  }

  if (action.type === "REPLACE") {
    //This will update existing OL entry by REPLACING existing Pizza Details only
    let updatedOrderLineList: OrderLine[] = JSON.parse(
      JSON.stringify(state.orderLineList)
    );
    // console.log("================>In replace method : \n");

    // console.log(
    // "🚀 ~ file: OrderLineContextProvider.tsx:132 ~ Available state.orderLineList:",
    // state.orderLineList
    // );
    // console.log(
    // "🚀 ~ file: OrderLineContextProvider.tsx:132 ~ action.item.newOl:",
    // action.item.newOl
    // );
    // console.log(
    // "🚀 ~ file: OrderLineContextProvider.tsx:132 ~ action.item.oldOl:",
    // action.item.oldOl
    // );

    //CaseA: When olList contains only one element , simply replace it
    if (updatedOrderLineList.length == 1) {
      updatedOrderLineList[0] = action.item.newOl;
      // console.log(
      // "🚀 ~ file: OrderLineContextProvider.tsx:122 ~ updatedOrderLineList After changes:",
      // updatedOrderLineList
      // );
      return { orderLineList: updatedOrderLineList };
    }

    //CaseB: When olList contains more than one element
    const existingOrderLineIndex = state.orderLineList.findIndex(
      (ol: OrderLine) => {
        return (
          ol.pizzaId === action.item.oldOl.pizzaId &&
          ol.size === action.item.oldOl.size &&
          ol.crustId === action.item.oldOl.crustId &&
          ol.extraCheese === action.item.oldOl.extraCheese &&
          //checking first length of toppings is same or not
          ol.toppingList.length == action.item.oldOl.toppingList.length &&
          new Set([...ol.toppingList]).size ==
            new Set([...ol.toppingList, ...action.item.oldOl.toppingList]).size
        );
      }
    );
    //Case B.1) => If newOL is same as one of existing orderLineList , increase its qty AND remove the oldOl entry

    const existingOrderLineIndexForNewOl = state.orderLineList.findIndex(
      (ol: OrderLine) => {
        return (
          ol.pizzaId === action.item.newOl.pizzaId &&
          ol.size === action.item.newOl.size &&
          ol.crustId === action.item.newOl.crustId &&
          ol.extraCheese === action.item.newOl.extraCheese &&
          //checking first length of toppings is same or not
          ol.toppingList.length == action.item.newOl.toppingList.length &&
          new Set([...ol.toppingList]).size ==
            new Set([...ol.toppingList, ...action.item.newOl.toppingList]).size
        );
      }
    );

    if (existingOrderLineIndexForNewOl !== -1) {
      let existingOrderLine =
        updatedOrderLineList[existingOrderLineIndexForNewOl];

      existingOrderLine.quantity += 1;
      existingOrderLine.totalPrice += existingOrderLine.singlePizzaPrice!;
      updatedOrderLineList[existingOrderLineIndexForNewOl] = existingOrderLine;
      //remove oldOL entry
      updatedOrderLineList = updatedOrderLineList.filter((ol: OrderLine) => {
        return (
          ol.pizzaId !== action.item.oldOl.pizzaId ||
          ol.size !== action.item.oldOl.size ||
          ol.crustId !== action.item.oldOl.crustId ||
          ol.extraCheese !== action.item.oldOl.extraCheese ||
          //checking first length of toppings is same or not
          ol.toppingList.length !== action.item.oldOl.toppingList.length ||
          new Set([...ol.toppingList]).size !==
            new Set([...ol.toppingList, ...action.item.oldOl.toppingList]).size
        );
      });

      return { orderLineList: updatedOrderLineList };
    } //Case B.2) => updated newOL is different
    else {
      //if not simply replace oldOl entry
      console.log("here in Case B.2) => ");
      console.log(
        "🚀 ~ file: OrderLineContextProvider.tsx:212 ~ existingOrderLineIndex:",
        existingOrderLineIndex
      );
      console.log(
        "🚀 ~ file: OrderLineContextProvider.tsx:218 ~ action.item.oldOl:",
        action.item.oldOl
      );

      console.log(
        "🚀 ~ file: OrderLineContextProvider.tsx:219 ~ action.item.newOl:",
        action.item.newOl
      );
      updatedOrderLineList[existingOrderLineIndex] = action.item.newOl;

      return { orderLineList: updatedOrderLineList };
    }
  }

  //by adding extra return claue , it solves error of "orderLineState is maybe undefined"
  /*This is necessary to ensure that the reducer always returns the state object, 
  even when none of the specified actions is matched. 
  Without this return statement, TypeScript might infer that the reducer can return undefined 
  if none of the conditions are met. This is why the error is resolved by including the extra return clause.*/
  return state;
};

const OrderLineContextProvider = (props: any) => {
  // console.log(
  // "🚀 🚀 🚀 🚀 ~ file: OrderLineContextProvider.tsx:218 ~ OrderLineContextProvider ~ :=====>OLContext Provider Rendered"
  // );

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
    replaceOrderLineInOrderLineList: (item: {
      oldOl: OrderLine;
      newOl: OrderLine;
    }) => dispatchOrderLineStateAction({ type: "REPLACE", item }),
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
