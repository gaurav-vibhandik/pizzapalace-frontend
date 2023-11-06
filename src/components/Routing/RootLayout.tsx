import React, { useEffect, useState } from "react";
import Header from "../commons/Header";
import Footer from "../commons/Footer";
import { Outlet } from "react-router-dom";
import InitDataContext from "../../context/InitDataContext";
import OrderLineContextProvider from "../../context/OrderLineContextProvider";
import Topping from "../interfaces/toppingInterface";
import { Pizza } from "../interfaces/pizzaInterface";
import axios from "axios";
import Crust from "../interfaces/crustInterface";

const RootLayout = () => {
  // Fetching required all context data so that it can be provided to all children components replacing outlet component
  const [initData, setInitData] = useState({
    pizzaList: [],
    pizzaMap: new Map<string, Pizza>(),
    crustList: [],
    crustMap: new Map<string, string>(),
    pizzaPriceList: [],
    toppingList: [],
    toppingMap: new Map<string, Topping>(),
    vegToppingList: [],
    nonVegToppingList_veg: [],
    nonVegToppingList_nonVeg: [],
    sideList: [] as any,
    loading: true, // Add a loading state
  });

  useEffect(() => {
    console.log("inside useEffect");

    // Fetch data from the server
    const fetchData = async () => {
      try {
        const [pizzaResponse, crustResponse, priceResponse, toppingResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/api/v1/pizzas"),
            axios.get("http://localhost:8080/api/v1/crust"),
            axios.get("http://localhost:8080/api/v1/pizzaPrices"),
            axios.get("http://localhost:8080/api/v1/data/topping"),
          ]);

        const pizzaList = pizzaResponse.data.data.list;
        const crustList = crustResponse.data.data.list;
        const pizzaPriceList = priceResponse.data.data.list;
        const toppingList = toppingResponse.data.data.list;

        let pizzaMap: Map<string, Pizza> = new Map();
        pizzaList.forEach((p: Pizza) => pizzaMap.set(p.pizzaId!, p));

        let crustMap = new Map<string, string>();
        for (let cr of crustList) {
          crustMap.set(cr.crustId, cr.crust);
        }

        const sideList = [
          { name: "Cold Drink", price: 55, qty: 100 },
          { name: "MousseCake", price: 90, qty: 100 },
        ];

        //creating toppingMap
        let toppingMap: Map<string, Topping> = new Map();
        for (let t of toppingList) {
          toppingMap.set(t.toppingId, t);
        }
        //customising toppingList as per type :
        //Veg type pizza can have only VEG Toppings
        //NonVeg type pizza can have NonVeg + Veg Toppings(except PANEER)

        //toppingList for VEG :should contain only VEG toppings
        const vegToppingList = toppingList.filter((t: Topping) => {
          return t.type === "VEG";
        });

        //toppingList for NonVeg Type Pizza : nonVegToppingList_veg
        const nonVegToppingList_veg = toppingList.filter((t: Topping) => {
          return t.type === "VEG" && t.name !== "Paneer";
        });

        //toppingList for NonVeg Type Pizza : nonVegToppingList_nonVeg
        const nonVegToppingList_nonVeg = toppingList.filter((t: Topping) => {
          return t.type === "NON_VEG";
        });

        //
        setInitData({
          pizzaList,
          pizzaMap,
          crustList,
          crustMap,
          pizzaPriceList,
          toppingList,
          toppingMap,
          vegToppingList,
          nonVegToppingList_veg,
          nonVegToppingList_nonVeg,
          sideList,
          loading: false,
        });
        console.log(
          "=====>Fetched Data Details ====================================="
        );
        console.log({
          pizzaList,
          pizzaMap,
          crustList,
          crustMap,
          pizzaPriceList,
          toppingList,
          toppingMap,
          vegToppingList,
          nonVegToppingList_veg,
          nonVegToppingList_nonVeg,
          sideList,
        });

        // console.log("Fetched pizzaList = " + pizzaList.length);
        // console.log("Fetched crustList = " + crustList.length);
        // console.log("Fetched crustMap ====>= " + crustMap);
        // crustMap.forEach((k, v) => console.log("Key:" + k + "  " + v));
        // console.log("Fetched pizzaPriceList = " + pizzaPriceList.length);
        // console.log("Fetched ToppingList = " + toppingList.length);
        // console.log("Fetched ToppingMap = " + toppingMap.size);
        // console.log("Fetched vegToppingList = " + vegToppingList.length);
        // console.log(
        //   "Fetched nonVegToppingList_veg = " + nonVegToppingList_veg.length
        // );
        // console.log(
        //   "Fetched nonVegToppingList_nonVeg = " +
        //     nonVegToppingList_nonVeg.length
        // );

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
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <Header />
        <div className="blockAfterHeader"></div>
        <div className="outlet">
          <InitDataContext.Provider value={initData}>
            <OrderLineContextProvider>
              <Outlet />
            </OrderLineContextProvider>
          </InitDataContext.Provider>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default RootLayout;
