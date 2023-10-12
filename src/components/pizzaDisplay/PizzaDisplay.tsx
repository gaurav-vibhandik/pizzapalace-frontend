import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { Pizza } from "../interfaces/pizzaInterface";
import CardPizza from "./CardPizza";

const PizzaDisplay = () => {
  const [pizzaList, setPizzaList] = useState<Pizza[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/pizzas")
      .then((resp) => {
        let myList: Pizza[] = resp.data.data.list;
        console.log(myList);
        setPizzaList(myList);

        console.log(pizzaList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid pizzaDisplay">
        <div
          data-bs-spy="scroll"
          data-bs-target="#menu"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          className="scrollspy-example bg-body-tertiary p-3 rounded-2"
          tabIndex={0}
        >
          <div id="scrollSpyVeg" className="veg container-fluid ">
            {pizzaList.length > 0 &&
              pizzaList.map((p) => <CardPizza key={p.pizzaId} {...p} />)}
          </div>
          <div id="scrollSpyNonVeg" className="container-fluid  nonVeg">
            <h2>Non-veg Pizza Details</h2>
          </div>
          <div id="scrollSpySides" className="container-fluid  sides">
            <h2>Sides Details</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PizzaDisplay;

// import React from "react";
// import { Container, Nav, Navbar } from "react-bootstrap";

// const PizzaDisplay = () => {
//   return (
//     <React.Fragment>
//       <div className="container-fluid pizzaDisplay">
//         <div
//           data-bs-spy="scroll"
//           data-bs-target="#menu"
//           data-bs-root-margin="0px 0px -40%"
//           data-bs-smooth-scroll="true"
//           className="scrollspy-example bg-body-tertiary p-3 rounded-2"
//           tabIndex={0}
//         >
//           <div id="scrollSpyVeg" className="veg container-fluid ">

//           </div>
//           <div id="scrollSpyNonVeg" className="container-fluid  nonVeg">
//             <h2>Non-veg Pizza Details</h2>
//           </div>
//           <div id="scrollSpySides" className="container-fluid  sides">
//             <h2>Sides Details</h2>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default PizzaDisplay;
