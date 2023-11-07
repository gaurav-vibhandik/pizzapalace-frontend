import React, { useRef, useState } from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreateTopping.module.css";
import axios from "axios";
import Topping from "../interfaces/toppingInterface";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikValues,
  FormikHandlers,
} from "formik";
import { ValidationSchemaForAdminDisplay_CreateToppingForm } from "../../formik schemas/adminPageSchemas";
import DisplayFormError from "./DisplayFormError";

type curProps = {
  toppingList: Topping[];
  dispatchToToppingStateReducer: (input: any) => void;
};

const AdminCreateTopping = (props: curProps) => {
  const [showToppingForm, setShowToppingForm] = useState(false);
  const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
  const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");

  const initialValues = {
    name: "",
    type: "",
    price: 0,
    quantity: 0,
  };

  const handleCreateToppingFormSubmit = async (
    values: FormikValues,
    formikHandlers: FormikHandlers | any
  ) => {
    try {
      const resp = await axios.post(
        "http://localhost:8080/api/v1/toppings",
        values
      );

      if (resp.data.success) {
        const createdTopping = resp.data.data.list[0];
        console.log(createdTopping);

        setFormSubmitStatus_Success(
          `New Topping Entry with toppingId = ${resp.data.data.list[0].toppingId}  Created Successfully !!! `
        );
        //update the reducerToppingState so that table reloads with latest state data
        props.dispatchToToppingStateReducer({
          type: "AddTopping",
          item: createdTopping,
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
        setFormSubmitStatus_Fail("Failed to create new topping");
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
        setFormSubmitStatus_Fail("Topping entry already exists !!!");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 3000);

        // resetting the form;
        formikHandlers.resetForm({ ...initialValues });
        formikHandlers.setSubmitting(false);
      } else {
        setFormSubmitStatus_Fail("Failed to create new topping");
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
            setShowToppingForm(!showToppingForm);
          }}
        >
          <BsPlusCircle className="me-1" /> Add New Topping
        </Button>
      </div>

      <Collapse in={showToppingForm}>
        <div className={`${styles.mainFormContainer}`}>
          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchemaForAdminDisplay_CreateToppingForm}
            onSubmit={handleCreateToppingFormSubmit}
            validateOnBlur={true}
            validateOnChange={true}
          >
            {(formik) => {
              // console.log(
              // "🚀 ~ file: AdminCreateTopping.tsx:103 ~ AdminCreateTopping ~ formik:",
              // formik
              // );

              return (
                <Form>
                  <div className={`col-11 ${styles.toppingForm}`}>
                    <Row>
                      <label htmlFor="name">Enter Topping Name :</label>
                      <Field type="text" name="name" />
                      <ErrorMessage name="name" component={DisplayFormError} />
                    </Row>
                    <Row>
                      <label htmlFor="type">Select Topping Type :</label>
                      <Field as="select" name="type">
                        <option disabled selected value={""}>
                          ----choose pizza type----
                        </option>
                        <option value={"VEG"}>VEG</option>
                        <option value={"NON_VEG"}>NON_VEG</option>
                      </Field>
                      <ErrorMessage name="type" component={DisplayFormError} />
                    </Row>
                    <Row>
                      <label htmlFor="price">Enter Topping Price :</label>
                      <Field type="number" name="price" />
                      <ErrorMessage name="price" component={DisplayFormError} />
                    </Row>
                    <Row>
                      <label htmlFor="quantity">Enter Topping Quantity :</label>
                      <Field type="number" name="quantity" />
                      <ErrorMessage
                        name="quantity"
                        component={DisplayFormError}
                      />
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
              );
            }}
          </Formik>
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default AdminCreateTopping;
