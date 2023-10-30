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

type btnResetOrderLine = {
  type: "RESET_ORDERLINE";
  item: { orderId: string; orderLineList: OrderLine[] };
};

type finalActionEditOrder =
  | deleteOrderLine
  | btnAddQuantity
  | btnDecreaseQuantity
  | editOrderLine
  | btnResetOrderLine
  | populateOrderState;

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
  let existingOl;
  switch (action.type) {
    case "POPULATE_ORDERSTATE":
      return { orderList: [...action.item] };

    case "ADD":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      updatedOrderLineList = updatedOrderList[existingOrderIndex].orderLines;
      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.orderLineId
      );
      existingOl = updatedOrderLineList[existingOrderLineIndex];
      existingOl.quantity += 1;
      return { orderList: [...updatedOrderList] };

    case "DECREASE":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      updatedOrderLineList = updatedOrderList[existingOrderIndex].orderLines;
      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.orderLineId
      );
      updatedOrderLineList[existingOrderLineIndex].quantity -= 1;

      return { orderList: [...updatedOrderList] };

    case "DELETE_ORDERLINE":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      updatedOrderLineList = updatedOrderList[existingOrderIndex].orderLines;
      updatedOrderLineList = updatedOrderLineList.filter(
        (ol) => ol.orderLineId !== action.item.orderLineId
      );
      return { orderList: [...updatedOrderList] };

    case "EDIT":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      updatedOrderLineList = updatedOrderList[existingOrderIndex].orderLines;
      existingOrderLineIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.curOl.orderLineId
      );
      //check if new OL is already existing by comparing with all list elements
      //if yes just increase its qty by 1
      //to be done later

      //if no , just replace oldOL entry by newOl

      updatedOrderLineList[existingOrderLineIndex] = action.item.newOl;

      return { orderList: [...updatedOrderList] };

    case "RESET_ORDERLINE":
      updatedOrderList = [...state.orderList];
      existingOrderIndex = updatedOrderList.findIndex(
        (o) => o.orderId == action.item.orderId
      );
      updatedOrderList[existingOrderIndex].orderLines =
        action.item.orderLineList;

      return { orderList: [...updatedOrderList] };

    default:
      return state;
  }
};

export { reducerFunctionForEditOrder_EditOrderLines };
