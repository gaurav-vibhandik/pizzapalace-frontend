import React, { FC, useContext, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import CardPizza from "../pizzaDisplay/CardPizza";
import { Pizza } from "../interfaces/pizzaInterface";
import InitDataContext from "../../context/InitDataContext";
import OrderLineContext from "../../context/orderLineContext";
import { Crust } from "../interfaces/crustInterface";
import { PizzaPrice } from "../interfaces/pizzaPriceInterface";

const ModalPizzaCard: FC = () => {
  const [pizza, setPizza] = useState<Pizza>();

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
  const orderLineState = useContext(OrderLineContext);

  const backendPizzaPriceList = initData.pizzaPriceList;
  const crustMap: Map<string, Crust> | any = initData.crustMap;

  //Fetching crustTypes and its Prices for given selected PizzaSize
  const pizzaPriceListForCurrentPizza: PizzaPrice[] =
    backendPizzaPriceList.filter((p) => {
      return p.pizzaId == pizza!.pizzaId && p.pizzaSize == selectedPizzaSize;
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
    pizzaPrice += selectedExtraCheese ? +chooseExtraCheese.current.value : 0;

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
  return (
    <React.Fragment>
      <Modal></Modal>
    </React.Fragment>
  );
};

export default ModalPizzaCard;
