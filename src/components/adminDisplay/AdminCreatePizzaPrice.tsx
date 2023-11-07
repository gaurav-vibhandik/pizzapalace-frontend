import React, { useContext, useRef, useState } from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreatePizzaPrice.module.css";
import axios from "axios";
import PizzaPrice from "../interfaces/pizzaPriceInterface";
import InitDataContext from "../../context/InitDataContext";

import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikValues,
  FormikHandlers,
} from "formik";
import { ValidationSchemaForAdminDisplay_CreatePizzaPriceForm } from "../../formik schemas/adminPageSchemas";
import DisplayFormError from "./DisplayFormError";

type curProps = {
  pizzaPriceList: PizzaPrice[];
  dispatchToPizzaPriceStateReducer: (input: any) => void;
};

const AdminCreatePizzaPrice = (props: curProps) => {
  const initData = useContext(InitDataContext);
  const [showPizzaPriceForm, setShowPizzaPriceForm] = useState(false);
  const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
  const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");
  const crustList = initData.crustList;

  const initialValues = {
    pizzaId: "",
    crustId: "",
    pizzaSize: "",
    price: "",
  };

  const handleCreatePizzaPriceFormSubmit = async (
    values: any,
    formikHandlers: any
  ) => {
    console.log(values);

    try {
      const resp = await axios.post(
        "http://localhost:8080/api/v1/pizzaPrices",
        values
      );
      if (resp.data.success) {
        const createdPizzaPrice = resp.data.data.list[0];
        console.log(createdPizzaPrice);

        setFormSubmitStatus_Success(
          `New PizzaPrice Entry with pizzaPriceId = ${resp.data.data.list[0].id}  Created Successfully !!! `
        );
        //update the reducerPizzaPriceState so that table reloads with latest state data
        props.dispatchToPizzaPriceStateReducer({
          type: "AddPizzaPrice",
          item: createdPizzaPrice,
        });

        setTimeout(() => {
          setFormSubmitStatus_Success("");
        }, 4000);

        // resetting the form;
        formikHandlers.resetForm({ ...initialValues });
        formikHandlers.setSubmitting(false);
      }
    } catch (error: any) {
      const errObj = error.response.data.error;
      console.log(errObj.message);
      //console.log(typeof errObj.message === "object");
      //Handling if error is due to non-valid fields
      if (typeof errObj.message === "object") {
        //populating <ErrorMessage> fields with Field error messages as received from backend
        const errMapObject = errObj.message;
        Object.getOwnPropertyNames(errMapObject).forEach((p) => {
          console.log(p, "   ", errMapObject[p]);
          formikHandlers.setFieldError(p, errMapObject[p]);
        });
        setFormSubmitStatus_Fail("Failed to create new pizzaPrice");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 3000);

        // resetting the form;
        formikHandlers.resetForm({ ...initialValues });
        formikHandlers.setSubmitting(false);
      } else if (
        typeof errObj.message === "string" &&
        errObj.message.includes("duplicate key")
      ) {
        setFormSubmitStatus_Fail("PizzaPrice entry already exists !!!");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 3000);

        // resetting the form;
        formikHandlers.resetForm({ ...initialValues });
        formikHandlers.setSubmitting(false);
      } else {
        setFormSubmitStatus_Fail(
          "Invalid pizzaId.Failed to create new pizzaPrice."
        );
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 3000);

        // resetting the form;
        formikHandlers.resetForm({ ...initialValues });
        formikHandlers.setSubmitting(false);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-3 ">
        <Button
          type="button"
          onClick={() => {
            setShowPizzaPriceForm(!showPizzaPriceForm);
          }}
        >
          <BsPlusCircle className="me-1" /> Add New PizzaPrice
        </Button>
      </div>

      <Collapse in={showPizzaPriceForm}>
        <div className={`${styles.mainFormContainer}`}>
          <Formik
            initialValues={initialValues}
            validationSchema={
              ValidationSchemaForAdminDisplay_CreatePizzaPriceForm
            }
            onSubmit={handleCreatePizzaPriceFormSubmit}
            validateOnBlur={true}
            validateOnChange={true}
          >
            {(formik) => (
              <Form>
                <div className={`col-11 me-auto mb-4 ${styles.pizzaPriceForm}`}>
                  <Row>
                    <label htmlFor="pizzaId">
                      Enter PizzaId:
                      <Field type="text" name="pizzaId" placeholder="ZA001" />
                    </label>
                    <ErrorMessage name="pizzaId" component={DisplayFormError} />
                  </Row>
                  <Row>
                    <label htmlFor="crustId">
                      Select CrustType :
                      <Field as="select" name="crustId">
                        <option selected value={""} disabled>
                          ---choose crust type---
                        </option>
                        {crustList.map((crust) => (
                          <option
                            key={"crustKey_" + crust.crustId}
                            value={crust.crustId}
                          >
                            {crust.crust}
                          </option>
                        ))}
                      </Field>
                    </label>
                    <ErrorMessage name="crustId" component={DisplayFormError} />
                  </Row>
                  <Row>
                    <label htmlFor="pizzaSize">
                      Select Pizza Size:
                      <Field
                        as="select"
                        name="pizzaSize"
                        //  defaultValue={"REGULAR"}
                      >
                        <option selected value={""} disabled>
                          ---choose size---
                        </option>
                        <option value="REGULAR">REGULAR</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LARGE">LARGE</option>
                      </Field>
                    </label>
                    <ErrorMessage
                      name="pizzaSize"
                      component={DisplayFormError}
                    />
                  </Row>
                  <Row>
                    <label htmlFor="price">
                      Enter Price :
                      <Field type="number" name="price" />
                    </label>
                    <ErrorMessage name="price" component={DisplayFormError} />
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        variant="success"
                        disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Submit
                      </Button>{" "}
                    </Col>
                    <Col>
                      <Button type="reset" variant="danger">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <span className={`${styles.formSubmitStatus_Success}`}>
                      {formSubmitStatus_Success}
                    </span>
                    <span className={`${styles.formSubmitStatus_Fail}`}>
                      {formSubmitStatus_Fail}
                    </span>
                  </Row>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default AdminCreatePizzaPrice;
