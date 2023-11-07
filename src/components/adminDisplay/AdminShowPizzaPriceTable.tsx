import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import styles from "./adminDisplay_moduleCssFiles/adminShowPizzaPriceTable.module.css";
import PizzaPrice from "../interfaces/pizzaPriceInterface";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import InitDataContext from "../../context/InitDataContext";

type curProps = {
  pizzaPriceList: PizzaPrice[];
  dispatchToPizzaPriceStateReducer: (input: any) => void;
};

const AdminShowPizzaPriceTable = (props: curProps) => {
  const [statusSuccess, setStatusSuccess] = useState("");
  const [statusFail, setStatusFail] = useState("");
  const [pizzaPriceToEdit, setPizzaPriceToEdit] = useState<PizzaPrice>();
  const initData = useContext(InitDataContext);

  const crustList = initData.crustList;
  const crustMap = initData.crustMap;

  const handleSetPizzaPriceToEdit = (pizzaPriceIdToEdit: number) => {
    const pizzaPriceToEdit = props.pizzaPriceList.find(
      (pizzaPrice) => pizzaPrice.id === pizzaPriceIdToEdit
    );
    setPizzaPriceToEdit(pizzaPriceToEdit);
  };

  //modal pizzaPrice edit
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //=======> handler Functions==========================================

  //======> handle Edit pizzaPrice entry ===========

  const handleEditPizzaPrice = (e: any) => {
    e.preventDefault();
    const newPizzaPrice: PizzaPrice = {
      id: e.target.id.value,
      pizzaId: e.target.pizzaId.value,
      crustId: e.target.crustId.value,
      pizzaSize: e.target.pizzaSize.value,
      price: e.target.price.value,
    };
    console.log("Before ", newPizzaPrice);

    axios
      .put(
        "http://localhost:8080/api/v1/pizzaPrices/" + newPizzaPrice.id,
        newPizzaPrice
      )
      .then((resp) => {
        if (resp.data.success) {
          const updatedPizzaPrice = resp.data.data.list[0];
          console.log(updatedPizzaPrice);

          //update the reducerPizzaPriceState so that table reloads with latest state data
          props.dispatchToPizzaPriceStateReducer({
            type: "EditPizzaPrice",
            item: updatedPizzaPrice,
          });

          setStatusSuccess(
            `PizzaPrice Entry with pizzaPriceId = ${resp.data.data.list[0].id} updated  successfully!!! `
          );
          setTimeout(() => {
            setStatusSuccess("");
          }, 7000);
        }
      })
      .catch((err) => {
        console.log(err.response.data);

        setStatusFail("Failed to update pizzaPrice :" + newPizzaPrice.id);
        setTimeout(() => {
          setStatusFail("");
        }, 7000);
      });

    handleClose();
  };

  //======> handle delete pizzaPrice entry==========
  const handleDeletePizzaPrice = (pizzaPriceIdToDelete: number) => {
    console.log("Deleting pizzaPriceId = " + pizzaPriceIdToDelete);

    axios
      .delete(
        `http://localhost:8080/api/v1/pizzaPrices/${pizzaPriceIdToDelete}`
      )
      .then((resp) => {
        if (resp.status == 204) {
          //if yes , delete entry from  pizzaPriceStateReducer
          props.dispatchToPizzaPriceStateReducer({
            type: "DeletePizzaPrice",
            item: pizzaPriceIdToDelete,
          });
          setStatusSuccess(
            `PizzaPriceId =${pizzaPriceIdToDelete} deleted successfully !!!`
          );
          setTimeout(() => {
            setStatusSuccess("");
          }, 9000);
        }
      })
      .catch((err) => {
        setStatusFail(
          `Failed to delete PizzaPriceId =${pizzaPriceIdToDelete}  ...`
        );
        console.log(err.response.data);

        setTimeout(() => {
          setStatusFail("");
        }, 5000);
      });
  };
  //<======handler Functions==========================================
  return (
    <React.Fragment>
      <span
        className={`${styles.pizzaPriceActionStatusSuccess} text-align-center`}
      >
        {statusSuccess}
      </span>
      <span className={`${styles.pizzaPriceActionStatusFail}`}>
        {statusFail}
      </span>

      <div className={styles.containerPizzaPriceTable}>
        <Table
          className={`table-light table-hover  table-bordered ${styles.pizzaPriceTable}`}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>PizzaId</th>
              <th>CrustType</th>
              <th>Pizza Size</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody className={`${styles.tableBody}`}>
            {props.pizzaPriceList.map((pp) => (
              <tr key={"key_" + pp.id} id={`${pp.id}_pp`}>
                <td>{pp.id}</td>
                <td>{pp.pizzaId}</td>
                <td>{crustMap.get(pp.crustId)}</td>
                <td>{pp.pizzaSize}</td>
                <td>{pp.price}</td>
                <td id={`${pp.id}_p`}>
                  <Button
                    type="submit"
                    onClick={() => {
                      handleSetPizzaPriceToEdit(pp.id!);
                      handleShow();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    className={styles.btnDeletePizzaPrice}
                    onClick={() => handleDeletePizzaPrice(pp.id!)}
                  >
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="ModalPizzaPriceEdit">
        <Modal show={show} backdrop="static">
          <Modal.Header>
            <Modal.Title>
              Edit PizzaPrice for id = {pizzaPriceToEdit?.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalEditPizzaPrice}>
            <div className={`${styles.mainFormContainer}`}>
              <Form onSubmit={handleEditPizzaPrice}>
                <div className={`col-11 me-auto  ${styles.pizzaPriceForm}`}>
                  <Row>
                    <FormLabel htmlFor="id">
                      Id:
                      <FormControl
                        type="number"
                        name="id"
                        value={pizzaPriceToEdit?.id}
                        readOnly
                      />
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="pizzaId">
                      Enter PizzaId:
                      <FormControl
                        type="text"
                        name="pizzaId"
                        defaultValue={pizzaPriceToEdit?.pizzaId}
                      />
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="crustId">
                      <FormSelect
                        name="crustId"
                        defaultValue={pizzaPriceToEdit?.crustId}
                      >
                        {crustList.map((crust) => (
                          <option
                            key={"crustKey_" + crust.crustId}
                            value={crust.crustId}
                          >
                            {crust.crust}
                          </option>
                        ))}
                      </FormSelect>
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="pizzaSize">
                      Select Pizza Size
                      <FormSelect
                        name="pizzaSize"
                        defaultValue={pizzaPriceToEdit?.pizzaSize}
                      >
                        <option selected disabled>
                          ---choose size---
                        </option>
                        <option value="REGULAR">REGULAR</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LARGE">LARGE</option>
                      </FormSelect>
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="price">
                      Enter Price :
                      <FormControl
                        type="number"
                        name="price"
                        defaultValue={pizzaPriceToEdit?.price}
                      />
                    </FormLabel>
                  </Row>
                </div>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="success">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default AdminShowPizzaPriceTable;
