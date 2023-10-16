import React from "react";
import Header from "../commons/Header";
import ContentDisplay from "../commons/ContentDisplay";
import Footer from "../commons/Footer";
import MenuDisplay from "../commons/MenuDisplay";

const HomePage = () => {
  return (
    <React.Fragment>
      <div
        style={{
          border: "3px solid yellow",
          minHeight: "100vh",
          position: "static",
        }}
      >
        <Header />
        {/* <MenuDisplay /> */}
        <ContentDisplay />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
