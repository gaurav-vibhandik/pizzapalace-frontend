import React from "react";
import Header from "../commons/Header";
import Footer from "../commons/Footer";
import OrderCart from "../orderCart/OrderCart";

const OrderCartPage = () => {
  return (
    <React.Fragment>
      <div
        style={{
          border: "3px solid yellow",
          minHeight: "100vh",
          backgroundColor: "cyan",
        }}
      >
        <Header />
        <OrderCart />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default OrderCartPage;
