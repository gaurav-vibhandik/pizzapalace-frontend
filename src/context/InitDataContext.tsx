import React from "react";
import { Pizza } from "../components/interfaces/pizzaInterface";
import Crust from "../components/interfaces/crustInterface";
import { PizzaPrice } from "../components/interfaces/pizzaPriceInterface";
import Topping from "../components/interfaces/toppingInterface";

const InitDataContext = React.createContext({
  pizzaList: [] as Pizza[],
  pizzaMap: new Map<string, Pizza>(),
  crustList: [] as Crust[],
  crustMap: new Map<string, string>(),
  pizzaPriceList: [] as PizzaPrice[],
  toppingList: [] as Topping[],
  toppingMap: new Map<string, Topping>(),
  vegToppingList: [] as Topping[],
  nonVegToppingList_veg: [] as Topping[],
  nonVegToppingList_nonVeg: [] as Topping[],
  sideList: [],
});

export default InitDataContext;
