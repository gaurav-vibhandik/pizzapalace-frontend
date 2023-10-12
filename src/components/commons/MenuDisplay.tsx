import React from "react";

const MenuDisplay = () => {
  return (
    <React.Fragment>
      <nav id="menu" className="navbar bg-body-tertiary px-3 mb-3">
        {/* <a className="navbar-brand">Menu ==) </a> */}
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link" href="#scrollSpyVeg">
              Veg Pizza
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#scrollSpyNonVeg">
              Non-veg Pizza
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#scrollSpySides">
              Sides
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default MenuDisplay;
