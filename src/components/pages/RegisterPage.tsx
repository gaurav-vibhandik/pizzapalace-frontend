import React, { useState } from "react";
import Customer from "../interfaces/customerInterface";
import { ErrorMessage, Field, Form, Formik, FormikHandlers } from "formik";
import { ValidationSchemaForRegisterCustomer } from "../../formik schemas/registerPageSchemas";
import { Button, Col, Row } from "react-bootstrap";
import DisplayFormError from "../adminDisplay/DisplayFormError";
import styles from "./registerPage.module.css";
import axios from "axios";
import { BsEmojiAngry, BsEmojiAngryFill } from "react-icons/bs";

function RegisterPage() {
  const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
  const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegister = async (
    values: any,
    formikHandlers: FormikHandlers | any
  ) => {
    // console.log(
    // "🚀 ~ file: RegisterPage.tsx:24 ~ RegisterPage ~ values:",
    // values
    // );
    console.log("inside register handler");

    // console.log(
    // "🚀 ~ file: RegisterPage.tsx:26 ~ RegisterPage ~ formikHandlers:",
    // formikHandlers
    // );

    try {
      const resp = await axios.post(
        "http://localhost:8080/api/v1/customers",
        values
      );
      // console.log(
      // "🚀 ~ file: RegisterPage.tsx:33 ~ handleRegister ~ resp:",
      // resp.data
      // );
      setFormSubmitStatus_Success("Customer Registration is Successfull !!!");
      setTimeout(() => {
        setFormSubmitStatus_Success("");
      }, 5000);
      formikHandlers.resetForm({ ...initialValues });
    } catch (error: any) {
      // console.log(
      // "🚀 ~ file: RegisterPage.tsx:35 ~ handleRegister ~ error:",
      // error.response.data
      // );
      //Handling errors
      const errObj = error.response.data.error.message;
      //Case A) : handling error due to invalid fields and when received error.response.data.error.message is MAP
      if (typeof errObj == "object") {
        Object.getOwnPropertyNames(errObj).forEach((p) => {
          //console.log(p, "   ", errObj[p]);
          formikHandlers.setFieldError(p, errObj[p]);
        });
        setFormSubmitStatus_Fail("Oops failed to register...");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 5000);
      }
      //Case B) : handling error due to already registered customer
      else if (
        typeof errObj == "string" &&
        errObj.includes("duplicate key value violates")
      ) {
        setFormSubmitStatus_Fail("Customer is already registered...");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 5000);
      } else {
        //Case C):Unknown errors
        setFormSubmitStatus_Fail("Oops failed to register...");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 5000);
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.mainContainer}>
        <h2 className={styles.heading}>Registration Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchemaForRegisterCustomer}
          onSubmit={handleRegister}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {(formik) => (
            <Form>
              <div className={styles.registerForm}>
                <Row className={styles.inputName}>
                  <label htmlFor="firstName">Enter First Name :</label>
                  <Field type="text" name="firstName" />
                  <ErrorMessage name="firstName" component={DisplayFormError} />
                </Row>
                <Row className={styles.inputName}>
                  <label htmlFor="lastName">Enter Last Name :</label>
                  <Field type="text" name="lastName" />
                  <ErrorMessage name="lastName" component={DisplayFormError} />
                </Row>
                <Row className={styles.inputAddress}>
                  <label htmlFor="address">Enter Address :</label>
                  <Field as="textArea" rows={2} name="address" />
                  <ErrorMessage name="address" component={DisplayFormError} />
                </Row>
                <Row className={styles.inputPhoneNumber}>
                  <label htmlFor="phoneNumber">Enter Phone Number :</label>
                  <Field type="text" name="phoneNumber" />
                  <ErrorMessage
                    name="phoneNumber"
                    component={DisplayFormError}
                  />
                </Row>
                <Row className={styles.inputEmail}>
                  <label htmlFor="emailAddress">Enter Email Address :</label>
                  <Field type="text" name="emailAddress" />
                  <ErrorMessage
                    name="emailAddress"
                    component={DisplayFormError}
                  />
                </Row>
                <Row className={styles.inputPassword}>
                  <label htmlFor="password">Enter Password :</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component={DisplayFormError} />
                </Row>
                <Row className={styles.inputPassword}>
                  <label htmlFor="confirmPassword">Re-enter Password :</label>
                  <Field type="password" name="confirmPassword" />
                  <ErrorMessage
                    name="confirmPassword"
                    component={DisplayFormError}
                  />
                </Row>

                <Row className={styles.registerBtn}>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Register
                  </Button>
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
    </React.Fragment>
  );
}

export default RegisterPage;
