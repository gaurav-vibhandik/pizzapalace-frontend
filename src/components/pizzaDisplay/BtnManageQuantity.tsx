import React, { useState } from "react";
import styles from "./BtnManageQuantity.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";

const BtnManageQuantity = (props: any) => {
  const [pizzaQty, setPizzaQty] = useState(1);

  const handleAddQuantity = () => {
    setPizzaQty((prevState) => {
      return prevState + 1;
    });
  };

  const handleRemoveQuantity = () => {
    setPizzaQty((prevState) => {
      if (prevState == 1) {
        props.onZeroQuantity(false);
      }
      return prevState - 1;
    });
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row className={styles.container}>
          <Col>
            <button
              type="button"
              className={styles.btnRemoveQty}
              onClick={handleRemoveQuantity}
            >
              -
            </button>
          </Col>
          <Col className={styles.qty}>{pizzaQty}</Col>

          <Col>
            <button
              type="button"
              className={styles.btnAddQty}
              onClick={handleAddQuantity}
            >
              +
            </button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default BtnManageQuantity;
