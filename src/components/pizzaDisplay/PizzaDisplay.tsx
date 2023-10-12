import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const PizzaDisplay = () => {
  return (
    <React.Fragment>
      <div className="container-fluid pizzaDisplay">
        <div
          data-bs-spy="scroll"
          data-bs-target="#menu"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          className="scrollspy-example bg-body-tertiary p-3 rounded-2"
          tabIndex={-1}
        >
          <div id="scrollSpyVeg" className="veg container-fluid ">
            <h2>VegPizza Details</h2>
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
//         <div>
//           <Navbar className="menu">
//             <Container fluid style={{ border: "3px solid red", width: "100%" }}>
//               <Navbar.Brand>Menu ==)</Navbar.Brand>
//               <Nav className="me-auto nav-pills">
//                 <Nav.Link href="#scrollSpyVeg">Veg Pizza</Nav.Link>
//                 <Nav.Link href="#scrollSpyNonVeg">Non-veg Pizza</Nav.Link>
//                 <Nav.Link href="#scrollSpySides">Sides</Nav.Link>
//               </Nav>
//             </Container>
//           </Navbar>
//         </div>

//         <div
//           data-bs-spy="scroll"
//           data-bs-target="#menu"
//           data-bs-root-margin="0px 0px -40%"
//           data-bs-smooth-scroll="true"
//           className="scrollspy-example bg-body-tertiary p-3 rounded-2"
//           tabIndex={0}
//         >
//           <div id="scrollSpyVeg" className="veg container-fluid ">
//             <h2>VegPizza Details</h2>
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
