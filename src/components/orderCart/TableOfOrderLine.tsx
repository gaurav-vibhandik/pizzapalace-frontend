import React from "react";
import { Table } from "react-bootstrap";
import { Pizza } from "../interfaces/pizzaInterface";
import Topping from "../interfaces/toppingInterface";
import styles from "./tableOfOrderLine.module.css";
import OrderLine from "../interfaces/orderLineInterface";

type TableOLProp = {
  orderLines: OrderLine[];
  pizzaMap: Map<string, Pizza>;
  toppingMap: Map<string, Topping>;
};

const TableForOrderLine = (props: TableOLProp) => {
  return (
    <React.Fragment>
      <div className={`${styles.olTable}`}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={styles.olTableHeading}>OrderlineId</th>
              <th className={styles.olTableName}>PizzaName</th>
              <th className={styles.olTableSize}>Size</th>
              <th className={styles.olTableQuantity}>Quantity</th>
              <th className={styles.olTablePrice}>Total Price</th>
              <th className={styles.olTableDescription}>Description</th>
              <th className={styles.olTableExtraCheese}>Extra Cheese</th>
              <th className={styles.olTableTopping}>Toppings</th>
            </tr>
          </thead>
          <tbody>
            {props.orderLines.map((ol) => (
              <tr>
                <td>{ol.orderLineId}</td>
                <td>{props.pizzaMap.get(ol.pizzaId)!.name}</td>
                <td>{ol.size}</td>
                <td>{ol.quantity}</td>
                <td>{ol.totalPrice}</td>
                <td>{props.pizzaMap.get(ol.pizzaId)!.description}</td>
                <td>{ol.extraCheese ? "Yes" : "No"}</td>
                <td>
                  {ol.toppingList.length > 0
                    ? ol.toppingList
                        .map((tpId) => props.toppingMap.get(tpId)!.name)
                        .toString()
                    : "---"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default TableForOrderLine;
