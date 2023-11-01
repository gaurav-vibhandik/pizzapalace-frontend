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
import styles from "./adminDisplay_moduleCssFiles/adminShowPizzaTable.module.css";
import { Pizza } from "../interfaces/pizzaInterface";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

type curProps = {
  pizzaList: Pizza[];
  dispatchToPizzaStateReducer: (input: any) => void;
};

const AdminShowPizzaTable = (props: curProps) => {
  const [statusSuccess, setStatusSuccess] = useState("");
  const [statusFail, setStatusFail] = useState("");
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza>();

  //creating pizzaMap
  const pizzaMap = new Map<string, Pizza>();
  props.pizzaList.forEach((p) => {
    pizzaMap.set(p.pizzaId!, p);
  });

  //modal pizza edit
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //=======> handler Functions==========================================

  //======> handle Edit pizza entry ===========

  const handleEditPizza = (e: any) => {
    e.preventDefault();
    const newPizza: Pizza = {
      pizzaId: e.target.pizzaId.value,
      name: e.target.pizzaName.value,
      description: e.target.pizzaDescription.value,
      type: e.target.pizzaType.value,
      imageUrl: e.target.pizzaImageUrl.value,
    };
    //console.log(newPizza);

    axios
      .put("http://localhost:8080/api/v1/pizzas/" + newPizza.pizzaId, newPizza)
      .then((resp) => {
        if (resp.data.success) {
          const updatedPizza = resp.data.data.list[0];
          console.log(updatedPizza);

          //update the reducerPizzaState so that table reloads with latest state data
          props.dispatchToPizzaStateReducer({
            type: "EditPizza",
            item: updatedPizza,
          });

          setStatusSuccess(
            `Pizza Entry with pizzaId = ${resp.data.data.list[0].pizzaId} updated  successfully!!! `
          );
          setTimeout(() => {
            setStatusSuccess("");
          }, 7000);
        }
      })
      .catch((err) => {
        setStatusFail("Failed to edit pizza :" + newPizza.pizzaId);
        setTimeout(() => {
          setStatusFail("");
        }, 7000);
      });

    handleClose();
  };

  //======> handle delete pizza entry==========
  const handleDeletePizza = (e: any) => {
    const pizzaIdToDelete = e.target.value;

    //fetch pizzaId to be deleted
    // console.log("ppId= " + e.target.parentNode.parentNode.id);
    // console.log("pId= " + e.target.parentNode.id);
    console.log("Deleting pizzaId = " + e.target.value);

    axios
      .delete(`http://localhost:8080/api/v1/pizzas/${pizzaIdToDelete}`)
      .then((resp) => {
        if (resp.status == 204) {
          //if yes , delete entry from  pizzaStateReducer
          props.dispatchToPizzaStateReducer({
            type: "DeletePizza",
            item: pizzaIdToDelete,
          });
          setStatusSuccess(
            `PizzaId =${pizzaIdToDelete} deleted successfully !!!`
          );
          setTimeout(() => {
            setStatusSuccess("");
          }, 9000);
        }
      })
      .catch((err) => {
        setStatusFail(`Failed to delete PizzaId =${pizzaIdToDelete}  ...`);
        setTimeout(() => {
          setStatusFail("");
        }, 5000);
      });
  };
  //<======handler Functions==========================================
  return (
    <React.Fragment>
      <span className={`${styles.pizzaActionStatusSuccess} text-align-center`}>
        {statusSuccess}
      </span>
      <span className={`${styles.pizzaActionStatusFail}`}>{statusFail}</span>

      <div className={styles.containerPizzaTable}>
        <Table
          className={`table-light table-hover  table-bordered ${styles.pizzaTable}`}
        >
          <thead>
            <tr>
              <th>PizzaId</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>ImageURL</th>
              <th></th>
            </tr>
          </thead>

          <tbody className={`${styles.tableBody}`}>
            {props.pizzaList.map((p) => (
              <tr key={"key_" + p.pizzaId} id={`${p.pizzaId}_pp`}>
                <td>{p.pizzaId}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.type}</td>
                <td>{p.imageUrl}</td>
                <td id={`${p.pizzaId}_p`}>
                  <Button
                    type="submit"
                    onClick={(e: any) => {
                      setPizzaToEdit(pizzaMap.get(e.target.value)!);
                      handleShow();
                    }}
                    value={p.pizzaId}
                  >
                    Edit Pizza
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    className="ms-2 "
                    style={{ minWidth: "2rem", height: "2rem" }}
                    onClick={handleDeletePizza}
                    value={p.pizzaId}
                  >
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="ModalPizzaEdit">
        <Modal show={show} backdrop="static">
          <Modal.Header>
            <Modal.Title>
              Edit Pizza Details for PizzaId = {pizzaToEdit?.pizzaId}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalEditPizza}>
            <div className={`${styles.mainFormContainer}`}>
              <Form onSubmit={handleEditPizza}>
                <div className={`col-11 me-auto  ${styles.pizzaForm}`}>
                  <Row>
                    <Form.Group as={Row}>
                      <FormLabel htmlFor="pizzaId">PizzaId :</FormLabel>
                      <Form.Control
                        type="text"
                        name="pizzaId"
                        defaultValue={pizzaToEdit?.pizzaId}
                        readOnly
                        plaintext
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="pizzaName">
                      Enter Pizza Name :
                      <FormControl
                        type="text"
                        name="pizzaName"
                        defaultValue={pizzaToEdit?.name}
                      />
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="pizzaDescription">
                      Enter Pizza Description :
                      <FormControl
                        type="text"
                        name="pizzaDescription"
                        defaultValue={pizzaToEdit?.description}
                      />
                    </FormLabel>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="pizzaType">
                      Select Pizza Type :
                    </FormLabel>
                    <FormSelect
                      name="pizzaType"
                      defaultValue={pizzaToEdit?.type}
                    >
                      <option disabled>----choose pizza type----</option>
                      <option value={"VEG"}>VEG</option>
                      <option value={"NON_VEG"}>NON_VEG</option>
                    </FormSelect>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="pizzaImageUrl">
                      Enter Pizza Image URL :
                    </FormLabel>
                    <FormControl
                      type="text"
                      name="pizzaImageUrl"
                      defaultValue={pizzaToEdit?.imageUrl}
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

export default AdminShowPizzaTable;

// Not working on every click : on delete btn click , id is not fetching every time
// import React, { useState } from "react";
// import { Button, Table } from "react-bootstrap";
// import styles from "./adminDisplay_moduleCssFiles/adminShowPizzaTable.module.css";
// import { Pizza } from "../interfaces/pizzaInterface";
// import { BsFillTrashFill } from "react-icons/bs";
// import axios from "axios";

// type curProps = {
//   pizzaList: Pizza[];
//   dispatchToPizzaStateReducer: (input: any) => void;
// };

// const AdminShowPizzaTable = (props: curProps) => {
//   const [statusSuccess, setStatusSuccess] = useState("");
//   const [statusFail, setStatusFail] = useState("");
//   const [pizzaToEdit, setPizzaToEdit] = useState(null);
//   const [pizzaIdToDelete, setPizzaIdToDelete] = useState("ZA000");

//   //handler Functions
//   const handleDeletePizza = (e: any) => {
//     e.preventDefault();
//     const pizzaIdToDelete = e.target.value;

//     //===>fetch pizzaId to be deleted
//     // console.log("ppId= " + e.target.parentNode.parentNode.id);
//     // console.log("pId= " + e.target.parentNode.id);
//     console.log(e.target.value);
//     //<=======

//     axios
//       .delete(`http://localhost:8080/api/v1/pizzas/${pizzaIdToDelete}`)
//       .then((resp) => {
//         if (resp.status == 204) {
//           //if yes , delete entry from  pizzaStateReducer
//           props.dispatchToPizzaStateReducer({
//             type: "DeletePizza",
//             item: pizzaIdToDelete,
//           });
//           setStatusSuccess(
//             `PizzaId =${pizzaIdToDelete} deleted successfully !!!`
//           );
//           setTimeout(() => {
//             setStatusSuccess("");
//           }, 9000);
//         }
//       })
//       .catch((err) => {
//         setStatusFail(`Failed to delete PizzaId =${pizzaIdToDelete}  ...`);
//         setTimeout(() => {
//           setStatusFail("");
//         }, 5000);
//       });
//   };

//   return (
//     <React.Fragment>
//       <span className={`${styles.pizzaActionStatusSuccess} text-align-center`}>
//         {statusSuccess}
//       </span>
//       <span className={`${styles.pizzaActionStatusFail}`}>{statusFail}</span>

//       <div className={styles.containerPizzaTable}>
//         <Table
//           className={`table-light table-hover  table-bordered ${styles.pizzaTable}`}
//         >
//           <thead>
//             <tr>
//               <th>PizzaId</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Type</th>
//               <th>ImageURL</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody className={`${styles.tableBody}`}>
//             {props.pizzaList.map((p) => (
//               <tr key={"key_" + p.pizzaId} id={`${p.pizzaId}_pp`}>
//                 <td>{p.pizzaId}</td>
//                 <td>{p.name}</td>
//                 <td>{p.description}</td>
//                 <td>{p.type}</td>
//                 <td>{p.imageUrl}</td>
//                 <td id={`${p.pizzaId}_p`}>
//                   <Button>Edit Pizza</Button>
//                   <Button
//                     type="submit"
//                     variant="danger"
//                     className="ms-2 "
//                     style={{ minWidth: "2rem", height: "2rem" }}
//                     onClick={handleDeletePizza}
//                     value={p.pizzaId}
//                   >
//                     <BsFillTrashFill />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </React.Fragment>
//   );
// };

// export default AdminShowPizzaTable;
