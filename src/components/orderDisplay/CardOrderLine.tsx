import React, { useContext } from "react";
import InitDataContext from "../../context/InitDataContext";
import { Pizza } from "../interfaces/pizzaInterface";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import vegLogo from "../images/vegFoodLogo_32x32.png";
import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
import styles from "./CardOrderLine.module.css";
import BtnManageQuantity from "../BtnManageQuantity";
import OrderLineContext from "../../context/orderLineContext";

const CardOrderLine = (props: any) => {
  const ol = props.ol;
  const initData = useContext(InitDataContext);
  const pizzaMap: Map<string, Pizza> = initData.pizzaMap;
  const crustMap: any = initData.crustMap;
  const curPizza: Pizza | any = pizzaMap.get(ol.pizzaId);
  const curPizzaSize = ol.size;
  const curPizzaCrust: any = crustMap.get(ol.crustId).crust;
  const orderLineContext = useContext(OrderLineContext);

  return (
    <React.Fragment>
      <Card className={styles.orderLineCard}>
        <Container fluid>
          <Row>
            <Col>
              <div
                className={`col-4 ${styles.imageSection} ${styles.borderLine} `}
              >
                <Card.Img
                  className={styles.pizzaImg}
                  variant="top"
                  src={curPizza.imageUrl}
                />
                <img
                  className={styles.foodTypeLogo}
                  src={curPizza.type == "VEG" ? vegLogo : nonVegLogo}
                  alt={curPizza.type == "VEG" ? "vegLogo" : "nonVegLogo"}
                />
              </div>
              <div className={styles.btnOrderCartManageQty}>
                <BtnManageQuantity
                  quantity={ol.quantity}
                  handleBtnAdd={() => orderLineContext.addToOrderLineList(ol)}
                  handleBtnRemove={() =>
                    orderLineContext.removeFromOrderLineList(ol)
                  }
                />
              </div>
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
