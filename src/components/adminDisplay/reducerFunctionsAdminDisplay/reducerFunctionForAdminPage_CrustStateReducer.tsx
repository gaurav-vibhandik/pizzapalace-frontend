import Crust from "../../interfaces/crustInterface";

type addCrust = {
  type: "AddCrust";
  item: Crust;
};
type deleteCrust = {
  type: "DeleteCrust";
  item: string;
};
type editCrust = {
  type: "EditCrust";
  item: Crust;
};

type finalActionType = addCrust | deleteCrust | editCrust;

const reducerFunctionForAdminPage_CrustStateReducer = (
  state: { crustList: Crust[] },
  action: finalActionType
) => {
  let existingCrustIndex;
  let existingCrust;
  let updatedCrustList;

  switch (action.type) {
    case "AddCrust":
      updatedCrustList = state.crustList.concat(action.item);
      return { crustList: [...updatedCrustList] };
    case "DeleteCrust":
      updatedCrustList = state.crustList.filter(
        (t) => t.crustId !== action.item
      );
      return { crustList: updatedCrustList };

    case "EditCrust":
      updatedCrustList = state.crustList;
      existingCrustIndex = updatedCrustList.findIndex(
        (t) => t.crustId === action.item.crustId
      );
      updatedCrustList[existingCrustIndex] = action.item;

      return { crustList: updatedCrustList };

    default:
      return state;
  }
};

export { reducerFunctionForAdminPage_CrustStateReducer };
