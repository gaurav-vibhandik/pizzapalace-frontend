import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const MenuDisplay = () => {
  return (
    <React.Fragment>
      <Navbar id="menu" className="menu navbar">
        <Container className="flex-row justify-content-center ">
          <Nav className="nav-pills">
            <Nav.Link href="#scrollSpyVeg">Veg Pizza</Nav.Link>
            <Nav.Link href="#scrollSpyNonVeg">Non-Veg Pizza</Nav.Link>
            <Nav.Link href="#scrollSpySides">Sides</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default MenuDisplay;
