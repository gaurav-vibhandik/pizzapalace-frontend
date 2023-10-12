import React from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "./MenuDisplay";

const ContentDisplay = () => {
  return (
    <React.Fragment>
      <div className="container-fluid contentDisplay">
        <MenuDisplay />
        <PizzaDisplay />
        <OrderDisplay />
      </div>
    </React.Fragment>
  );
};

export default ContentDisplay;
