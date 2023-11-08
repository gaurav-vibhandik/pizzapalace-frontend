import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const ref_s1 = useRef<any>();
  const ref_s2 = useRef<any>();
  const ref_s3 = useRef<any>();
  const ref_s4 = useRef<any>();
  const navigate = useNavigate();

  const s1 = setTimeout(() => {
    ref_s1.current.innerText = "Fetching Customer Details";
  }, 2000);
  const s2 = setTimeout(() => {
    ref_s2.current.innerText = "Doing Payment";
  }, 4000);
  const s3 = setTimeout(() => {
    ref_s3.current.innerText = "Payment Successfull";
  }, 6000);
  const s4 = setTimeout(() => {
    ref_s4.current.innerText = "Routing to OrderCart page";
  }, 8000);
  setTimeout(() => navigate("/orderCart"), 12000);

  return (
    <React.Fragment>
      <div className="container text-align-center text-bg-success">
        <h2>
          <span ref={ref_s1} className="s1"></span>
        </h2>
        <h2>
          <span ref={ref_s2} className="s2"></span>
        </h2>
        <h2>
          <span ref={ref_s3} className="s3"></span>
        </h2>
        <h2>
          <span ref={ref_s4} className="s4"></span>
        </h2>
      </div>
    </React.Fragment>
  );
};

export default CheckoutPage;
