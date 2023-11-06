import React, { useContext, useReducer, useState } from "react";

import { Col, Row, Tab, Tabs } from "react-bootstrap";
import AdminShowPizzaTable from "../adminDisplay/AdminShowPizzaTable";
import styles from "./adminPage.module.css";
import InitDataContext from "../../context/InitDataContext";
import { reducerFunctionForAdminPage_PizzaStateReducer } from "../adminDisplay/reducerFunctionsAdminDisplay/reducerFunctionForAdminPage_PizzaStateReducer";
import AdminCreatePizza from "../adminDisplay/AdminCreatePizza";
import AdminCreateTopping from "../adminDisplay/AdminCreateTopping";
import { reducerFunctionForAdminPage_ToppingStateReducer } from "../adminDisplay/reducerFunctionsAdminDisplay/reducerFunctionForAdminPage_ToppingStateReducer";
import AdminShowToppingTable from "../adminDisplay/AdminShowToppingTable";
import AdminCreateCrust from "../adminDisplay/AdminCreateCrust";
import AdminShowCrustTable from "../adminDisplay/AdminShowCrustTable";
import { reducerFunctionForAdminPage_CrustStateReducer } from "../adminDisplay/reducerFunctionsAdminDisplay/reducerFunctionForAdminPage_CrustStateReducer";
import AdminCreatePizzaPrice from "../adminDisplay/AdminCreatePizzaPrice";
import AdminShowPizzaPriceTable from "../adminDisplay/AdminShowPizzaPriceTable";
import { reducerFunctionForAdminPage_PizzaPriceStateReducer } from "../adminDisplay/reducerFunctionsAdminDisplay/reducerFunctionForAdminPage_PizzaPriceStateReducer";

const AdminPage = () => {
  const initData = useContext(InitDataContext);
  const pizzaList = initData.pizzaList;
  const toppingList = initData.toppingList;
  const crustMap = initData.crustMap;
  const crustList = initData.crustList;
  const pizzaMap = initData.pizzaMap;
  const toppingMap = initData.toppingMap;
  const pizzaPriceList = initData.pizzaPriceList;

  const [pizzaStateReducer, dispatchToPizzaStateReducer] = useReducer(
    reducerFunctionForAdminPage_PizzaStateReducer,
    {
      pizzaList: pizzaList,
    }
  );

  const [toppingStateReducer, dispatchToToppingStateReducer] = useReducer(
    reducerFunctionForAdminPage_ToppingStateReducer,
    {
      toppingList: toppingList,
    }
  );
  const [pizzaPriceStateReducer, dispatchToPizzaPriceStateReducer] = useReducer(
    reducerFunctionForAdminPage_PizzaPriceStateReducer,
    {
      pizzaPriceList: pizzaPriceList,
    }
  );

  //Showing Tabs for navigation
  const [key, setKey] = useState("Pizza");

  return (
    <React.Fragment>
      <div className={`container-fluid`}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k!)}
          className={`mb-3 ${styles.adminPageMenu}`}
        >
          <Tab eventKey="Pizza" title="Pizza">
            <div className={styles.adminPageContent}>
              <div className="showPizza">
                <div className="addPizzaContainer">
                  <AdminCreatePizza
                    pizzaList={pizzaStateReducer.pizzaList}
                    dispatchToPizzaStateReducer={dispatchToPizzaStateReducer}
                  />
                </div>
                <AdminShowPizzaTable
                  pizzaMap={pizzaMap}
                  pizzaList={pizzaStateReducer.pizzaList}
                  dispatchToPizzaStateReducer={dispatchToPizzaStateReducer}
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey="Topping" title="Topping">
            <div className={styles.adminPageContent}>
              <div className="showTopping">
                <div className="addToppingContainer">
                  <AdminCreateTopping
                    toppingList={toppingStateReducer.toppingList}
                    dispatchToToppingStateReducer={
                      dispatchToToppingStateReducer
                    }
                  />
                </div>
                <AdminShowToppingTable
                  toppingMap={toppingMap}
                  toppingList={toppingStateReducer.toppingList}
                  dispatchToToppingStateReducer={dispatchToToppingStateReducer}
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey="PizzaPrice" title="PizzaPrice">
            <div className={styles.adminPageContent}>
              <div className="addPizzaPriceContainer">
                <AdminCreatePizzaPrice
                  pizzaPriceList={pizzaPriceStateReducer.pizzaPriceList}
                  dispatchToPizzaPriceStateReducer={
                    dispatchToPizzaPriceStateReducer
                  }
                />
              </div>
              <AdminShowPizzaPriceTable
                pizzaPriceList={pizzaPriceStateReducer.pizzaPriceList}
                dispatchToPizzaPriceStateReducer={
                  dispatchToPizzaPriceStateReducer
                }
              />
            </div>
          </Tab>

          <Tab eventKey="Inventory Control" title="Inventory Control">
            <div className={styles.adminPageContent}>
              <div className={styles.block}>
                Tab content for Inventory Control
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;
