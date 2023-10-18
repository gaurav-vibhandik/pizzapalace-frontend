import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import axios from "axios";
import { Pizza } from "../interfaces/pizzaInterface";
import CardPizza from "./CardPizza";
import InitDataContext from "../../context/InitDataContext";

const PizzaDisplay = () => {
  const initData = useContext(InitDataContext);
  const pizzaList: Pizza[] = initData.pizzaList;
  const crustList: any = initData.crustList;
  const sideList: any = initData.sideList;

  return (
    <React.Fragment>
      <div className="pizzaDisplay">
        <div
          className="scrollspy-example bg-body-tertiary"
          data-bs-spy="scroll"
          data-bs-target="body"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          tabIndex={0}
          style={{ position: "static" }}
        >
          <div id="scrollSpyVeg" className="veg pizzaCardsFlexBox ">
            {pizzaList.length > 0 &&
              pizzaList
                .filter((p) => p.type == "VEG")
                .map((p) => <CardPizza key={p.pizzaId} {...p} />)}
          </div>
          <div id="scrollSpyNonVeg" className="nonVeg pizzaCardsFlexBox">
            {pizzaList.length > 0 &&
              pizzaList
                .filter((p) => p.type == "NON-VEG")
                .map((p) => <CardPizza key={p.pizzaId} {...p} />)}
          </div>
          <div id="scrollSpySides" className="sides pizzaCardsFlexBox">
          {sideList.length > 0 &&
              sideList.map(s => <CardPizza key={s.}))}
            <h2>Sides Details :Comming Soon...</h2>
            <Spinner animation="border" variant="primary" />

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PizzaDisplay;
