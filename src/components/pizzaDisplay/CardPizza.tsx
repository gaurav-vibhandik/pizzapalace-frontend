import React, { useState } from "react";
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

const CardPizza = (props: Pizza) => {
  let priceList: pizzaCardPriceList[] = [
    { size: "REGULAR", price: props.priceRegularSize },
    { size: "MEDIUM", price: props.priceMediumSize },
    { size: "LARGE", price: props.priceLargeSize },
  ];

  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

  const handleAddToCart = () => {
    setIsAddToCartClicked(true);
  };

  return (
    <Card id={props.pizzaId} className={styles.myPizzaCard}>
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
        <Card.Title className={styles.pizzaCardTitle}>{props.name}</Card.Title>
        <Card.Text className={styles.pizzaCardDescription}>
          {props.description}
        </Card.Text>
        <hr />
        <Row className={styles.selectContainer}>
          <Col className={styles.myPizzaSizeSelect}>
            <FormLabel htmlFor="choosePizzaSize" className={styles.myCardLabel}>
              Size
            </FormLabel>
            <Form.Select
              id={styles.choosePizzaSize}
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
              id={styles.chooseCrust}
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
                type="button"
                className={styles.btnAddToCart}
                onClick={handleAddToCart}
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
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
