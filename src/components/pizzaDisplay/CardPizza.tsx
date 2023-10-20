import React, { useContext, useRef, useState } from "react";
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
import vegLogo from "../images/vegFoodLogo_32x32.png";
import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
import BtnManageQuantity from "./BtnManageQuantity";
import { orderLine } from "../interfaces/orderLineInterface";
import InitDataContext from "../../context/InitDataContext";
import { PizzaPrice } from "../interfaces/pizzaPriceInterface";

const CardPizza = (props: Pizza) => {
  /* Assumptions :
          //For now , not validating PizzaInventory for pizzaSize to show for given pizza.
            Showing all sizes as hardcoded
*/
  props.pizzaId == "ZA004"
    ? console.log("Rendering of CardComponent Started")
    : console.log("");

  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("REGULAR");
  const [selectedPizzaPrice, setSelectedPizzaPrice] = useState(0);

  const chooseSize: any = useRef(null);
  const chooseCrust: any = useRef(null);

  //Fetching Crust Details from CrustList for given each given pizza as per availability in PizzaPrice

  const initData = useContext(InitDataContext);
  const backendPizzaPriceList = initData.pizzaPriceList;
  const crustMap = initData.crustMap;

  const pizzaPriceListForCurrentPizza: PizzaPrice[] =
    backendPizzaPriceList.filter((p) => {
      return p.pizzaId == props.pizzaId && p.pizzaSize == selectedPizzaSize;
    });

  //==========================================
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
  //==========================================
  const handlePizzaSizeChange = () => {
    setSelectedPizzaSize(chooseSize.current.value);
  };
  //==========================================
  const handlePriceChange = () => {
    // console.log(event.target.value);
    console.log("===========>");
    const selectedSize = chooseSize.current.value;
    const selectedCrust = chooseCrust.current.value;
    console.log(
      "In handlePrice change :  " + selectedSize + "  " + selectedCrust
    );

    if (selectedSize == "" || selectedCrust == "") {
      console.log(
        "returning bcoz one of size|crust is not selected = " +
          selectedSize +
          "  " +
          selectedCrust
      );
      console.log("<==============");
      return;
    }
    const curPizza: PizzaPrice[] = pizzaPriceListForCurrentPizza.filter((p) => {
      return p.pizzaSize === selectedSize && p.crustId === selectedCrust;
    });

    if (curPizza.length == 0) {
      console.log(
        "Backend fetched pizzaPriceList in handleFunction= " +
          backendPizzaPriceList.length
      );
      console.log(
        "pizzaPriceListForCurrentPizza= " + pizzaPriceListForCurrentPizza.length
      );
      console.log(`Modified curPizza for ${props.pizzaId} for size: ${selectedSize} 
      and crustType: ${selectedCrust} =  ${curPizza.length}`);

      console.log("No price available..returning");
      console.log("<==============");
      return;
    }
    setSelectedPizzaPrice(curPizza[0].price);
    console.log("handlePriceChange exited successfully...");
    console.log("<==============");
  };
  //====================== Debugging=======>
  if (props.pizzaId == "ZA004") {
    // console.log(`===>Inside CardPizza Component ${props.pizzaId} =========`);
    // console.log("For pizzaId= " + props.pizzaId + "==========");
    // console.log("initData.crustMap = " + crustMap.size);
    // console.log(
    //   "initData.backendPizzaPriceList= " + backendPizzaPriceList.length
    // );

    // console.log(
    //   `pizzaPriceListForCurrentPizza :For pizzaId ${props.pizzaId} ,available crustTypes for size ${chooseSize} = ${pizzaPriceListForCurrentPizza.length}`
    // );
    props.pizzaId == "ZA004"
      ? console.log("Rendering of CardComponent Finished")
      : console.log("");
    console.log("<=========================");
  }
  //<=========Debugging===========================
  //===========================================================================================
  return (
    <React.Fragment>
      <Card id={props.pizzaId} className={styles.myPizzaCard}>
        <div className={styles.pizzaImageSection}>
          <Card.Img variant="top" src={props.imageUrl} />
          <Image
            className={styles.pizzaFoodTypeLogo}
            src={props.type == "VEG" ? vegLogo : nonVegLogo}
            alt={props.type == "VEG" ? "vegLogo" : "nonVegLogo"}
          />
          <div className={styles.pizzaPrice}>
            {selectedPizzaPrice != 0 && selectedPizzaPrice}
          </div>
        </div>

        <Card.Body>
          <Card.Title className={styles.pizzaCardTitle}>
            {props.name} {props.pizzaId}
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
                  onChange={handlePizzaSizeChange}
                  placeholder="Choose Pizza Size"
                >
                  <option value="" selected disabled>
                    Choose Pizza Size
                  </option>
                  <option key={props.pizzaId + "REGULAR"} value="REGULAR">
                    REGULAR
                  </option>
                  <option key={props.pizzaId + "MEDIUM"} value="MEDIUM">
                    MEDIUM
                  </option>
                  <option key={props.pizzaId + "LARGE"} value="LARGE">
                    LARGE
                  </option>
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
                  onChange={handlePriceChange}
                >
                  <option value="" selected disabled>
                    Choose Crust Type
                  </option>
                  {pizzaPriceListForCurrentPizza.map((crustWithPrice) => (
                    <option
                      key={crustWithPrice.crustId}
                      value={crustWithPrice.crustId}
                    >
                      {crustMap.get(crustWithPrice.crustId)}
                    </option>
                  ))}
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
                    disabled={isAddToCartClicked}
                  >
                    Add to Cart
                  </button>
                </Col>
                <Col>
                  {isAddToCartClicked && (
                    <BtnManageQuantity
                      setIsAddToCartClicked={setIsAddToCartClicked}
                    />
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default CardPizza;
