import axios from "axios";
import React from "react";

const OrderCart = () => {
  axios
    .get("http://localhost:8080/api/v1/orders")
    .then((resp) => {
      console.log(resp.data.data.list);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <React.Fragment>
      <div className="orderCart">
        <div className="container text-align-center m-5 ">
          <h2>This is Order Cart</h2>
          <h2>This is Order Cart</h2>
          <h2>This is Order Cart</h2>
          <h2>This is Order Cart</h2>
          <h2>This is Order Cart</h2>
          <h2>This is Order Cart</h2>
          <h2>This is Order Cart</h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderCart;
