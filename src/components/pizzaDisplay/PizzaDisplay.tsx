import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import axios from "axios";
import { Pizza } from "../interfaces/pizzaInterface";
import CardPizza from "./CardPizza";
const PizzaDisplay = () => {
  const [pizzaList, setPizzaList] = useState<Pizza[]>([]);
  console.log("Before useEffect pizzaList.length= " + pizzaList.length);

  const sides = [];
  useEffect(() => {
    console.log("into useEffect");
    console.log("PizzaList length = " + pizzaList.length);
    if (pizzaList.length === 0) {
      axios
        .get("http://localhost:8080/api/v1/pizzas")
        .then((resp) => {
          let myList: Pizza[] = resp.data.data.list;
          console.log("Fetched List Length = " + myList.length);
          console.log(myList);

          setPizzaList(myList);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <React.Fragment>
      {/* <div
        className="pizzaDisplay scrollspy-example bg-body-tertiary"
        data-bs-spy="scroll"
        data-bs-target="body"
        data-bs-root-margin="0px 0px -40%"
        data-bs-smooth-scroll="true"
        tabIndex={0}
      > */}
      <div className="pizzaDisplay">
        <div id="scrollSpyVeg" className="veg pizzaCardsFlexBox">
          {pizzaList.length > 0 &&
            pizzaList
              .filter((p) => p.type == "VEG")
              .map((p) => <CardPizza key={p.pizzaId} {...p} />)}
        </div>
        <div
          id="scrollSpyNonVeg"
          className="container-fluid  nonVeg pizzaCardsFlexBox"
        >
          {pizzaList.length > 0 &&
            pizzaList
              .filter((p) => p.type == "NON-VEG")
              .map((p) => <CardPizza key={p.pizzaId} {...p} />)}
        </div>
        <div
          id="scrollSpySides"
          className="flex-row justify-content-center align-items-center   sides pizzaCardsFlexBox"
        >
          <h2>Comming Soon : Sides Details ...</h2>
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PizzaDisplay;
