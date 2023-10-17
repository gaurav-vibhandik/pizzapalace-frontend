import React from "react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Demo from "./components/commons/Demo";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <HomePage />
        {/* <Demo /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
