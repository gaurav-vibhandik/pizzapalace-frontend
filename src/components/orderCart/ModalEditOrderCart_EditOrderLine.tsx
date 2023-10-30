import React, { useContext, useState } from "react";
import InitDataContext from "../../context/InitDataContext";
import { Pizza } from "../interfaces/pizzaInterface";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import vegLogo from "../images/vegFoodLogo_32x32.png";
import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
import styles from "./ModalEditOrderCart_EditOrderLine.module.css";
import BtnManageQuantity from "../BtnManageQuantity";
import OrderLineContext from "../../context/orderLineContext";
import OrderLine from "../interfaces/orderLineInterface";
import ModalEditOrderCart_EditOrderLine_EditPizzaCard from "./ModalEditOrderCart_EditOrderLine_EditPizzaCard";
import Order from "../interfaces/orderInterface";
import EditOrder_BtnManageQuantity from "./EditOrder_BtnManageQuantity";

type curProps = {
  ol: OrderLine;
  onBtnAddQuantity: (orderLineId: string) => void;
  onBtnRemoveQuantity: (orderLineId: string, curQuantity: number) => void;
  onBtnEditOrderLine: (curOl: OrderLine, newOl: OrderLine) => void;
  onBtnCancelEditOrder: () => void;
  onBtnSaveChanges: (
    newOrderData: Order,
    updatedOrderLineList: OrderLine[]
  ) => void;
};

const ModalEditOrderCart_EditOrderLine = (props: curProps) => {
  const ol: OrderLine = props.ol;
  const initData = useContext(InitDataContext);
  const pizzaMap: Map<string, Pizza> = initData.pizzaMap;
  const crustMap: any = initData.crustMap;
  const curPizza: Pizza = pizzaMap.get(ol.pizzaId)!;
  const curPizzaSize = ol.size;
  const curPizzaCrust: string = crustMap.get(ol.crustId);
  const orderLineContext = useContext(OrderLineContext);

  const toppingMap = initData.toppingMap;

  //Handling Customize Orderline
  const handleCustomizeOrderLine = () => {
    let pizzaToChange = pizzaMap.get(ol.pizzaId)!;
  };

  //====> Modal Handling :
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //====> Debugging ==========

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
                  <EditOrder_BtnManageQuantity
                    curOrderLineId={ol.orderLineId}
                    quantity={ol.quantity}
                    handleBtnAdd={props.onBtnAddQuantity}
                    handleBtnRemove={props.onBtnRemoveQuantity}
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
                  <Row>
                    <Col>
                      <div className={styles.toppingDetails}>
                        {ol.extraCheese && <b>Extra Cheese</b>}
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Button
                          variant="primary"
                          onClick={handleShow}
                          size="sm"
                        >
                          Edit Pizza
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
          <Row>
            {ol.toppingList.length > 0 && (
              <Row>
                <Col className="col-3">Added Toppings: </Col>
                <Col className="col-9">
                  <ul className={styles.toppingDetails}>
                    {ol.toppingList.map((t: any) => (
                      <li key={`${t.toppingId}_` + Math.random()}>
                        {toppingMap.get(t)!.name}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </Card>

      <div className="myPizzaEditModal">
        <Modal show={show} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>Edit Pizza Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="myEditPizzaModalBody">
              <ModalEditOrderCart_EditOrderLine_EditPizzaCard
                myPizza={pizzaMap.get(ol.pizzaId)}
                curOl={ol}
                onHandleClose={handleClose}
                onBtnEditOrderLine={props.onBtnEditOrderLine}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ModalEditOrderCart_EditOrderLine;
