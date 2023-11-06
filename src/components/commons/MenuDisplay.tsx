import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const MenuDisplay = () => {
  return (
    <React.Fragment>
      <Navbar id="menu" className="menu navbar">
        <Container className="flex-row justify-content-center ">
          <Nav className="nav-pills">
            <Nav.Link href="#veg">Veg Pizza</Nav.Link>
            <Nav.Link href="#nonVeg">Non-Veg Pizza</Nav.Link>
            <Nav.Link href="#sides">Sides</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default MenuDisplay;
