import React from "react";
import { Pizza } from "../components/interfaces/pizzaInterface";
import { Crust } from "../components/interfaces/crustInterface";
import { PizzaPrice } from "../components/interfaces/pizzaPriceInterface";

const InitDataContext = React.createContext({
  pizzaList: [] as Pizza[],
  crustMap: [] as any,
  pizzaPriceList: [] as PizzaPrice[],
  sideList: [],
});

export default InitDataContext;
