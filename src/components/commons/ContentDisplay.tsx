import React, { useState } from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "./MenuDisplay";

const ContentDisplay = () => {
  return (
    <React.Fragment>
      <div className="contentDisplay">
        {/* <MenuDisplay /> */}
        <PizzaDisplay />

        <OrderDisplay />
      </div>
    </React.Fragment>
  );
};

export default ContentDisplay;
