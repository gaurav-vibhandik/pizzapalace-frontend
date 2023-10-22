import React, { useContext, useEffect, useRef, useState } from "react";
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
import BtnManageQuantity from "../BtnManageQuantity";
import OrderLine from "../interfaces/orderLineInterface";
import InitDataContext from "../../context/InitDataContext";
import { PizzaPrice } from "../interfaces/pizzaPriceInterface";
import OrderLineContext from "../../context/orderLineContext";
import { Crust } from "../interfaces/crustInterface";

const CardPizza = (props: Pizza) => {
  /* Assumptions :
          //For now , not validating PizzaInventory for pizzaSize to show for given pizza.
            Showing all sizes as hardcoded
*/
  props.pizzaId == "ZA004"
    ? console.log("Rendering of CardComponent Started")
    : console.log("");

  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("");
  const [selectedCrustType, setSelectedCrustType] = useState("");
  const [pizzaQty, setPizzaQty] = useState(1);

  let isCrustTypeAvailableForGivenSize = true;

  const chooseSize: any = useRef(null);
  const chooseCrust: any = useRef(null);

  //Fetching Crust Details from CrustList for given each given pizza as per availability in PizzaPrice

  const initData = useContext(InitDataContext);
  const orderLineState = useContext(OrderLineContext);

  const backendPizzaPriceList = initData.pizzaPriceList;
  const crustMap: Map<string, Crust> | any = initData.crustMap;

  //Fetching crustTypes and its Prices for given selected PizzaSize
  const pizzaPriceListForCurrentPizza: PizzaPrice[] =
    backendPizzaPriceList.filter((p) => {
      return p.pizzaId == props.pizzaId && p.pizzaSize == selectedPizzaSize;
    });

  //If for given size CrustList is not available then disabling the AddToCart btn
  if (pizzaPriceListForCurrentPizza.length == 0) {
    isCrustTypeAvailableForGivenSize = false;
  }

  //Fetching value for given size and given crustType
  let price = 0;
  if (selectedPizzaSize !== "" && selectedCrustType !== "") {
    const curPizzaList = pizzaPriceListForCurrentPizza.filter((p) => {
      return p.crustId == selectedCrustType;
    });
    price = curPizzaList[0].price;
  }

  //==========================================
  const handleAddToCart = (event: any) => {
    event.preventDefault();
    setIsAddToCartClicked(true);
    const ol: OrderLine = {
      pizzaId: props.pizzaId,
      size: selectedPizzaSize,
      crustId: selectedCrustType,
      quantity: 1,
      extraCheese: false,
      toppingList: [],
      orderLinePrice: price,
    };
    console.log(ol);
    orderLineState.addToOrderLineList(ol);
    console.log("addToCart finished");
  };

  //==========================================
  const handlePizzaSizeChange = () => {
    setSelectedPizzaSize(chooseSize.current.value);
    setSelectedCrustType("");
    //resetting AddToCart from clicked to unClicked,so that it can add next orderLine
    setIsAddToCartClicked(false);
  };
  //==========================================
  const handleCrustTypeChange = () => {
    setSelectedCrustType(chooseCrust.current.value);
  };

  //========================================
  const handleChangeForQtyState = () => {
    if (isAddToCartClicked) {
      setPizzaQty(1);
      setIsAddToCartClicked(false);
    }
  };
  //=============================================
  //BtnQtyManagement Handler Functions
  const handleBtnAdd = () => {
    const ol: OrderLine = {
      pizzaId: props.pizzaId,
      size: selectedPizzaSize,
      crustId: selectedCrustType,
      quantity: 1, //not necessary
      extraCheese: false,
      toppingList: [],
      orderLinePrice: price,
    };
    orderLineState.addToOrderLineList(ol);
    setPizzaQty((prevState) => {
      return prevState + 1;
    });
  };

  const handleBtnRemove = () => {
    const ol: OrderLine = {
      pizzaId: props.pizzaId,
      size: selectedPizzaSize,
      crustId: selectedCrustType,
      quantity: 1, //not necessary
      extraCheese: false,
      toppingList: [],
      orderLinePrice: price,
    };
    orderLineState.removeFromOrderLineList(ol);

    setPizzaQty((prevState) => {
      if (prevState == 1) {
        setIsAddToCartClicked(false);
        return 1;
      } else {
        return prevState - 1;
      }
    });
  };

  //====================== Debugging=======>
  if (props.pizzaId == "ZA004") {
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
          <div className={styles.pizzaPrice}>{price !== 0 && price}</div>
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
                  onClick={handlePizzaSizeChange}
                  onChange={handleChangeForQtyState}
                  placeholder="Choose Pizza Size"
                  defaultValue=""
                >
                  <option value="" disabled>
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

              {isCrustTypeAvailableForGivenSize && (
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
                    onChange={() => {
                      handleCrustTypeChange();
                      handleChangeForQtyState();
                    }}
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
              )}
            </Row>

            <hr />

            {isCrustTypeAvailableForGivenSize && (
              <div>
                <Row>
                  <Col>
                    <button
                      onClick={handleAddToCart}
                      type="submit"
                      className={styles.btnAddToCart}
                      disabled={
                        isAddToCartClicked ||
                        !isCrustTypeAvailableForGivenSize ||
                        selectedCrustType === ""
                      }
                    >
                      Add to Cart
                    </button>
                  </Col>
                  <Col>
                    {isAddToCartClicked && (
                      <BtnManageQuantity
                        quantity={pizzaQty}
                        handleBtnAdd={handleBtnAdd}
                        handleBtnRemove={handleBtnRemove}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default CardPizza;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import styles from "./CardPizza.module.css";
// import {
//   Button,
//   Card,
//   Col,
//   Form,
//   FormLabel,
//   Row,
//   Image,
// } from "react-bootstrap";
// import { Pizza } from "../interfaces/pizzaInterface";
// import vegLogo from "../images/vegFoodLogo_32x32.png";
// import nonVegLogo from "../images/nonVegFoodLogo_32x32.png";
// import BtnManageQuantity from "../BtnManageQuantity";
// import OrderLine from "../interfaces/orderLineInterface";
// import InitDataContext from "../../context/InitDataContext";
// import { PizzaPrice } from "../interfaces/pizzaPriceInterface";
// import OrderLineContext from "../../context/orderLineContext";

// const CardPizza = (props: Pizza) => {
//   /* Assumptions :
//           //For now , not validating PizzaInventory for pizzaSize to show for given pizza.
//             Showing all sizes as hardcoded
// */
//   props.pizzaId == "ZA004"
//     ? console.log("Rendering of CardComponent Started")
//     : console.log("");

//   const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
//   const [selectedPizzaSize, setSelectedPizzaSize] = useState("");
//   const [selectedCrustType, setSelectedCrustType] = useState("");
//   const [pizzaQty, setPizzaQty] = useState(1);

//   let isCrustTypeAvailableForGivenSize = true;

//   const chooseSize: any = useRef(null);
//   const chooseCrust: any = useRef(null);

//   //Fetching Crust Details from CrustList for given each given pizza as per availability in PizzaPrice

//   const initData = useContext(InitDataContext);
//   const orderLineState = useContext(OrderLineContext);

//   const backendPizzaPriceList = initData.pizzaPriceList;
//   const crustMap = initData.crustMap;

//   //Fetching crustTypes and its Prices for given selected PizzaSize
//   const pizzaPriceListForCurrentPizza: PizzaPrice[] =
//     backendPizzaPriceList.filter((p) => {
//       return p.pizzaId == props.pizzaId && p.pizzaSize == selectedPizzaSize;
//     });

//   //If for given size CrustList is not available then disabling the AddToCart btn
//   if (pizzaPriceListForCurrentPizza.length == 0) {
//     isCrustTypeAvailableForGivenSize = false;
//   }

//   //Fetching value for given size and given crustType
//   let price = 0;
//   if (selectedPizzaSize !== "" && selectedCrustType !== "") {
//     const curPizzaList = pizzaPriceListForCurrentPizza.filter((p) => {
//       return p.crustId == selectedCrustType;
//     });
//     price = curPizzaList[0].price;
//   }

//   //==========================================
//   const handleAddToCart = (event: any) => {
//     event.preventDefault();
//     setIsAddToCartClicked(true);
//     const ol: OrderLine = {
//       pizzaId: props.pizzaId,
//       size: selectedPizzaSize,
//       crustId: selectedCrustType,
//       quantity: 1,
//       extraCheese: false,
//       toppingList: [],
//       orderLinePrice: price,
//     };
//     console.log(ol);
//     orderLineState.addToOrderLineList(ol);
//   };

//   //==========================================
//   const handlePizzaSizeChange = () => {
//     setSelectedPizzaSize(chooseSize.current.value);
//     setSelectedCrustType("");
//     //resetting AddToCart from clicked to unClicked,so that it can add next orderLine
//     setIsAddToCartClicked(false);
//   };
//   //==========================================
//   const handleCrustTypeChange = () => {
//     setSelectedCrustType(chooseCrust.current.value);
//   };
//   //=============================================
//   //BtnQtyManagement Handler Functions
//   const handleAddQuantity = () => {
//     setPizzaQty((prevState) => {
//       return prevState + 1;
//     });
//     const ol: OrderLine = {
//       pizzaId: props.pizzaId,
//       size: selectedPizzaSize,
//       crustId: selectedCrustType,
//       quantity: 1, //not necessary
//       extraCheese: false,
//       toppingList: [],
//       orderLinePrice: price,
//     };
//     orderLineState.addToOrderLineList(ol);
//   };

//   const handleRemoveQuantity = () => {
//     setPizzaQty((prevState) => {
//       if (prevState == 1) {
//         setIsAddToCartClicked(false);
//       }
//       return prevState - 1;
//     });
//     const ol: OrderLine = {
//       pizzaId: props.pizzaId,
//       size: selectedPizzaSize,
//       crustId: selectedCrustType,
//       quantity: 1, //not necessary
//       extraCheese: false,
//       toppingList: [],
//       orderLinePrice: price,
//     };
//     orderLineState.removeFromOrderLineList(ol);
//   };

//   //====================== Debugging=======>
//   if (props.pizzaId == "ZA004") {
//     props.pizzaId == "ZA004"
//       ? console.log("Rendering of CardComponent Finished")
//       : console.log("");
//     console.log("<=========================");
//   }
//   //<=========Debugging===========================
//   //===========================================================================================
//   return (
//     <React.Fragment>
//       <Card id={props.pizzaId} className={styles.myPizzaCard}>
//         <div className={styles.pizzaImageSection}>
//           <Card.Img variant="top" src={props.imageUrl} />
//           <Image
//             className={styles.pizzaFoodTypeLogo}
//             src={props.type == "VEG" ? vegLogo : nonVegLogo}
//             alt={props.type == "VEG" ? "vegLogo" : "nonVegLogo"}
//           />
//           <div className={styles.pizzaPrice}>{price !== 0 && price}</div>
//         </div>

//         <Card.Body>
//           <Card.Title className={styles.pizzaCardTitle}>
//             {props.name} {props.pizzaId}
//           </Card.Title>
//           <Card.Text className={styles.pizzaCardDescription}>
//             {props.description}
//           </Card.Text>
//           <hr />
//           <div className="form" onSubmit={handleAddToCart}>
//             <Row className={styles.selectContainer}>
//               <Col className={styles.myPizzaSizeSelect}>
//                 <FormLabel htmlFor="chooseSize" className={styles.myCardLabel}>
//                   Size
//                 </FormLabel>
//                 <Form.Select
//                   ref={chooseSize}
//                   id="chooseSize"
//                   className={styles.myCardSelect}
//                   size="sm"
//                   onClick={handlePizzaSizeChange}
//                   placeholder="Choose Pizza Size"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Choose Pizza Size
//                   </option>
//                   <option key={props.pizzaId + "REGULAR"} value="REGULAR">
//                     REGULAR
//                   </option>
//                   <option key={props.pizzaId + "MEDIUM"} value="MEDIUM">
//                     MEDIUM
//                   </option>
//                   <option key={props.pizzaId + "LARGE"} value="LARGE">
//                     LARGE
//                   </option>
//                 </Form.Select>
//               </Col>

//               {isCrustTypeAvailableForGivenSize && (
//                 <Col className={styles.myPizzaCrustSelect}>
//                   <FormLabel
//                     htmlFor="chooseCrust"
//                     className={styles.myCardLabel}
//                   >
//                     Crust
//                   </FormLabel>

//                   <Form.Select
//                     ref={chooseCrust}
//                     id="chooseCrust"
//                     size="sm"
//                     className={styles.myCardSelect}
//                     onChange={handleCrustTypeChange}
//                     onClick={handleCrustTypeChange}
//                     defaultValue=""
//                   >
//                     <option disabled>Choose Crust Type</option>
//                     {pizzaPriceListForCurrentPizza.map((crustWithPrice) => (
//                       <option
//                         key={crustWithPrice.crustId}
//                         value={crustWithPrice.crustId}
//                       >
//                         {crustMap.get(crustWithPrice.crustId)}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//               )}
//             </Row>

//             <hr />

//             {isCrustTypeAvailableForGivenSize && (
//               <div>
//                 <Row>
//                   <Col>
//                     <button
//                       onClick={handleAddToCart}
//                       type="submit"
//                       className={styles.btnAddToCart}
//                       disabled={
//                         isAddToCartClicked ||
//                         !isCrustTypeAvailableForGivenSize ||
//                         selectedCrustType === ""
//                       }
//                     >
//                       Add to Cart
//                     </button>
//                   </Col>
//                   <Col>
//                     {isAddToCartClicked && (
//                       <div className={styles.btnContainer}>
//                         <div>
//                           <button
//                             type="button"
//                             className={styles.btnRemoveQty}
//                             onClick={handleRemoveQuantity}
//                           >
//                             -
//                           </button>
//                         </div>
//                         <div className={styles.btnQty}>{pizzaQty}</div>

//                         <div className="">
//                           <button
//                             type="button"
//                             className={styles.btnAddQty}
//                             onClick={handleAddQuantity}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </Col>
//                 </Row>
//               </div>
//             )}
//           </div>
//         </Card.Body>
//       </Card>
//     </React.Fragment>
//   );
// };

// export default CardPizza;
