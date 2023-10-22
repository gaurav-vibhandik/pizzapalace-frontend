import React, { useContext } from "react";
import OrderLine from "../interfaces/orderLineInterface";
import InitDataContext from "../../context/InitDataContext";
import { Pizza } from "../interfaces/pizzaInterface";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import vegLogo from "../images/vegFoodLogo_32x32.png";
import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
import styles from "./CardOrderLine.module.css";
import { Crust } from "../interfaces/crustInterface";

const CardOrderLine = (props: any) => {
  const ol = props.ol;
  const initData = useContext(InitDataContext);
  const pizzaMap: Map<string, Pizza> = initData.pizzaMap;
  const crustMap: any = initData.crustMap;
  const curPizza: Pizza | any = pizzaMap.get(ol.pizzaId);
  const curPizzaSize = ol.size;
  const curPizzaCrust: any = crustMap.get(ol.crustId).crust;

  return (
    <React.Fragment>
      <Card className={styles.orderLineCard}>
        <Container fluid>
          <Row>
            <Col
              className={`col-4 ${styles.imageSection} ${styles.borderLine} `}
            >
              <Card.Img
                variant="top"
                src={curPizza.imageUrl}
                style={{
                  border: "2px dotted red",
                  height: "40%",
                  width: "100%",
                }}
              />
              <img
                className={styles.foodTypeLogo}
                src={curPizza.type == "VEG" ? vegLogo : nonVegLogo}
                alt={curPizza.type == "VEG" ? "vegLogo" : "nonVegLogo"}
              />
            </Col>
            <Col className="col-8">
              <Card.Body>
                <Card.Title className={styles.olCardTitle}>
                  {curPizza.name}
                </Card.Title>
                <Card.Text className={styles.olCardDescription}>
                  <p>{curPizza.description}</p>
                  <p>
                    {curPizzaSize} {curPizzaCrust}
                  </p>
                  <p>{ol.orderLinePrice * ol.quantity}</p>
                  <p>qty = {ol.quantity}</p>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Card>
    </React.Fragment>
  );
};

export default CardOrderLine;
