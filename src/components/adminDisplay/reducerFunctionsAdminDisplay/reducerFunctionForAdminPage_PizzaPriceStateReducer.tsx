import PizzaPrice from "../../interfaces/pizzaPriceInterface";

type addPizzaPrice = {
  type: "AddPizzaPrice";
  item: PizzaPrice;
};
type deletePizzaPrice = {
  type: "DeletePizzaPrice";
  item: number;
};
type editPizzaPrice = {
  type: "EditPizzaPrice";
  item: PizzaPrice;
};

type finalActionType = addPizzaPrice | deletePizzaPrice | editPizzaPrice;

const reducerFunctionForAdminPage_PizzaPriceStateReducer = (
  state: { pizzaPriceList: PizzaPrice[] },
  action: finalActionType
) => {
  let existingPizzaPriceIndex;
  let existingPizzaPrice;
  let updatedPizzaPriceList;

  switch (action.type) {
    case "AddPizzaPrice":
      updatedPizzaPriceList = state.pizzaPriceList.concat(action.item);
      return { pizzaPriceList: [...updatedPizzaPriceList] };
    case "DeletePizzaPrice":
      updatedPizzaPriceList = state.pizzaPriceList.filter(
        (pp) => pp.id !== action.item
      );
      return { pizzaPriceList: updatedPizzaPriceList };

    case "EditPizzaPrice":
      updatedPizzaPriceList = state.pizzaPriceList;
      existingPizzaPriceIndex = updatedPizzaPriceList.findIndex(
        (pp) => pp.id === action.item.id
      );
      updatedPizzaPriceList[existingPizzaPriceIndex] = action.item;

      return { pizzaPriceList: updatedPizzaPriceList };

    default:
      return state;
  }
};

export { reducerFunctionForAdminPage_PizzaPriceStateReducer };
