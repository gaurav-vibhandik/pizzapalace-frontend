import Order from "../interfaces/orderInterface";
import OrderLine from "../interfaces/orderLineInterface";

type populateOrderState = {
  type: "POPULATE_ORDERSTATE";
  item: Order[];
};

type deleteOrderLine = {
  type: "DELETE_ORDERLINE";
  item: { orderId: string; orderLineId: string };
};

type btnAddQuantity = {
  type: "ADD";
  item: { orderId: string; orderLineId: string };
};
type btnDecreaseQuantity = {
  type: "DECREASE";
  item: { orderId: string; orderLineId: string };
};

type editOrderLine = {
  type: "EDIT";
  item: { orderId: string; curOl: OrderLine; newOl: OrderLine };
};

type btnResetOrder = {
  type: "RESET_ORDER";
  item: { orderId: string; order: Order };
};
type btnDeleteOrder = {
  type: "DELETE_ORDER";
  item: string;
};
type btnUpdateOrder = {
  type: "UPDATE_ORDER";
  item: Order;
};

type finalActionEditOrder =
  | deleteOrderLine
  | btnAddQuantity
  | btnDecreaseQuantity
  | editOrderLine
  | btnResetOrder
  | populateOrderState
  | btnDeleteOrder
  | btnUpdateOrder;

const reducerFunctionForEditOrder_EditOrderLines = (
  state: {
    orderList: Order[];
  },
  action: finalActionEditOrder
) => {
  let updatedOrderList;
  let updatedOrderLineList;
  let existingOrderIndex;
  let existingOrderLineIndex;
  let existingOrder;
  let existingOrderLine;
  switch (action.type) {
    case "POPULATE_ORDERSTATE":
      return { orderList: [...action.item] };

    case "ADD":
      console.log("inside add reducer");

      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      existingOrder = updatedOrderList[existingOrderIndex];
      updatedOrderLineList = existingOrder.orderLines;

      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.orderLineId
      );
      existingOrderLine = updatedOrderLineList[existingOrderLineIndex];
      existingOrderLine.quantity += 1;
      console.log(existingOrderLine.singlePizzaPrice);

      existingOrderLine.totalPrice += existingOrderLine.singlePizzaPrice!;
      //save changes done back to updatedOrderLineList
      updatedOrderLineList[existingOrderLineIndex] = existingOrderLine;
      //increase totalPrice of order also
      existingOrder.totalAmount += existingOrderLine.singlePizzaPrice!;
      existingOrder = { ...existingOrder, orderLines: updatedOrderLineList };
      updatedOrderList[existingOrderIndex] = existingOrder;

      return { orderList: [...updatedOrderList] };

    case "DECREASE":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      existingOrder = updatedOrderList[existingOrderIndex];
      updatedOrderLineList = existingOrder.orderLines;

      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.orderLineId
      );
      existingOrderLine = updatedOrderLineList[existingOrderLineIndex];
      existingOrderLine.quantity -= 1;
      existingOrderLine.totalPrice -= existingOrderLine.singlePizzaPrice!;
      //save changes done back to updatedOrderLineList
      updatedOrderLineList[existingOrderLineIndex] = existingOrderLine;
      //decrease totalPrice of order also
      existingOrder.totalAmount -= existingOrderLine.singlePizzaPrice!;
      existingOrder = { ...existingOrder, orderLines: updatedOrderLineList };
      updatedOrderList[existingOrderIndex] = existingOrder;

      return { orderList: [...updatedOrderList] };

    case "DELETE_ORDERLINE":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      existingOrder = updatedOrderList[existingOrderIndex];
      updatedOrderLineList = existingOrder.orderLines;
      console.log("Before OL.length()=" + updatedOrderLineList.length);

      //decrease totalPrice of order also
      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId == action.item.orderLineId
      );

      existingOrderLine = updatedOrderLineList[existingOrderLineIndex];
      existingOrder.totalAmount -= existingOrderLine.totalPrice;

      updatedOrderLineList = updatedOrderLineList.filter(
        (ol) => ol.orderLineId !== action.item.orderLineId
      );
      console.log("After OL.length()=" + updatedOrderLineList.length);
      existingOrder = { ...existingOrder, orderLines: updatedOrderLineList };
      console.log(
        "After OL.length() in OrderList=" + existingOrder.orderLines.length
      );
      updatedOrderList[existingOrderIndex] = existingOrder;
      return { orderList: [...updatedOrderList] };

    case "EDIT":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      existingOrder = updatedOrderList[existingOrderIndex];
      updatedOrderLineList = existingOrder.orderLines;
      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.curOl.orderLineId
      );
      updatedOrderLineList[existingOrderLineIndex] = action.item.newOl;

      //change order's totalAmount = totalPrice of new OL
      existingOrder.totalAmount =
        existingOrder.totalAmount -
        action.item.curOl.totalPrice +
        action.item.newOl.totalPrice;

      existingOrder = { ...existingOrder, orderLines: updatedOrderLineList };
      updatedOrderList[existingOrderIndex] = existingOrder;
      return { ...state, orderList: [...updatedOrderList] };

    case "RESET_ORDER":
      console.log(
        "inside reset_ol===> Passed OL[0].quantity = " +
          action.item.order.orderLines[0].quantity
      );

      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );

      updatedOrderList[existingOrderIndex] = action.item.order;

      return { orderList: [...updatedOrderList] };

    case "DELETE_ORDER":
      updatedOrderList = [...state.orderList];
      updatedOrderList = updatedOrderList.filter(
        (o) => o.orderId !== action.item
      );
      return { ...state, orderList: updatedOrderList };

    case "UPDATE_ORDER":
      updatedOrderList = [...state.orderList];

      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId === action.item.orderId
      );
      updatedOrderList[existingOrderIndex] = action.item;

      return { ...state, orderList: updatedOrderList };

    default:
      return state;
  }
};

export { reducerFunctionForEditOrder_EditOrderLines };
