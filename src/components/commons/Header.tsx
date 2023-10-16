import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../images/pizza_logo.jpg";
import MenuDisplay from "./MenuDisplay";

const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
        <Navbar bg="primary" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                alt="logo"
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top "
              />
              <b className="ms-2">Yummy Pizzas</b>
            </Navbar.Brand>
            <Nav className="" style={{}}>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#Admin">Admin</Nav.Link>
              <Nav.Link href="#SignIn">SignIn</Nav.Link>
              <Nav.Link href="#SignUp">Register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default Header;
