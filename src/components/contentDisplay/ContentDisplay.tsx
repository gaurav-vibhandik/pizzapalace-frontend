import React, { useEffect, useState } from "react";
import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
import OrderDisplay from "../orderDisplay/OrderDisplay";
import MenuDisplay from "../commons/MenuDisplay";

const ContentDisplay = () => {
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

export default ContentDisplay;

// Old ContentDisplay : display menu and provides Context to PizzaDisplay n OrderCart

// import React, { useEffect, useState } from "react";
// import PizzaDisplay from "../pizzaDisplay/PizzaDisplay";
// import OrderDisplay from "../orderDisplay/OrderDisplay";
// import MenuDisplay from "../commons/MenuDisplay";
// import axios from "axios";
// import InitDataContext from "../../context/InitDataContext";
// import OrderLineContextProvider from "../../context/OrderLineContextProvider";
// import { Pizza } from "../interfaces/pizzaInterface";
// import { Crust } from "../interfaces/crustInterface";
// import Topping from "../interfaces/toppingInterface";

// const ContentDisplay = () => {
//   const [initData, setInitData] = useState({
//     pizzaList: [],
//     pizzaMap: new Map<string, Pizza>(),
//     crustMap: new Map<string, Crust>(),
//     pizzaPriceList: [],
//     toppingList: [],
//     toppingMap: new Map<string, Topping>(),
//     vegToppingList: [],
//     nonVegToppingList_veg: [],
//     nonVegToppingList_nonVeg: [],
//     sideList: [] as any,
//     loading: true, // Add a loading state
//   });

//   useEffect(() => {
//     console.log("inside useEffect");

//     // Fetch data from the server
//     const fetchData = async () => {
//       try {
//         const [pizzaResponse, crustResponse, priceResponse, toppingResponse] =
//           await Promise.all([
//             axios.get("http://localhost:8080/api/v1/pizzas"),
//             axios.get("http://localhost:8080/api/v1/crust"),
//             axios.get("http://localhost:8080/api/v1/data/pizza_price"),
//             axios.get("http://localhost:8080/api/v1/data/topping"),
//           ]);

//         const pizzaList = pizzaResponse.data.data.list;
//         const crustList = crustResponse.data.data.list;
//         const pizzaPriceList = priceResponse.data.data.list;
//         const toppingList = toppingResponse.data.data.list;

//         let pizzaMap: Map<string, Pizza> = new Map();
//         pizzaList.forEach((p: Pizza) => pizzaMap.set(p.pizzaId, p));

//         let crustMap = new Map();
//         for (let cr of crustList) {
//           crustMap.set(cr.crustId, cr.crust);
//         }

//         const sideList = [
//           { name: "Cold Drink", price: 55, qty: 100 },
//           { name: "MousseCake", price: 90, qty: 100 },
//         ];

//         //creating toppingMap
//         let toppingMap: Map<string, Topping> = new Map();
//         for (let t of toppingList) {
//           toppingMap.set(t.toppingId, t);
//         }
//         //customising toppingList as per type :
//         //Veg type pizza can have only VEG Toppings
//         //NonVeg type pizza can have NonVeg + Veg Toppings(except PANEER)

//         //toppingList for VEG :should contain only VEG toppings
//         const vegToppingList = toppingList.filter((t: Topping) => {
//           return t.type === "VEG";
//         });

//         //toppingList for NonVeg Type Pizza : nonVegToppingList_veg
//         const nonVegToppingList_veg = toppingList.filter((t: Topping) => {
//           return t.type === "VEG" && t.name !== "Paneer";
//         });

//         //toppingList for NonVeg Type Pizza : nonVegToppingList_nonVeg
//         const nonVegToppingList_nonVeg = toppingList.filter((t: Topping) => {
//           return t.type === "NON_VEG";
//         });

//         //
//         setInitData({
//           pizzaList,
//           pizzaMap,
//           crustMap,
//           pizzaPriceList,
//           toppingList,
//           toppingMap,
//           vegToppingList,
//           nonVegToppingList_veg,
//           nonVegToppingList_nonVeg,
//           sideList,
//           loading: false,
//         });
//         console.log(
//           "=====>Fetched Data Details ====================================="
//         );
//         console.log("Fetched pizzaList = " + pizzaList.length);
//         console.log("Fetched crustList = " + crustList.length);
//         console.log(
//           "Fetched crustMap = " +
//             crustMap +
//             "\n" +
//             crustMap.forEach((k, v) => console.log(k + "  " + v))
//         );
//         console.log("Fetched pizzaPriceList = " + pizzaPriceList.length);
//         console.log("Fetched ToppingList = " + toppingList.length);
//         console.log("Fetched ToppingMap = " + toppingMap.size);
//         console.log("Fetched vegToppingList = " + vegToppingList.length);
//         console.log(
//           "Fetched nonVegToppingList_veg = " + nonVegToppingList_veg.length
//         );
//         console.log(
//           "Fetched nonVegToppingList_nonVeg = " +
//             nonVegToppingList_nonVeg.length
//         );

//         console.log("<====================================\n\n");
//       } catch (error) {
//         console.log("Error in fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (initData.loading) {
//     return (
//       <div className="text-center">
//         <div className="spinner-border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     ); // Display a loading message or spinner
//   }

//   return (
//     <React.Fragment>
//       <div className="contentDisplay">
//         <MenuDisplay />
//         <InitDataContext.Provider value={initData}>
//           <OrderLineContextProvider>
//             <PizzaDisplay />
//             <OrderDisplay />
//           </OrderLineContextProvider>
//         </InitDataContext.Provider>
//       </div>
//     </React.Fragment>
//   );
// };

// export default ContentDisplay;
