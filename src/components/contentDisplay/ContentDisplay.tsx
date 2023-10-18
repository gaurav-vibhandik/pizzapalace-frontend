import React, { useEffect, useState } from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "../commons/MenuDisplay";
import axios from "axios";
import { Pizza } from "../interfaces/pizzaInterface";
import InitDataContext from "../../context/InitDataContext";

const ContentDisplay = () => {
  const [initData, setInitData] = useState({
    pizzaList: [],
    crustList: [],
    sideList: [],
  });

  useEffect(() => {
    // Fetching data from server to be used as Context

    let pizzaList: any = axios
      .get("http://localhost:8080/api/v1/pizzas")
      .then((resp) => {
        let myList: Pizza[] = resp.data.data.list;
        console.log(myList);
        return myList;
      })
      .catch((err) => {
        console.log(err);
      });
    const sideList: any = [
      { name: "Cold Drink", price: 55, qty: 100 },
      { name: "MousseCake", price: 90, qty: 100 },
    ];

    const crustList: any = [
      {
        pizzaId: "ZA001",
        pizzaSize: "REGULAR",
        newHandTossed: 100,
        wheatThinCrust: 150,
        cheeseBurst: 200,
        freshPanPizza: -1,
        pizzaQuantity: 100,
      },
      {
        pizzaId: "ZA001",
        pizzaSize: "MEDIUM",
        newHandTossed: 150,
        wheatThinCrust: -1,
        cheeseBurst: 300,
        freshPanPizza: -1,
        pizzaQuantity: 100,
      },
      {
        pizzaId: "ZA001",
        pizzaSize: "LARGE",
        newHandTossed: 250,
        wheatThinCrust: -1,
        cheeseBurst: -1,
        freshPanPizza: -1,
        pizzaQuantity: 100,
      },
      {
        pizzaId: "ZA002",
        pizzaSize: "REGULAR",
        newHandTossed: 100,
        wheatThinCrust: -1,
        cheeseBurst: -1,
        freshPanPizza: 200,
        pizzaQuantity: 100,
      },
      {
        pizzaId: "ZA002",
        pizzaSize: "MEDIUM",
        newHandTossed: 150,
        wheatThinCrust: 250,
        cheeseBurst: 300,
        freshPanPizza: 350,
        pizzaQuantity: 100,
      },
      {
        pizzaId: "ZA002",
        pizzaSize: "LARGE",
        newHandTossed: 250,
        wheatThinCrust: 300,
        cheeseBurst: 350,
        freshPanPizza: -1,
        pizzaQuantity: 100,
      },
    ];

    setInitData({
      pizzaList: pizzaList,
      crustList: crustList,
      sideList: sideList,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="contentDisplay">
        <MenuDisplay />
        <InitDataContext.Provider value={initData}>
          <PizzaDisplay />
          <OrderDisplay />
        </InitDataContext.Provider>
      </div>
    </React.Fragment>
  );
};

export default ContentDisplay;
