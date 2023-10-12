import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <React.Fragment>
      <div className="borderline container-fluid" style={{}}>
        <Navbar bg="light" data-bs-theme="light">
          <div>
            <Navbar.Brand href="#home">Yummy Pizza</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </div>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default Header;
