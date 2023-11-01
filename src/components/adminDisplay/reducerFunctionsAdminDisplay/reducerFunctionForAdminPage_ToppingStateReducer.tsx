import Topping from "../../interfaces/toppingInterface";

type addTopping = {
  type: "AddTopping";
  item: Topping;
};
type deleteTopping = {
  type: "DeleteTopping";
  item: string;
};
type editTopping = {
  type: "EditTopping";
  item: Topping;
};

type finalActionType = addTopping | deleteTopping | editTopping;

const reducerFunctionForAdminPage_ToppingStateReducer = (
  state: { toppingList: Topping[] },
  action: finalActionType
) => {
  let existingToppingIndex;
  let existingTopping;
  let updatedToppingList;

  switch (action.type) {
    case "AddTopping":
      updatedToppingList = state.toppingList.concat(action.item);
      return { toppingList: [...updatedToppingList] };
    case "DeleteTopping":
      updatedToppingList = state.toppingList.filter(
        (t) => t.toppingId !== action.item
      );
      return { toppingList: updatedToppingList };

    case "EditTopping":
      updatedToppingList = state.toppingList;
      existingToppingIndex = updatedToppingList.findIndex(
        (t) => t.toppingId === action.item.toppingId
      );
      updatedToppingList[existingToppingIndex] = action.item;

      return { toppingList: updatedToppingList };

    default:
      return state;
  }
};

export { reducerFunctionForAdminPage_ToppingStateReducer };
