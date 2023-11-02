import React, { useState } from "react";
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
import styles from "./adminDisplay_moduleCssFiles/adminShowToppingTable.module.css";
import Topping from "../interfaces/toppingInterface";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

type curProps = {
  toppingMap: Map<string, Topping>;
  toppingList: Topping[];
  dispatchToToppingStateReducer: (input: any) => void;
};

const AdminShowToppingTable = (props: curProps) => {
  const [statusSuccess, setStatusSuccess] = useState("");
  const [statusFail, setStatusFail] = useState("");
  const [toppingToEdit, setToppingToEdit] = useState<Topping>();

  const toppingMap = props.toppingMap;

  //modal topping edit
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //=======> handler Functions==========================================

  const handleSetToppingIdToEdit = (e: any) => {
    const toppingToEdit = props.toppingList.find(
      (tp) => tp.toppingId === e.target.value
    );
    setToppingToEdit(toppingToEdit);
  };

  //======> handle Edit topping entry ===========

  const handleEditTopping = (e: any) => {
    e.preventDefault();
    const newTopping: Topping = {
      toppingId: e.target.toppingId.value,
      name: e.target.toppingName.value,
      price: e.target.toppingPrice.value,
      type: e.target.toppingType.value,
      quantity: e.target.toppingQuantity.value,
    };
    console.log(newTopping);

    if (newTopping.toppingId) {
      const updatedTopping = newTopping;

      //update the reducerToppingState so that table reloads with latest state data
      props.dispatchToToppingStateReducer({
        type: "EditTopping",
        item: updatedTopping,
      });

      setStatusSuccess(
        `Topping Entry with toppingId = ${updatedTopping.toppingId} updated  successfully!!! `
      );
      setTimeout(() => {
        setStatusSuccess("");
      }, 7000);
    } else {
      setStatusFail("Failed to edit topping :" + newTopping.toppingId);
      setTimeout(() => {
        setStatusFail("");
      }, 7000);
    }

    // axios
    //   .put(
    //     "http://localhost:8080/api/v1/toppings/" + newTopping.toppingId,
    //     newTopping
    //   )
    //   .then((resp) => {
    // if (resp.data.success) {
    //   const updatedTopping = resp.data.data.list[0];
    //   console.log(updatedTopping);

    //   //update the reducerToppingState so that table reloads with latest state data
    //   props.dispatchToToppingStateReducer({
    //     type: "EditTopping",
    //     item: updatedTopping,
    //   });

    //   setStatusSuccess(
    //     `Topping Entry with toppingId = ${resp.data.data.list[0].toppingId} updated  successfully!!! `
    //   );
    //   setTimeout(() => {
    //     setStatusSuccess("");
    //   }, 7000);
    //     }
    //   })
    //   .catch((err) => {
    // setStatusFail("Failed to edit topping :" + newTopping.toppingId);
    // setTimeout(() => {
    //   setStatusFail("");
    // }, 7000);
    //   });

    handleClose();
  };

  //======> handle delete topping entry==========
  const handleDeleteTopping = (e: any) => {
    const toppingIdToDelete = e.target.value;

    //fetch toppingId to be deleted
    // console.log("ppId= " + e.target.parentNode.parentNode.id);
    // console.log("pId= " + e.target.parentNode.id);
    console.log("Deleting toppingId = " + e.target.value);
    if (toppingIdToDelete) {
      //if yes , delete entry from  toppingStateReducer
      props.dispatchToToppingStateReducer({
        type: "DeleteTopping",
        item: toppingIdToDelete,
      });
      setStatusSuccess(
        `ToppingId =${toppingIdToDelete} deleted successfully !!!`
      );
      setTimeout(() => {
        setStatusSuccess("");
      }, 9000);
    } else {
      setStatusFail(`Failed to delete ToppingId =${toppingIdToDelete}  ...`);
      setTimeout(() => {
        setStatusFail("");
      }, 5000);
    }
    // axios
    //   .delete(`http://localhost:8080/api/v1/toppings/${toppingIdToDelete}`)
    //   .then((resp) => {
    // if (resp.status == 204) {
    //   //if yes , delete entry from  toppingStateReducer
    //   props.dispatchToToppingStateReducer({
    //     type: "DeleteTopping",
    //     item: toppingIdToDelete,
    //   });
    //   setStatusSuccess(
    //     `ToppingId =${toppingIdToDelete} deleted successfully !!!`
    //   );
    //   setTimeout(() => {
    //     setStatusSuccess("");
    //   }, 9000);
    //     }
    //   })
    //   .catch((err) => {
    // setStatusFail(`Failed to delete ToppingId =${toppingIdToDelete}  ...`);
    // setTimeout(() => {
    //   setStatusFail("");
    // }, 5000);
    //  });
  };
  //<======handler Functions==========================================
  return (
    <React.Fragment>
      <span
        className={`${styles.toppingActionStatusSuccess} text-align-center`}
      >
        {statusSuccess}
      </span>
      <span className={`${styles.toppingActionStatusFail}`}>{statusFail}</span>

      <div className={styles.containerToppingTable}>
        <Table
          className={`table-light table-hover  table-bordered ${styles.toppingTable}`}
        >
          <thead>
            <tr>
              <th>ToppingId</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>

          <tbody className={`${styles.tableBody}`}>
            {props.toppingList.map((t) => (
              <tr key={"key_" + t.toppingId} id={`${t.toppingId}_pp`}>
                <td>{t.toppingId}</td>
                <td>{t.name}</td>
                <td>{t.type}</td>
                <td>{t.price}</td>
                <td>{t.quantity}</td>
                <td id={`${t.toppingId}_p`}>
                  <Button
                    type="submit"
                    onClick={(e: any) => {
                      handleSetToppingIdToEdit(e);
                      handleShow();
                    }}
                    value={t.toppingId}
                  >
                    Edit Topping
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    className={styles.btnDeleteTopping}
                    onClick={handleDeleteTopping}
                    value={t.toppingId}
                  >
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="ModalToppingEdit">
        <Modal show={show} backdrop="static">
          <Modal.Header>
            <Modal.Title>
              Edit Topping Details for ToppingId = {toppingToEdit?.toppingId}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalEditTopping}>
            <div className={`${styles.mainFormContainer}`}>
              <Form onSubmit={handleEditTopping}>
                <div className={`col-11 me-auto  ${styles.toppingForm}`}>
                  <Row>
                    <Form.Group as={Row}>
                      <FormLabel htmlFor="toppingId">ToppingId :</FormLabel>
                      <Form.Control
                        type="text"
                        name="toppingId"
                        defaultValue={toppingToEdit?.toppingId}
                        readOnly
                        plaintext
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="toppingName">
                      Enter Topping Name :
                      <FormControl
                        type="text"
                        name="toppingName"
                        defaultValue={toppingToEdit?.name}
                      />
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="toppingType">
                      Select Topping Type :
                    </FormLabel>
                    <FormSelect
                      name="toppingType"
                      defaultValue={toppingToEdit?.type}
                    >
                      <option disabled>----choose topping type----</option>
                      <option value={"VEG"}>VEG</option>
                      <option value={"NON_VEG"}>NON_VEG</option>
                    </FormSelect>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="toppingPrice">
                      Enter Topping Price :
                      <FormControl
                        type="number"
                        name="toppingPrice"
                        defaultValue={toppingToEdit?.price}
                      />
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="toppingQuantity">
                      Enter Topping Quantity :
                    </FormLabel>
                    <FormControl
                      type="number"
                      name="toppingQuantity"
                      defaultValue={toppingToEdit?.quantity}
                    />
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

export default AdminShowToppingTable;
