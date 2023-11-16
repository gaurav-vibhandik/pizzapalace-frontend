import React from "react";

const ErrorPage = (props: any) => {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Oops an error occured.Please try later...</h1>
      <p>Error : {props.error}</p>
    </div>
  );
};

export default ErrorPage;
