import React, { useRef, useState } from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikValues,
  FormikHandlers,
} from "formik";
import { BsPlusCircle } from "react-icons/bs";
import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreatePizza.module.css";
import { Pizza } from "../interfaces/pizzaInterface";
import axios from "axios";
import { ValidationSchemaForAdminDisplay_CreatePizzaForm } from "../../formik schemas/adminPageSchemas";
import DisplayFormError from "./DisplayFormError";

type curProps = {
  pizzaList: Pizza[];
  dispatchToPizzaStateReducer: (input: any) => void;
};

const AdminCreatePizza = (props: curProps) => {
  const [showPizzaForm, setShowPizzaForm] = useState(false);
  const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
  const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");

  const initialValues = {
    name: "",
    description: "",
    type: "",
    imageUrl: "",
  };

  const handleCreatePizzaFormSubmit = async (
    values: FormikValues,
    formikHandlers: FormikHandlers | any
  ): Promise<void> => {
    // console.log(
    //   "🚀 ~ file: AdminCreatePizza.tsx:40 ~ AdminCreatePizza ~ formikHandlers:",
    //   formikHelpers
    // );
    // console.log(
    //   "🚀 ~ file: AdminCreatePizza.tsx:40 ~ AdminCreatePizza ~ values:",
    //   values
    // );

    //formikHelpers.setSubmitting(true);

    let resp;
    try {
      resp = await axios.post("http://localhost:8080/api/v1/pizzas", values);
      if (resp.data.success) {
        const createdPizza = resp.data.data.list[0];
        console.log(createdPizza);
        setFormSubmitStatus_Success(
          `New Pizza Entry with pizzaId = ${resp.data.data.list[0].pizzaId}  Created `
        );
        //update the reducerPizzaState so that table reloads with latest state data
        props.dispatchToPizzaStateReducer({
          type: "AddPizza",
          item: createdPizza,
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
        setFormSubmitStatus_Fail("Failed to create new pizza");
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
        setFormSubmitStatus_Fail("Pizza entry already exists !!!");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 3000);

        // resetting the form;
        formikHandlers.resetForm(initialValues);
        formikHandlers.setSubmitting(false);
      } else {
        setFormSubmitStatus_Fail("Failed to create new pizza");
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
            setShowPizzaForm(!showPizzaForm);
          }}
        >
          <BsPlusCircle className="me-1" /> Add New Pizza
        </Button>
      </div>

      <Collapse in={showPizzaForm}>
        <div className={`${styles.mainFormContainer}`}>
          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchemaForAdminDisplay_CreatePizzaForm}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleCreatePizzaFormSubmit}
          >
            {(formik) => {
              // console.log(
              // "🚀 ~ file: AdminCreatePizza.tsx:90 ~ AdminCreatePizza ~ formik:",
              // formik
              // );

              return (
                <Form>
                  <div className={`col-11 ${styles.pizzaForm}`}>
                    <Row>
                      <label htmlFor="name">Enter Pizza Name :</label>
                      <Field type="text" name="name" />
                      <ErrorMessage name="name" component={DisplayFormError} />
                    </Row>
                    <Row>
                      <label htmlFor="description">
                        Enter Pizza Description :
                      </label>
                      <Field type="textarea" name="description" />
                      <ErrorMessage
                        name="description"
                        component={DisplayFormError}
                      />
                    </Row>
                    <Row>
                      <label htmlFor="type">Select Pizza Type :</label>
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
                      <label htmlFor="imageUrl">Enter Pizza Image URL :</label>
                      <Field
                        type="text"
                        name="imageUrl"
                        placeholder="https://tinyurl.com/pizza-002"
                      />
                      <ErrorMessage
                        name="imageUrl"
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
                        <Button
                          type="reset"
                          variant="danger"
                          onClick={formik.handleReset}
                        >
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

export default AdminCreatePizza;

// import React, { useRef, useState } from "react";
// import { Button, Col, Collapse, Row } from "react-bootstrap";
// import {
//   Formik,
//   Field,
//   Form,
//   ErrorMessage,
//   FormikValues,
//   FormikHandlers,
// } from "formik";
// import { BsPlusCircle } from "react-icons/bs";
// import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreatePizza.module.css";
// import { Pizza } from "../interfaces/pizzaInterface";
// import axios from "axios";
// import { ValidationSchemaForAdminDisplay_CreatePizzaForm } from "../../formik schemas/adminPageSchemas";
// import DisplayFormError from "./DisplayFormError";

// type curProps = {
//   pizzaList: Pizza[];
//   dispatchToPizzaStateReducer: (input: any) => void;
// };

// const AdminCreatePizza = (props: curProps) => {
//   const [showPizzaForm, setShowPizzaForm] = useState(false);
//   const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
//   const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");

//   const initialValues = {
//     name: "",
//     description: "",
//     type: "VEG",
//     imageUrl: "",
//   };

//   const handleCreatePizzaFormSubmit = async (
//     values: FormikValues,
//     formikHandlers: FormikHandlers | any
//   ): Promise<void> => {
//     // console.log(
//     //   "🚀 ~ file: AdminCreatePizza.tsx:40 ~ AdminCreatePizza ~ formikHandlers:",
//     //   formikHelpers
//     // );
//     // console.log(
//     //   "🚀 ~ file: AdminCreatePizza.tsx:40 ~ AdminCreatePizza ~ values:",
//     //   values
//     // );

//     //formikHelpers.setSubmitting(true);

//     let resp;
//     try {
//       resp = await axios.post("http://localhost:8080/api/v1/pizzas", values);
//       if (resp.data.success) {
//         const createdPizza = resp.data.data.list[0];
//         console.log(createdPizza);
//         setFormSubmitStatus_Success(
//           `New Pizza Entry with pizzaId = ${resp.data.data.list[0].pizzaId}  Created `
//         );
//         //update the reducerPizzaState so that table reloads with latest state data
//         props.dispatchToPizzaStateReducer({
//           type: "AddPizza",
//           item: createdPizza,
//         });
//         setTimeout(() => {
//           setFormSubmitStatus_Success("");
//         }, 4000);
//         // resetting the form;
//         formikHandlers.resetForm({ ...initialValues });
//         formikHandlers.setSubmitting(false);
//       }
//     } catch (error: any) {
//       console.log(error.response.data.error.message);
//       //console.log(formikHandlers);
//       //populating <ErrorMessage> fields with Field error messages as received from backend
//       let errMapObject = error.response.data.error.message;
//       Object.getOwnPropertyNames(errMapObject).forEach((p) =>
//         formikHandlers.setFieldError(p, error.response.data.error.message[p])
//       );

//       setFormSubmitStatus_Fail("Failed to create new pizza");
//       setTimeout(() => {
//         setFormSubmitStatus_Fail("");
//       }, 3000);
//       // resetting the form;
//       formikHandlers.resetForm({ ...initialValues });
//       formikHandlers.setSubmitting(false);
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="d-flex justify-content-center mt-3 ">
//         <Button
//           type="button"
//           onClick={() => {
//             setShowPizzaForm(!showPizzaForm);
//           }}
//         >
//           <BsPlusCircle className="me-1" /> Add New Pizza
//         </Button>
//       </div>

//       <Collapse in={showPizzaForm}>
//         <div className={`${styles.mainFormContainer}`}>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={ValidationSchemaForAdminDisplay_CreatePizzaForm}
//             validateOnChange={false}
//             validateOnBlur={true}
//             onSubmit={handleCreatePizzaFormSubmit}
//           >
//             {(formik) => {
//               // console.log(
//               // "🚀 ~ file: AdminCreatePizza.tsx:90 ~ AdminCreatePizza ~ formik:",
//               // formik
//               // );

//               return (
//                 <Form>
//                   <div className={`col-11 ${styles.pizzaForm}`}>
//                     <Row>
//                       <label htmlFor="name">Enter Pizza Name :</label>
//                       <Field type="text" name="name" />
//                       <ErrorMessage name="name" component={DisplayFormError} />
//                     </Row>
//                     <Row>
//                       <label htmlFor="description">
//                         Enter Pizza Description :
//                       </label>
//                       <Field type="textarea" name="description" />
//                       <ErrorMessage
//                         name="description"
//                         component={DisplayFormError}
//                       />
//                     </Row>
//                     <Row>
//                       <label htmlFor="type">Select Pizza Type :</label>
//                       <Field as="select" name="type" defaultValue="VEG">
//                         <option disabled>----choose pizza type----</option>
//                         <option value={"VEG"}>VEG</option>
//                         <option value={"NON_VEG"}>NON_VEG</option>
//                       </Field>
//                       <ErrorMessage name="type" component={DisplayFormError} />
//                     </Row>
//                     <Row>
//                       <label htmlFor="imageUrl">Enter Pizza Image URL :</label>
//                       <Field
//                         type="text"
//                         name="imageUrl"
//                         placeholder="https://tinyurl.com/pizza-002"
//                       />
//                       <ErrorMessage
//                         name="imageUrl"
//                         component={DisplayFormError}
//                       />
//                     </Row>

//                     <Row>
//                       <Col>
//                         <Button
//                           type="submit"
//                           variant="success"
//                           disabled={!formik.isValid || formik.isSubmitting}
//                         >
//                           Submit
//                         </Button>{" "}
//                       </Col>
//                       <Col>
//                         <Button
//                           type="reset"
//                           variant="danger"
//                           onClick={formik.handleReset}
//                         >
//                           Reset
//                         </Button>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <span className={`${styles.formSubmitStatus_Success}`}>
//                         {formSubmitStatus_Success}
//                       </span>
//                       <span className={`${styles.formSubmitStatus_Fail}`}>
//                         {formSubmitStatus_Fail}
//                       </span>
//                     </Row>
//                   </div>
//                 </Form>
//               );
//             }}
//           </Formik>
//         </div>
//       </Collapse>
//     </React.Fragment>
//   );
// };

// export default AdminCreatePizza;
