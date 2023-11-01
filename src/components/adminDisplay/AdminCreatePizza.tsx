import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Collapse,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreatePizza.module.css";
import { Pizza } from "../interfaces/pizzaInterface";
import axios from "axios";

type curProps = {
  pizzaList: Pizza[];
  dispatchToPizzaStateReducer: (input: any) => void;
};

const AdminCreatePizza = (props: curProps) => {
  const [showPizzaForm, setShowPizzaForm] = useState(false);
  const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
  const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");

  const handleCreatePizzaFormSubmit = (e: any) => {
    e.preventDefault();
    const newPizza: Pizza = {
      name: e.target.pizzaName.value,
      description: e.target.pizzaDescription.value,
      type: e.target.pizzaType.value,
      imageUrl: e.target.pizzaImageUrl.value,
    };
    //console.log(newPizza);

    axios
      .post("http://localhost:8080/api/v1/pizzas", newPizza)
      .then((resp) => {
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
        }
      })
      .catch((err) => {
        setFormSubmitStatus_Fail("Failed to create new pizza");
        setTimeout(() => {
          setFormSubmitStatus_Fail("");
        }, 3000);
      });
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
          <Form onSubmit={handleCreatePizzaFormSubmit}>
            <div className={`col-11 me-auto  ${styles.pizzaForm}`}>
              <Row>
                <FormLabel htmlFor="pizzaName">
                  Enter Pizza Name :<FormControl type="text" name="pizzaName" />
                </FormLabel>
              </Row>
              <Row>
                <FormLabel htmlFor="pizzaDescription">
                  Enter Pizza Description :
                  <FormControl type="text" name="pizzaDescription" />
                </FormLabel>
              </Row>
              <Row>
                <FormLabel htmlFor="pizzaType">Select Pizza Type :</FormLabel>
                <FormSelect name="pizzaType" defaultValue="VEG">
                  <option disabled>----choose pizza type----</option>
                  <option value={"VEG"}>VEG</option>
                  <option value={"NON_VEG"}>NON_VEG</option>
                </FormSelect>
              </Row>
              <Row>
                <FormLabel htmlFor="pizzaImageUrl">
                  Enter Pizza Image URL :
                </FormLabel>
                <FormControl
                  type="text"
                  name="pizzaImageUrl"
                  placeholder={"https://tinyurl.com/pizza-002"}
                />
              </Row>

              <Row>
                <Col>
                  <Button type="submit" variant="success">
                    Submit
                  </Button>{" "}
                </Col>
                <Col>
                  <Button type="reset" variant="danger">
                    RESET
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
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default AdminCreatePizza;
