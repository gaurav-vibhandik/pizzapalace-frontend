import React, { useEffect, useState } from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "../commons/MenuDisplay";

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="contentDisplay">
        <MenuDisplay />
        <PizzaDisplay />
        <OrderDisplay />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
