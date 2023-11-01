import { Pizza } from "../../interfaces/pizzaInterface";

type addPizaa = {
  type: "AddPizza";
  item: Pizza;
};
type deletePizza = {
  type: "DeletePizza";
  item: string;
};
type editPizza = {
  type: "EditPizza";
  item: Pizza;
};

type finalActionType = addPizaa | deletePizza | editPizza;

const reducerFunctionForAdminPage_PizzaStateReducer = (
  state: { pizzaList: Pizza[] },
  action: finalActionType
) => {
  let existingPizzaIndex;
  let existingPizza;
  let updatedPizzaList;

  switch (action.type) {
    case "AddPizza":
      updatedPizzaList = state.pizzaList.concat(action.item);
      return { pizzaList: [...updatedPizzaList] };
    case "DeletePizza":
      updatedPizzaList = state.pizzaList.filter(
        (p) => p.pizzaId !== action.item
      );
      return { pizzaList: updatedPizzaList };

    case "EditPizza":
      updatedPizzaList = state.pizzaList;
      existingPizzaIndex = updatedPizzaList.findIndex(
        (p) => p.pizzaId === action.item.pizzaId
      );
      updatedPizzaList[existingPizzaIndex] = action.item;

      return { pizzaList: updatedPizzaList };

    default:
      return state;
  }
};

export { reducerFunctionForAdminPage_PizzaStateReducer };
