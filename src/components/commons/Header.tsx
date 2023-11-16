import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../images/pizza_logo.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
        <Navbar bg="primary" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/home">
              <img
                alt="logo"
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top "
              />
              <b className="ms-2">Pizza Palace 2.0</b>
            </Navbar.Brand>
            <Nav className="headerMenus d-flex p-1 gap-2" style={{}}>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "activeHeaderMenu" : "inactiveHeaderMenu"
                }
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/orderCart"
                className={({ isActive }) =>
                  isActive ? "activeHeaderMenu" : "inactiveHeaderMenu"
                }
                end
              >
                OrderCart
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "activeHeaderMenu" : "inactiveHeaderMenu"
                }
                end
              >
                Admin
              </NavLink>
              <NavLink
                to="/signIn"
                className={({ isActive }) =>
                  isActive ? "activeHeaderMenu" : "inactiveHeaderMenu"
                }
                end
              >
                SignIn
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "activeHeaderMenu" : "inactiveHeaderMenu"
                }
                end
              >
                Register
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default Header;
