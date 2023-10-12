import React from "react";
import Header from "../commons/Header";
import MainDisplay from "../commons/MainDisplay";
import Footer from "../commons/Footer";

const HomePage = () => {
  return (
    <React.Fragment>
      <div
        className="borderline"
        style={{ border: "3px solid yellow", height: "100vh" }}
      >
        <Header />
        <MainDisplay />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
