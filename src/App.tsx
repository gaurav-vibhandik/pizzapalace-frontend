import React from "react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import PizzaDisplay from "./components/pizzaDisplay/PizzaDisplay";
import Header from "./components/commons/Header";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <HomePage />
      </div>
    </React.Fragment>
  );
}

export default App;
