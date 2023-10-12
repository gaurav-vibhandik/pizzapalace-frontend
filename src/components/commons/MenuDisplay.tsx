import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const MenuDisplay = () => {
  return (
    <React.Fragment>
      <Navbar id="menu" className="menu navbar  px-3 mb-3">
        <Container>
          <Nav className="nav-pills">
            <Nav.Link href="#scrollSpyVeg">Veg Pizza</Nav.Link>
            <Nav.Link href="#scrollSpyNonVeg">Non-veg Pizza</Nav.Link>
            <Nav.Link href="#scrollSpySides">Sides</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default MenuDisplay;

// import React from "react";

// const MenuDisplay = () => {
//   return (
//     <React.Fragment>
//       <nav id="menu" className="navbar bg-body-tertiary px-3 mb-3">
//         {/* <a className="navbar-brand">Menu ==) </a> */}
//         <ul className="nav nav-pills">
//           <li className="nav-item">
//             <a className="nav-link" href="#scrollSpyVeg">
//               Veg Pizza
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#scrollSpyNonVeg">
//               Non-veg Pizza
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#scrollSpySides">
//               Sides
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </React.Fragment>
//   );
// };

// export default MenuDisplay;
