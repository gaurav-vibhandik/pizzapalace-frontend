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
import styles from "../adminDisplay/adminDisplay_moduleCssFiles/adminCreateCrust.module.css";
import axios from "axios";
import Crust from "../interfaces/crustInterface";

type curProps = {
  crustList: Crust[];
  dispatchToCrustStateReducer: (input: any) => void;
};

const AdminCreateCrust = (props: curProps) => {
  const [showCrustForm, setShowCrustForm] = useState(false);
  const [formSubmitStatus_Success, setFormSubmitStatus_Success] = useState("");
  const [formSubmitStatus_Fail, setFormSubmitStatus_Fail] = useState("");

  const handleCreateCrustFormSubmit = (e: any) => {
    e.preventDefault();
    const newCrust: Crust = {
      crust: e.target.crustName.value,
    };
    console.log(newCrust);

    if (newCrust) {
      newCrust.crustId = "CR999";
      props.dispatchToCrustStateReducer({
        type: "AddCrust",
        item: newCrust,
      });
      setFormSubmitStatus_Success(
        `New Crust Entry with crustId = ${newCrust.crustId}  Created Successfully !!! `
      );
      setTimeout(() => {
        setFormSubmitStatus_Success("");
      }, 4000);
    } else {
      setFormSubmitStatus_Fail("Failed to create new crust");
      setTimeout(() => {
        setFormSubmitStatus_Fail("");
      }, 3000);
    }
    // axios
    //   .post("http://localhost:8080/api/v1/crust", newCrust)
    //   .then((resp) => {
    //     if (resp.data.success) {
    //       const createdCrust = resp.data.data.list[0];
    //       console.log(createdCrust);

    //       setFormSubmitStatus_Success(
    //         `New Crust Entry with crustId = ${resp.data.data.list[0].crustId}  Created Successfully !!! `
    //       );
    //       //update the reducerCrustState so that table reloads with latest state data
    //     props.dispatchToCrustStateReducer({
    //       type: "AddCrust",
    //       item: createdCrust,
    //     });

    //     setTimeout(() => {
    //       setFormSubmitStatus_Success("");
    //     }, 4000);
    //   }
    // })
    // .catch((err) => {
    //   setFormSubmitStatus_Fail("Failed to create new crust");
    //   setTimeout(() => {
    //     setFormSubmitStatus_Fail("");
    //   }, 3000);
    //   });
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-3 ">
        <Button
          type="button"
          onClick={() => {
            setShowCrustForm(!showCrustForm);
          }}
        >
          <BsPlusCircle className="me-1" /> Add New Crust
        </Button>
      </div>

      <Collapse in={showCrustForm}>
        <div className={`${styles.mainFormContainer}`}>
          <Form onSubmit={handleCreateCrustFormSubmit}>
            <div className={`col-11 me-auto  ${styles.crustForm}`}>
              <Row>
                <FormLabel htmlFor="crustName">
                  Enter Crust Name :
                  <FormControl type="text" name="crustName" />
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

export default AdminCreateCrust;
