import React, { useContext } from "react";
import InitDataContext from "../../context/InitDataContext";
import { Pizza } from "../interfaces/pizzaInterface";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import vegLogo from "../images/vegFoodLogo_32x32.png";
import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
import styles from "./CardOrderLine.module.css";
import BtnManageQuantity from "../BtnManageQuantity";
import OrderLineContext from "../../context/orderLineContext";
import OrderLine from "../interfaces/orderLineInterface";

const CardOrderLine = (props: any) => {
  const ol: OrderLine = props.ol;
  const initData = useContext(InitDataContext);
  const pizzaMap: Map<string, Pizza> = initData.pizzaMap;
  const crustMap: any = initData.crustMap;
  const curPizza: Pizza | any = pizzaMap.get(ol.pizzaId);
  const curPizzaSize = ol.size;
  const curPizzaCrust: string = crustMap.get(ol.crustId);
  const orderLineContext = useContext(OrderLineContext);

  const toppingMap = initData.toppingMap;

  //Handling Customize Orderline
  const handleCustomizeOrderLine = () => {
    let pizzaToChange = pizzaMap.get(ol.pizzaId)!;
  };

  //====> Debugging ==========
  // if (ol.pizzaId == "ZA004") {
  //   console.log("CrustMap = " + crustMap.size);
  //   console.log(crustMap.get("CR02"));
  // }

  //<======================

  return (
    <React.Fragment>
      <Card className={styles.orderLineCard}>
        <Container fluid>
          <Row>
            <Col className="col-4">
              <div>
                <div className="{styles.imageSection} {styles.borderLine}">
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
                <div className={`container ${styles.btnOrderCartManageQty}`}>
                  <BtnManageQuantity
                    quantity={ol.quantity}
                    handleBtnAdd={() => orderLineContext.addToOrderLineList(ol)}
                    handleBtnRemove={() =>
                      orderLineContext.removeFromOrderLineList(ol)
                    }
                  />
                </div>
                <div className={styles.olPrice}>
                  <p>{`Rs. ${ol.totalPrice * ol.quantity} /-`}</p>
                </div>
              </div>
            </Col>
            <Col className="col-8">
              <Card.Body>
                <Card.Title className={styles.olCardTitle}>
                  {curPizza.name}
                </Card.Title>
                <Card.Text className={styles.olCardDescription}>
                  <div className={styles.actualOlDescription}>
                    <p>{curPizza.description}</p>
                  </div>
                  <div className={styles.sizeAndCrustDetails}>
                    <p>
                      <b>
                        <i>{curPizzaSize}</i>
                      </b>
                      {`   |   `}
                      {curPizzaCrust}
                    </p>
                  </div>
                  <div className={styles.toppingDetails}>
                    {ol.extraCheese && <b>Extra Cheese</b>}
                  </div>

                  <div>
                    <Button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Customize
                    </Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
          <Row>
            {ol.toppingList.length > 0 && (
              <div>
                <p>Added Toppings: </p>
                <ul className={styles.toppingDetails}>
                  {ol.toppingList.map((t: any) => (
                    <li key={t.toppingId}>{toppingMap.get(t)!.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </Row>
        </Container>
      </Card>
    </React.Fragment>
  );
};

export default CardOrderLine;
