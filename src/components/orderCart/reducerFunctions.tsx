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
  item: { curOl: OrderLine; newOl: OrderLine };
};
type btnResetOrderLine = {
  type: "RESET_ORDERLINE";
  item: OrderLine[];
};

type finalActionEditOrder =
  | deleteOrderLine
  | btnAddQuantity
  | btnDecreaseQuantity
  | editOrderLine
  | btnResetOrderLine;

const reducerFunctionForEditOrder_EditOrderLines = (
  state: {
    orderLines: OrderLine[];
  },
  action: finalActionEditOrder
) => {
  let updatedOrderLineList;
  let existingIndex;
  let existingOl;
  switch (action.type) {
    case "ADD":
      updatedOrderLineList = [...state.orderLines];
      existingIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item
      );
      existingOl = updatedOrderLineList[existingIndex];
      existingOl.quantity += 1;
      return { ...state, orderLines: updatedOrderLineList };

    case "DECREASE":
      updatedOrderLineList = [...state.orderLines];
      existingIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item
      );
      updatedOrderLineList[existingIndex].quantity -= 1;

      return { ...state, orderLines: updatedOrderLineList };

    case "DELETE_ORDERLINE":
      updatedOrderLineList = [...state.orderLines];
      updatedOrderLineList = updatedOrderLineList.filter(
        (ol) => ol.orderLineId !== action.item
      );
      return { ...state, orderLines: updatedOrderLineList };

    case "EDIT":
      updatedOrderLineList = [...state.orderLines];
      existingIndex = updatedOrderLineList.findIndex(
        (ol) => ol.orderLineId === action.item.curOl.orderLineId
      );
      //check if new OL is already existing by comparing with all list elements
      //if yes just increase its qty by 1
      //to be done later

      //if no , just replace oldOL entry by newOl

      updatedOrderLineList[existingIndex] = action.item.newOl;

      return { ...state, orderLines: updatedOrderLineList };

    case "RESET_ORDERLINE":
      console.log("=======>Resetting Ol :");
      console.log("======>Cur state of OL : ");
      state.orderLines.forEach((ol) => console.log(ol.orderLineId));
      console.log("<============");
      console.log("======>Resetted state of OL : ");
      action.item.forEach((ol) => console.log(ol.orderLineId));
      console.log("<============");

      return { ...state, orderLines: [...action.item] };

    default:
      return state;
  }
};

export { reducerFunctionForEditOrder_EditOrderLines };
