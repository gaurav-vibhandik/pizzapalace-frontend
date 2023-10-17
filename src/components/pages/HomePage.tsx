import React from "react";
import Header from "../commons/Header";
import ContentDisplay from "../commons/ContentDisplay";
import Footer from "../commons/Footer";

const HomePage = () => {
  return (
    <React.Fragment>
      <div
        style={{
          border: "3px solid yellow",
          minHeight: "100vh",
        }}
      >
        <Header />

        <ContentDisplay />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
