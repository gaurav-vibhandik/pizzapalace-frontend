import React, { useContext, useRef, useState } from "react";
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
import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreatePizzaPrice.module.css";
import axios from "axios";
import PizzaPrice from "../interfaces/pizzaPriceInterface";
import InitDataContext from "../../context/InitDataContext";

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

  const handleCreatePizzaPriceFormSubmit = (e: any) => {
    e.preventDefault();
    const newPizzaPrice: PizzaPrice = {
      pizzaId: e.target.pizzaId.value,
      crustId: e.target.crustId.value,
      pizzaSize: e.target.pizzaSize.value,
      price: e.target.price.value,
    };

    console.log(newPizzaPrice);
    //=========>dubugging without hitting backend===============
    // if (newPizzaPrice) {
    //   newPizzaPrice.id = 999;
    //   props.dispatchToPizzaPriceStateReducer({
    //     type: "AddPizzaPrice",
    //     item: newPizzaPrice,
    //   });
    //   setFormSubmitStatus_Success(
    //     `New PizzaPrice Entry with pizzaPriceId = ${newPizzaPrice.id}  Created Successfully !!! `
    //   );
    //   setTimeout(() => {
    //     setFormSubmitStatus_Success("");
    //   }, 4000);
    // } else {
    //   setFormSubmitStatus_Fail("Failed to create new pizzaPrice");
    //   setTimeout(() => {
    //     setFormSubmitStatus_Fail("");
    //   }, 3000);
    // }
    //<=========debugging without hitting backend===============

    axios
      .post("http://localhost:8080/api/v1/pizzaPrices", newPizzaPrice)
      .then((resp) => {
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
        }
      })
      .catch((err) => {
        setFormSubmitStatus_Fail("Entry already exists");
        console.log(err.response.data);

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
            setShowPizzaPriceForm(!showPizzaPriceForm);
          }}
        >
          <BsPlusCircle className="me-1" /> Add New PizzaPrice
        </Button>
      </div>

      <Collapse in={showPizzaPriceForm}>
        <div className={`${styles.mainFormContainer}`}>
          <Form onSubmit={handleCreatePizzaPriceFormSubmit}>
            <div className={`col-11 me-auto  ${styles.pizzaPriceForm}`}>
              <Row>
                <FormLabel htmlFor="pizzaId">
                  Enter PizzaId:
                  <FormControl type="text" name="pizzaId" placeholder="ZA001" />
                </FormLabel>
              </Row>
              <Row>
                <FormLabel htmlFor="crustId">
                  <FormSelect name="crustId" defaultValue={"NEW_HAND_TOSSED"}>
                    {crustList.map((crust) => (
                      <option
                        key={"crustKey_" + crust.crustId}
                        value={crust.crustId}
                      >
                        {crust.crust}
                      </option>
                    ))}
                  </FormSelect>
                </FormLabel>
              </Row>
              <Row>
                <FormLabel htmlFor="pizzaSize">
                  Select Pizza Size
                  <FormSelect name="pizzaSize" defaultValue={"REGULAR"}>
                    <option selected disabled>
                      ---choose size---
                    </option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LARGE">LARGE</option>
                  </FormSelect>
                </FormLabel>
              </Row>
              <Row>
                <FormLabel htmlFor="price">
                  Enter Price :
                  <FormControl type="number" name="price" />
                </FormLabel>
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

export default AdminCreatePizzaPrice;
