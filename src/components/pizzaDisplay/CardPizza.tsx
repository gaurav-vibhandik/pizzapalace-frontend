import React, { useRef, useState } from "react";
import styles from "./CardPizza.module.css";
import {
  Button,
  Card,
  Col,
  Form,
  FormLabel,
  Row,
  Image,
} from "react-bootstrap";
import { Pizza } from "../interfaces/pizzaInterface";
import { pizzaCardPriceList } from "../interfaces/pizzaCardInterface";
import vegLogo from "../images/vegFoodLogo_32x32.png";
import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
import BtnManageQuantity from "./BtnManageQuantity";
import { orderLine } from "../interfaces/orderLineInterface";

const CardPizza = (props) => {
  const 

  let priceList: pizzaCardPriceList[] = [
    { size: "REGULAR", price: props.priceRegularSize },
    { size: "MEDIUM", price: props.priceMediumSize },
    { size: "LARGE", price: props.priceLargeSize },
  ];

  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const chooseSize: any = useRef(null);
  const chooseCrust: any = useRef(null);

  const handleAddToCart = (event: any) => {
    event.preventDefault();
    setIsAddToCartClicked(true);
    const ol: orderLine = {
      pizzaId: props.pizzaId,
      size: chooseSize.current.value,
      crustType: chooseCrust.current.value,
      quantity: 1,
    };

    console.log(ol);
  };

  return (
    <React.Fragment>
      {/* <Card id={props.pizzaId} className={styles.myPizzaCard}>
        <div className={styles.pizzaImageSection}>
          <Card.Img variant="top" src={props.imageUrl} />
          <Image
            className={styles.pizzaFoodTypeLogo}
            src={props.type == "VEG" ? vegLogo : nonVegLogo}
            alt={props.type == "VEG" ? "vegLogo" : "nonVegLogo"}
          />
          <div
            className={styles.pizzaPrice}
          >{`Rs. ${props.priceRegularSize}`}</div>
        </div>

        <Card.Body>
          <Card.Title className={styles.pizzaCardTitle}>
            {props.name}
          </Card.Title>
          <Card.Text className={styles.pizzaCardDescription}>
            {props.description}
          </Card.Text>
          <hr />
          <div className="form" onSubmit={handleAddToCart}>
            <Row className={styles.selectContainer}>
              <Col className={styles.myPizzaSizeSelect}>
                <FormLabel htmlFor="chooseSize" className={styles.myCardLabel}>
                  Size
                </FormLabel>
                <Form.Select
                  ref={chooseSize}
                  id="chooseSize"
                  className={styles.myCardSelect}
                  size="sm"
                >
                  {priceList.map((pizzaPrice) => (
                    <option key={props.pizzaId} value={pizzaPrice.size}>
                      {`${pizzaPrice.size}   Rs.${pizzaPrice.price}`}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col className={styles.myPizzaCrustSelect}>
                <FormLabel htmlFor="chooseCrust" className={styles.myCardLabel}>
                  Crust
                </FormLabel>
                <Form.Select
                  ref={chooseCrust}
                  id="chooseCrust"
                  size="sm"
                  className={styles.myCardSelect}
                >
                  <option selected value="New Hand Tossed">
                    New Hand Tossed
                  </option>
                  <option value="100% Wheat Thin Crust">
                    100% Wheat Thin Crust
                  </option>
                  <option value="Cheese Burst">Cheese Burst</option>
                  <option value="Fresh Pan Pizza">Fresh Pan Pizza</option>
                </Form.Select>
              </Col>
            </Row>

            <hr />

            <div>
              <Row>
                <Col>
                  <button
                    onClick={handleAddToCart}
                    type="submit"
                    className={styles.btnAddToCart}
                  >
                    Add to Cart
                  </button>
                </Col>
                <Col>
                  {isAddToCartClicked && (
                    <BtnManageQuantity onZeroQuantity={setIsAddToCartClicked} />
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card> */}
    </React.Fragment>
  );
};

export default CardPizza;
