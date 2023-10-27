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
import styles from "./CardOrderLine.module.css";
import BtnManageQuantity from "../BtnManageQuantity";
import OrderLineContext from "../../context/orderLineContext";
import OrderLine from "../interfaces/orderLineInterface";
import ModalPizzaCard from "./ModalPizzaCard";

const CardOrderLine = (props: any) => {
  const ol: OrderLine = props.ol;
  const onReplace = props.onReplace;
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
                      <li key={t.toppingId}>{toppingMap.get(t)!.name}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </Card>

      <div className="myPizzaEditModal">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Pizza Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="myEditPizzaModalBody">
              <ModalPizzaCard
                myPizza={pizzaMap.get(ol.pizzaId)}
                oldOl={ol}
                onReplace={onReplace}
                onHandleClose={handleClose}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default CardOrderLine;

// =======> Approach Using Bootstrap Modal :
// import React, { useContext } from "react";
// import InitDataContext from "../../context/InitDataContext";
// import { Pizza } from "../interfaces/pizzaInterface";
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import vegLogo from "../images/vegFoodLogo_32x32.png";
// import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
// import styles from "./CardOrderLine.module.css";
// import BtnManageQuantity from "../BtnManageQuantity";
// import OrderLineContext from "../../context/orderLineContext";
// import OrderLine from "../interfaces/orderLineInterface";
// import ModalPizzaCard from "./ModalPizzaCard";

// const CardOrderLine = (props: any) => {
//   const ol: OrderLine = props.ol;
//   const initData = useContext(InitDataContext);
//   const pizzaMap: Map<string, Pizza> = initData.pizzaMap;
//   const crustMap: any = initData.crustMap;
//   const curPizza: Pizza | any = pizzaMap.get(ol.pizzaId);
//   const curPizzaSize = ol.size;
//   const curPizzaCrust: string = crustMap.get(ol.crustId);
//   const orderLineContext = useContext(OrderLineContext);

//   const toppingMap = initData.toppingMap;

//   //Handling Customize Orderline
//   const handleCustomizeOrderLine = () => {
//     let pizzaToChange = pizzaMap.get(ol.pizzaId)!;
//   };

//   //====> Debugging ==========
//   // if (ol.pizzaId == "ZA004") {
//   //   console.log("CrustMap = " + crustMap.size);
//   //   console.log(crustMap.get("CR02"));
//   // }

//   //<======================

//   return (
//     <React.Fragment>
//       <Card className={styles.orderLineCard}>
//         <Container fluid>
//           <Row>
//             <Col className="col-4">
//               <div>
//                 <div className="{styles.imageSection} {styles.borderLine}">
//                   <Card.Img
//                     className={styles.pizzaImg}
//                     variant="top"
//                     src={curPizza.imageUrl}
//                   />
//                   <img
//                     className={styles.foodTypeLogo}
//                     src={curPizza.type == "VEG" ? vegLogo : nonVegLogo}
//                     alt={curPizza.type == "VEG" ? "vegLogo" : "nonVegLogo"}
//                   />
//                 </div>
//                 <div className={`container ${styles.btnOrderCartManageQty}`}>
//                   <BtnManageQuantity
//                     quantity={ol.quantity}
//                     handleBtnAdd={() => orderLineContext.addToOrderLineList(ol)}
//                     handleBtnRemove={() =>
//                       orderLineContext.removeFromOrderLineList(ol)
//                     }
//                   />
//                 </div>
//                 <div className={styles.olPrice}>
//                   <p>{`Rs. ${ol.totalPrice * ol.quantity} /-`}</p>
//                 </div>
//               </div>
//             </Col>
//             <Col className="col-8">
//               <Card.Body>
//                 <Card.Title className={styles.olCardTitle}>
//                   {curPizza.name}
//                 </Card.Title>
//                 <Card.Text className={styles.olCardDescription}>
//                   <div className={styles.actualOlDescription}>
//                     <p>{curPizza.description}</p>
//                   </div>
//                   <div className={styles.sizeAndCrustDetails}>
//                     <p>
//                       <b>
//                         <i>{curPizzaSize}</i>
//                       </b>
//                       {`   |   `}
//                       {curPizzaCrust}
//                     </p>
//                   </div>
//                   <div className={styles.toppingDetails}>
//                     {ol.extraCheese && <b>Extra Cheese</b>}
//                   </div>

//                   <div>
//                     <Button
//                       className="btn btn-primary"
//                       type="button"
//                       data-bs-toggle="modal"
//                       data-bs-target="#staticBackdrop"
//                     >
//                       Customize
//                     </Button>
//                   </div>
//                 </Card.Text>
//               </Card.Body>
//             </Col>
//           </Row>
//           <Row>
//             {ol.toppingList.length > 0 && (
//               <div>
//                 <p>Added Toppings: </p>
//                 <ul className={styles.toppingDetails}>
//                   {ol.toppingList.map((t: any) => (
//                     <li key={t.toppingId}>{toppingMap.get(t)!.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </Row>
//         </Container>
//       </Card>

//       <div className="myPizzaEditModal">
//         <button
//           type="button"
//           className="btn btn-primary"
//           data-bs-toggle="modal"
//           data-bs-target="#staticBackdrop"
//         >
//           Launch
//         </button>

//         <div
//           className="modal modal fade"
//           id="staticBackdrop"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           aria-labelledby="staticBackdropLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                   Modal title
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <ModalPizzaCard myPizza={pizzaMap.get(ol.pizzaId)} />
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary">
//                   Understood
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default CardOrderLine;
