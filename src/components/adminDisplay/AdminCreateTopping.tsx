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
import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreateTopping.module.css";
import axios from "axios";
import Topping from "../interfaces/toppingInterface";

type curProps = {
  toppingList: Topping[];
  dispatchToToppingStateReducer: (input: any) => void;
};

const AdminCreateTopping = (props: curProps) => {
  const [showToppingForm, setShowToppingForm] = useState(false);
  const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
  const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");

  const handleCreateToppingFormSubmit = (e: any) => {
    e.preventDefault();
    const newTopping: Topping = {
      name: e.target.toppingName.value,
      type: e.target.toppingType.value,
      price: e.target.toppingPrice.value,
      quantity: e.target.toppingQuantity.value,
    };
    console.log(newTopping);

    axios
      .post("http://localhost:8080/api/v1/toppings", newTopping)
      .then((resp) => {
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
        }
      })
      .catch((err) => {
        setFormSubmitStatus_Fail("Failed to create new topping");
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
            setShowToppingForm(!showToppingForm);
          }}
        >
          <BsPlusCircle className="me-1" /> Add New Topping
        </Button>
      </div>

      <Collapse in={showToppingForm}>
        <div className={`${styles.mainFormContainer}`}>
          <Form onSubmit={handleCreateToppingFormSubmit}>
            <div className={`col-11 me-auto  ${styles.toppingForm}`}>
              <Row>
                <FormLabel htmlFor="toppingName">
                  Enter Topping Name :
                  <FormControl type="text" name="toppingName" />
                </FormLabel>
              </Row>
              <Row>
                <FormLabel htmlFor="toppingType">
                  Select Topping Type :
                </FormLabel>
                <FormSelect name="toppingType" defaultValue="VEG">
                  <option disabled>----choose topping type----</option>
                  <option value={"VEG"}>VEG</option>
                  <option value={"NON_VEG"}>NON_VEG</option>
                </FormSelect>
              </Row>
              <Row>
                <FormLabel htmlFor="toppingPrice">
                  Enter Topping Price :
                </FormLabel>
                <FormControl
                  type="number"
                  name="toppingPrice"
                  min={0}
                  defaultValue={0}
                />
              </Row>
              <Row>
                <FormLabel htmlFor="toppingQuantity">
                  Enter Topping Quantity :
                </FormLabel>
                <FormControl
                  type="number"
                  name="toppingQuantity"
                  min={0}
                  defaultValue={0}
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

export default AdminCreateTopping;
