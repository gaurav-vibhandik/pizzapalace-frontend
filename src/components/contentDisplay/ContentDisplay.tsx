import React, { useEffect, useState } from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "../commons/MenuDisplay";
import axios from "axios";
import InitDataContext from "../../context/InitDataContext";

const ContentDisplay = () => {
  const [initData, setInitData] = useState({
    pizzaList: [],
    crustMap: {},
    pizzaPriceList: [],
    sideList: [] as any,
    loading: true, // Add a loading state
  });

  useEffect(() => {
    console.log("inside useEffect");

    // Fetch data from the server
    const fetchData = async () => {
      try {
        const [pizzaResponse, crustResponse, priceResponse] = await Promise.all(
          [
            axios.get("http://localhost:8080/api/v1/pizzas"),
            axios.get("http://localhost:8080/api/v1/crust"),
            axios.get("http://localhost:8080/api/v1/data/pizza_price"),
          ]
        );

        const pizzaList = pizzaResponse.data.data.list;
        const crustList = crustResponse.data.data.list;
        const pizzaPriceList = priceResponse.data.data.list;

        let crustMap = new Map();
        for (let cr of crustList) {
          crustMap.set(cr.crustId, cr.crust);
        }

        const sideList = [
          { name: "Cold Drink", price: 55, qty: 100 },
          { name: "MousseCake", price: 90, qty: 100 },
        ];

        setInitData({
          pizzaList,
          crustMap,
          pizzaPriceList,
          sideList,
          loading: false,
        });
        console.log(
          "=====>Fetched Data Details ====================================="
        );
        console.log("Fetched pizzaList = " + pizzaList.length);
        console.log("Fetched crustList = " + crustList.length);
        console.log(
          "Fetched crustMap = " +
            crustMap +
            "\n" +
            crustMap.forEach((k, v) => console.log(k + "  " + v))
        );
        console.log("Fetched pizzaPriceList = " + pizzaPriceList.length);
        console.log("<====================================\n\n");
      } catch (error) {
        console.log("Error in fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (initData.loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ); // Display a loading message or spinner
  }

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
