import React, { useEffect, useState } from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "../commons/MenuDisplay";
import axios from "axios";
import { Pizza } from "../interfaces/pizzaInterface";
import InitDataContext from "../../context/InitDataContext";
import { Crust } from "../interfaces/crustInterface";
import { PizzaPrice } from "../interfaces/pizzaPriceInterface";

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
    return <div>Loading...</div>; // Display a loading message or spinner
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

// import React, { useEffect, useState } from "react";
// import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
// import OrderDisplay from "../orderDisplay/OrderDisplay";
// import MenuDisplay from "../commons/MenuDisplay";
// import axios from "axios";
// import { Pizza } from "../interfaces/pizzaInterface";
// import InitDataContext from "../../context/InitDataContext";
// import { Crust } from "../interfaces/crustInterface";
// import { PizzaPrice } from "../interfaces/pizzaPriceInterface";

// const ContentDisplay = () => {
//   const [initData, setInitData] = useState({
//     pizzaList: [] as Pizza[],
//     crustMap: [] as any,
//     pizzaPriceList: [] as PizzaPrice[],
//     sideList: [],
//   });

//   let pizzaList: Pizza[];
//   let crustList: Crust[];
//   let pizzaPriceList: PizzaPrice[];

//   useEffect(() => {
//     console.log("\n\n==>==> Into ContentDisplay Comp : useEffect()");

//     // Fetching data from server to be used as Context
//     // Fetching Pizza list

//     axios
//       .get("http://localhost:8080/api/v1/pizzas")
//       .then((resp) => {
//         pizzaList = resp.data.data.list;
//         console.log("==>Fetched pizzaList from backend : " + pizzaList.length);
//         setInitData((prevState) => ({ ...prevState, pizzaList }));
//       })
//       .catch((err) => {
//         console.log("=> Error in fetching pizzaList get api");
//         console.log(err);
//       });

//     // Fetching available Crust Table and conveting into crustMap
//     axios
//       .get("http://localhost:8080/api/v1/crust")
//       .then((resp) => {
//         crustList = resp.data.data.list;
//         console.log("Fetched crustList is : " + crustList);
//         let crustMap = new Map();

//         for (let cr of crustList) {
//           crustMap.set(cr.crustId, cr.crust);
//         }

//         console.log("==>Fetched crustMap from backend: " + crustMap.size);

//         setInitData((prevState) => ({ ...prevState, crustMap }));
//       })
//       .catch((err) => {
//         console.log("\n==>\n==>\n==> Error in fetching crust get api");
//         console.log(err);
//       });

//     //Fetching PizzaPrice Table for all available Pizzas & crusts
//     axios
//       .get("http://localhost:8080/api/v1/data/pizza_price")
//       .then((resp) => {
//         pizzaPriceList = resp.data.data.list;
//         setInitData((prevState) => ({ ...prevState, pizzaPriceList }));
//         console.log(
//           "==>Fetched priceList from backend : " + pizzaPriceList.length
//         );
//       })
//       .catch((err) => {
//         console.log("\n==>\n==>\n==> Error in fetching pizzaPrice get api");
//         console.log(err);
//       });

//     const sideList: any = [
//       { name: "Cold Drink", price: 55, qty: 100 },
//       { name: "MousseCake", price: 90, qty: 100 },
//     ];

//     setInitData((prevState) => ({ ...prevState, sideList }));
//     console.log(
//       "=======================================================================================\n"
//     );
//   }, []);

//   return (
//     <React.Fragment>
//       <div className="contentDisplay">
//         <MenuDisplay />
//         <p>Into html body : </p>
//         <p>Fetched pizzaList = {pizzaList.length}</p>
//         {/* <InitDataContext.Provider value={initData}>
//           <PizzaDisplay />
//           <OrderDisplay />
//         </InitDataContext.Provider> */}
//       </div>
//     </React.Fragment>
//   );
// };

// export default ContentDisplay;
