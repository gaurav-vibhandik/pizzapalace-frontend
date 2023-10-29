import Order from "../interfaces/orderInterface";
import OrderLine from "../interfaces/orderLineInterface";

type deleteOrderLine = {
  type: "DELETE_ORDERLINE";
  item: string;
};

type btnAddQuantity = {
  type: "ADD";
  item: string;
};
type btnDecreaseQuantity = {
  type: "DECREASE";
  item: string;
};

type editOrderLine = {
  type: "EDIT";
  item: { oldOl: OrderLine; newOl: OrderLine };
};

type finalActionEditOrder =
  | deleteOrderLine
  | btnAddQuantity
  | btnDecreaseQuantity
  | editOrderLine;

const reducerFunctionForEditOrder_EditOrderLines = (
  state: {
    orderLines: OrderLine[];
  },
  action: finalActionEditOrder
) => {
  let updatedOrderLineList = [...state.orderLines];
  let existingIndex;
  let existingOl;
  switch (action.type) {
    case "ADD":
      existingIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item
      );
      existingOl = updatedOrderLineList[existingIndex];
      existingOl.quantity += existingOl.quantity;
      return { orderLines: updatedOrderLineList };

    case "DECREASE":
      existingIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item
      );
      existingOl = updatedOrderLineList[existingIndex];
      existingOl.quantity -= existingOl.quantity;
      return { orderLines: updatedOrderLineList };

    case "DELETE_ORDERLINE":
      updatedOrderLineList = updatedOrderLineList.filter(
        (ol) => ol.orderLineId !== action.item
      );
      return { orderLines: updatedOrderLineList };

    case "EDIT":
      existingIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.oldOl.orderLineId
      );
      //check if new OL is already existing by comparing with all list elements
      //if yes just increase its qty by 1
      //to be done later

      //if no , just replace oldOL entry by newOl

      updatedOrderLineList[existingIndex] = action.item.newOl;

      return { orderLines: updatedOrderLineList };

    default:
      return state;
  }
};

export { reducerFunctionForEditOrder_EditOrderLines };
