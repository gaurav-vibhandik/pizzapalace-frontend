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
  let updatedOrderList: Order[];
  let updatedOrderLineList: OrderLine[];
  let existingOrderIndex;
  let existingOrderLineIndex;
  let existingOrder: Order;
  let existingOrderLine: OrderLine;
  switch (action.type) {
    case "POPULATE_ORDERSTATE":
      return { orderList: action.item };

    case "ADD":
      // //console.log(
      // "🚀🚀🚀🚀🚀 ~ file: reducerFunctions.tsx:68 ~ ================> inside ADD:"
      // );

      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:73 ~ state.orderList[0]:",
      // state.orderList[0]
      // );

      existingOrderIndex = state.orderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:84 ~ existingOrderIndex:",
      // existingOrderIndex
      // );

      existingOrder = state.orderList[existingOrderIndex];
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:87 ~ existingOrder:",
      // existingOrder
      // );

      const updatedOrderLineList1 = existingOrder.orderLines;

      existingOrderLineIndex = updatedOrderLineList1.findIndex(
        (ol) => ol.orderLineId === action.item.orderLineId
      );
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:99 ~ existingOrderLineIndex:",
      // existingOrderLineIndex
      // );
      existingOrderLine = updatedOrderLineList1[existingOrderLineIndex];
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:104 ~ existingOrderLine:",
      // existingOrderLine
      // );
      existingOrderLine.quantity += 1;
      existingOrderLine.totalPrice += existingOrderLine.singlePizzaPrice!;
      //save changes done back to updatedOrderLineList
      updatedOrderLineList1[existingOrderLineIndex] = existingOrderLine;
      //increase totalPrice of order also
      existingOrder.totalAmount += existingOrderLine.singlePizzaPrice!;
      existingOrder = { ...existingOrder, orderLines: updatedOrderLineList1 };
      const updatedOrderList1 = [...state.orderList];
      updatedOrderList1[existingOrderIndex] = existingOrder;
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:118 ~ updatedOrderList AFTER:",
      // updatedOrderList1
      // );

      return { orderList: [...updatedOrderList1] };

    case "DECREASE":
      updatedOrderList = JSON.parse(JSON.stringify(state.orderList));
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
      updatedOrderList = JSON.parse(JSON.stringify(state.orderList));
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      existingOrder = updatedOrderList[existingOrderIndex];
      updatedOrderLineList = existingOrder.orderLines;
      //console.log("Before OL.length()=" + updatedOrderLineList.length);

      //decrease totalPrice of order also
      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId == action.item.orderLineId
      );

      existingOrderLine = updatedOrderLineList[existingOrderLineIndex];
      existingOrder.totalAmount -= existingOrderLine.totalPrice;

      updatedOrderLineList = updatedOrderLineList.filter(
        (ol) => ol.orderLineId !== action.item.orderLineId
      );
      //console.log("After OL.length()=" + updatedOrderLineList.length);
      existingOrder = { ...existingOrder, orderLines: updatedOrderLineList };
      //console.log(
      //   "After OL.length() in OrderList=" + existingOrder.orderLines.length
      // );
      updatedOrderList[existingOrderIndex] = existingOrder;
      return { orderList: [...updatedOrderList] };

    case "EDIT":
      updatedOrderList = JSON.parse(JSON.stringify(state.orderList));
      // //console.log(
      //   "===inside edit of orderReducer ===========================>"
      // );
      // //console.log("cur ol => ", action.item.curOl);
      // //console.log("new ol => ", action.item.newOl);

      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:145 ~ state orderList_initial:",
      // state.orderList
      // );
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:145 ~ updatedOrderList_initial:",
      // updatedOrderList
      // );

      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      //console.log("Existing order index= ", existingOrderIndex);

      existingOrder = updatedOrderList[existingOrderIndex];
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:163 ~ existingOrder:",
      // existingOrder
      // );

      updatedOrderLineList = existingOrder.orderLines;
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:169 ~ updatedOrderLineList: before",
      // updatedOrderLineList
      // );

      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.curOl.orderLineId
      );
      //console.log("exisitingOrderLineIndex = ", existingOrderLineIndex);

      updatedOrderLineList[existingOrderLineIndex] = action.item.newOl;
      // //console.log(
      // "🚀 ~ file: reducerFunctions.tsx:180 ~ updatedOrderLineList after:",
      // updatedOrderLineList
      // );

      //change order's totalAmount = totalPrice of new OL
      existingOrder.totalAmount =
        existingOrder.totalAmount -
        action.item.curOl.totalPrice +
        action.item.newOl.totalPrice;

      existingOrder = { ...existingOrder, orderLines: updatedOrderLineList };
      updatedOrderList[existingOrderIndex] = existingOrder;
      return { ...state, orderList: [...updatedOrderList] };

    case "RESET_ORDER":
      updatedOrderList = JSON.parse(JSON.stringify(state.orderList));
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );

      updatedOrderList[existingOrderIndex] = action.item.order;

      return { orderList: [...updatedOrderList] };

    case "DELETE_ORDER":
      updatedOrderList = JSON.parse(JSON.stringify(state.orderList));
      updatedOrderList = updatedOrderList.filter(
        (o) => o.orderId !== action.item
      );
      return { ...state, orderList: updatedOrderList };

    case "UPDATE_ORDER":
      updatedOrderList = JSON.parse(JSON.stringify(state.orderList));

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
