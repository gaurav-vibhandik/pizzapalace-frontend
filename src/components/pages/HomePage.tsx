import React from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "../commons/MenuDisplay";
import OrderLineContextProvider from "../../context/OrderLineContextProvider";

const HomePage = () => {
  return (
    <React.Fragment>
      <OrderLineContextProvider>
        <div className="contentDisplay">
          <MenuDisplay />
          <PizzaDisplay />
          <OrderDisplay />
        </div>
      </OrderLineContextProvider>
    </React.Fragment>
  );
};

export default HomePage;
