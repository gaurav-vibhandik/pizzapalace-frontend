import React, { FC, useContext, useRef, useState } from "react";
import { Button, Form, FormLabel, Image, Modal } from "react-bootstrap";
import CardPizza from "../pizzaDisplay/CardPizza";
import { Pizza } from "../interfaces/pizzaInterface";
import InitDataContext from "../../context/InitDataContext";
import OrderLineContext from "../../context/orderLineContext";
import { Crust } from "../interfaces/crustInterface";
import { PizzaPrice } from "../interfaces/pizzaPriceInterface";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./ModalEditOrderCart_EditOrderLine_EditPizzaCard.module.css";
import vegLogo from "../images/vegFoodLogo_32x32.png";
import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
import OrderLine from "../interfaces/orderLineInterface";

const ModalEditOrderCart_EditOrderLine_EditPizzaCard = (props: any) => {
  const curPizza = props.myPizza;
  const curOl: OrderLine = props.curOl;
  const onBtnEditOrderLine = props.onBtnEditOrderLine;
  const onHandleClose = props.onHandleClose;

  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("");
  const [selectedCrustType, setSelectedCrustType] = useState("");
  // const [pizzaQty, setPizzaQty] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([] as string[]);
  // const [pizzaPrice, setPizzaPrice] = useState(0);
  const [selectedExtraCheese, setSelectedExtraCheese] = useState(false);

  let pizzaPrice = 0;

  let isCrustTypeAvailableForGivenSize = true;

  const chooseSize: any = useRef(null);
  const chooseCrust: any = useRef(null);
  const chooseExtraCheese: any = useRef(null);

  //Fetching Crust Details from CrustList for given each given pizza as per availability in PizzaPrice

  const initData = useContext(InitDataContext);

  const backendPizzaPriceList = initData.pizzaPriceList;
  const crustMap: Map<string, string> = initData.crustMap;

  //Fetching crustTypes and its Prices for given selected PizzaSize
  const pizzaPriceListForCurrentPizza: PizzaPrice[] =
    backendPizzaPriceList.filter((p) => {
      return p.pizzaId == curPizza!.pizzaId && p.pizzaSize == selectedPizzaSize;
    });

  //If for given size CrustList is not available then disabling the AddToCart btn
  if (pizzaPriceListForCurrentPizza.length == 0) {
    isCrustTypeAvailableForGivenSize = false;
  }

  //Setting pizzaPrice for selected pizzaSize,crustType,toppings and cheese :
  if (selectedPizzaSize !== "" && selectedCrustType !== "") {
    const curPizzaList = pizzaPriceListForCurrentPizza.filter((p) => {
      return p.crustId == selectedCrustType;
    });
    //setting pizzaPrice for selected crusttype
    pizzaPrice = curPizzaList[0].price;
    //setting pizzaPrice for selected extra cheese
    pizzaPrice += selectedExtraCheese ? 35 : 0;

    //setting pizzaPrice for selected toppings
    if (selectedToppings.length > 0) {
      let toppingPrice = 0;
      let topping;
      for (let t of selectedToppings) {
        topping = initData.toppingMap.get(t);
        toppingPrice = topping ? topping.price : 0;
        pizzaPrice += toppingPrice;
      }
    }
  }
  //==========================================
  const handlePizzaSizeChange = () => {
    setSelectedPizzaSize(chooseSize.current.value);
    // setSelectedCrustType("");
  };
  //==========================================
  const handleCrustTypeChange = () => {
    setSelectedCrustType(chooseCrust.current.value);
  };

  //========================================

  //====> Handling Extra Cheese======================
  const handleExtraCheese = () => {
    setSelectedExtraCheese(!selectedExtraCheese);
  };
  //<===============================

  //====> Handling Toppings selection======================

  const handleToppingCheckboxChange = (e: any) => {
    const { value, checked } = e.target;
    //value holds toppingId
    if (checked) {
      setSelectedToppings((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedToppings((prevSelected) =>
        prevSelected.filter((item: any) => item !== value)
      );
    }
  };
  //====>Handling "Update Pizza details" =======================
  const handlePizzaDetails = (event: any) => {
    console.log("Inside handle Update Pizza Changes");

    const newOl: OrderLine = {
      pizzaId: curPizza.pizzaId,
      size: selectedPizzaSize,
      crustId: selectedCrustType,
      quantity: 1,
      extraCheese: selectedExtraCheese,
      toppingList: selectedToppings,
      totalPrice: pizzaPrice,
    };

    onBtnEditOrderLine(curOl, newOl);
    console.log(`============================>
    Editing Pizza: ${curPizza.pizzaId} \n 
    before OL : ${curOl.size} & ${curOl.crustId}
    new OL : ${newOl.size} & ${newOl.crustId}
    `);

    console.log("editing Pizza Finished");
    onHandleClose();
  };

  //<===============================

  return (
    <React.Fragment>
      <div className="editPizzaModelBody">
        <Card id={curPizza.pizzaId} className={styles.myPizzaCard}>
          <div className={styles.pizzaImageSection}>
            <Card.Img variant="top" src={curPizza.imageUrl} />
            <Image
              className={styles.pizzaFoodTypeLogo}
              src={curPizza.type == "VEG" ? vegLogo : nonVegLogo}
              alt={curPizza.type == "VEG" ? "vegLogo" : "nonVegLogo"}
            />
            <div className={styles.pizzaPrice}>
              {pizzaPrice !== 0 && pizzaPrice}
            </div>
          </div>

          <Card.Body>
            <Card.Title className={styles.pizzaCardTitle}>
              {curPizza.name} {curPizza.pizzaId}
            </Card.Title>
            <Card.Text className={styles.pizzaCardDescription}>
              {curPizza.description}
            </Card.Text>
            <hr />

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
                  onClick={handlePizzaSizeChange}
                  onChange={(e) => setSelectedPizzaSize(e.target.value)}
                  placeholder="Choose Pizza Size"
                  defaultValue={curPizza.size}
                >
                  <option value="" disabled>
                    Choose Pizza Size
                  </option>
                  <option key={curPizza.pizzaId + "REGULAR"} value="REGULAR">
                    REGULAR
                  </option>
                  <option key={curPizza.pizzaId + "MEDIUM"} value="MEDIUM">
                    MEDIUM
                  </option>
                  <option key={curPizza.pizzaId + "LARGE"} value="LARGE">
                    LARGE
                  </option>
                </Form.Select>
              </Col>

              {isCrustTypeAvailableForGivenSize && (
                <div>
                  <Col className={styles.myPizzaCrustSelect}>
                    <FormLabel
                      htmlFor="chooseCrust"
                      className={styles.myCardLabel}
                    >
                      Crust
                    </FormLabel>

                    <Form.Select
                      ref={chooseCrust}
                      id="chooseCrust"
                      size="sm"
                      className={styles.myCardSelect}
                      onChange={(event) =>
                        setSelectedCrustType(event.target.value)
                      }
                      onClick={handleCrustTypeChange}
                      defaultValue=""
                    >
                      <option disabled>Choose Crust Type</option>
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
                  <hr />

                  {selectedCrustType !== "" && (
                    <div>
                      <Col>
                        <label className="form-check">
                          <input
                            ref={chooseExtraCheese}
                            type="checkbox"
                            onChange={handleExtraCheese}
                          />
                          Extra Cheese @35
                        </label>
                      </Col>
                      <hr />
                      <Col>
                        {curPizza.type === "VEG" && (
                          <div>
                            <p>Veg Toppings:</p>
                            {initData.vegToppingList.map((topping) => (
                              <div
                                key={`topping_veg_${curPizza.pizzaId}_${topping.toppingId}`}
                              >
                                <label htmlFor="toppingSelection">
                                  <input
                                    type="checkbox"
                                    name="toppingSelection"
                                    value={topping.toppingId}
                                    onChange={handleToppingCheckboxChange}
                                  />
                                  {`${topping.name} @ Rs.${topping.price}`}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {curPizza.type === "NON_VEG" && (
                          <div>
                            <p>Veg Toppings :</p>
                            {initData.nonVegToppingList_veg.map((topping) => (
                              <div
                                key={`topping_nonVeg_veg_${curPizza.pizzaId}_${topping.toppingId}`}
                              >
                                <label htmlFor="toppingSelection">
                                  <input
                                    type="checkbox"
                                    name="toppingSelection"
                                    value={topping.toppingId}
                                    onChange={handleToppingCheckboxChange}
                                  />
                                  {`${topping.name} @ Rs.${topping.price}`}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {curPizza.type === "NON_VEG" && (
                          <div>
                            <p>NonVeg Toppings :</p>
                            {initData.nonVegToppingList_nonVeg.map(
                              (topping) => (
                                <div
                                  key={`topping_nonVeg_nonVeg_${curPizza.pizzaId}_${topping.toppingId}`}
                                >
                                  <label htmlFor="toppingSelection">
                                    <input
                                      type="checkbox"
                                      name="toppingSelection"
                                      value={topping.toppingId}
                                      onChange={handleToppingCheckboxChange}
                                    />
                                    {`${topping.name} @ Rs.${topping.price}`}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </Col>
                    </div>
                  )}
                </div>
              )}
            </Row>

            <hr />

            {isCrustTypeAvailableForGivenSize && (
              <div>
                <Row>
                  <Col>
                    <Button
                      variant="success"
                      type="button"
                      className={styles.btnAddToCart}
                      disabled={
                        isAddToCartClicked ||
                        !isCrustTypeAvailableForGivenSize ||
                        selectedCrustType === ""
                      }
                      onClick={handlePizzaDetails}
                    >
                      Update Pizza Details
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ModalEditOrderCart_EditOrderLine_EditPizzaCard;
