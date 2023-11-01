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
import styles from "./adminDisplay_moduleCssFiles/adminShowCrustTable.module.css";
import Crust from "../interfaces/crustInterface";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

type curProps = {
  crustMap: Map<string, string>;
  crustList: Crust[];
  dispatchToCrustStateReducer: (input: any) => void;
};

const AdminShowCrustTable = (props: curProps) => {
  const [statusSuccess, setStatusSuccess] = useState("");
  const [statusFail, setStatusFail] = useState("");
  const [crustToEdit, setCrustToEdit] = useState<Crust>();

  const handleSetCrustToEdit = (e: any) => {
    const crustIdToEdit = e.target.value;
    const crustToEdit = props.crustList.find(
      (crust) => crust.crustId === crustIdToEdit
    );
    setCrustToEdit(crustToEdit);
  };

  const crustMap = props.crustMap;

  //modal crust edit
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //=======> handler Functions==========================================

  //======> handle Edit crust entry ===========

  const handleEditCrust = (e: any) => {
    e.preventDefault();
    const newCrust: Crust = {
      crustId: e.target.crustId.value,
      crust: e.target.crustName.value,
    };
    console.log(newCrust);

    if (newCrust.crustId) {
      const updatedCrust = newCrust;

      //update the reducerCrustState so that table reloads with latest state data
      props.dispatchToCrustStateReducer({
        type: "EditCrust",
        item: updatedCrust,
      });

      setStatusSuccess(
        `Crust Entry with crustId = ${updatedCrust.crustId} updated  successfully!!! `
      );
      setTimeout(() => {
        setStatusSuccess("");
      }, 7000);
    } else {
      setStatusFail("Failed to edit crust :" + newCrust.crustId);
      setTimeout(() => {
        setStatusFail("");
      }, 7000);
    }

    // axios
    //   .put(
    //     "http://localhost:8080/api/v1/crusts/" + newCrust.crustId,
    //     newCrust
    //   )
    //   .then((resp) => {
    // if (resp.data.success) {
    //   const updatedCrust = resp.data.data.list[0];
    //   console.log(updatedCrust);

    //   //update the reducerCrustState so that table reloads with latest state data
    //   props.dispatchToCrustStateReducer({
    //     type: "EditCrust",
    //     item: updatedCrust,
    //   });

    //   setStatusSuccess(
    //     `Crust Entry with crustId = ${resp.data.data.list[0].crustId} updated  successfully!!! `
    //   );
    //   setTimeout(() => {
    //     setStatusSuccess("");
    //   }, 7000);
    //     }
    //   })
    //   .catch((err) => {
    // setStatusFail("Failed to edit crust :" + newCrust.crustId);
    // setTimeout(() => {
    //   setStatusFail("");
    // }, 7000);
    //   });

    handleClose();
  };

  //======> handle delete crust entry==========
  const handleDeleteCrust = (e: any) => {
    const crustIdToDelete = e.target.value;

    //fetch crustId to be deleted
    // console.log("ppId= " + e.target.parentNode.parentNode.id);
    // console.log("pId= " + e.target.parentNode.id);
    console.log("Deleting crustId = " + e.target.value);
    if (crustIdToDelete) {
      //if yes , delete entry from  crustStateReducer
      props.dispatchToCrustStateReducer({
        type: "DeleteCrust",
        item: crustIdToDelete,
      });
      setStatusSuccess(`CrustId =${crustIdToDelete} deleted successfully !!!`);
      setTimeout(() => {
        setStatusSuccess("");
      }, 9000);
    } else {
      setStatusFail(`Failed to delete CrustId =${crustIdToDelete}  ...`);
      setTimeout(() => {
        setStatusFail("");
      }, 5000);
    }
    // axios
    //   .delete(`http://localhost:8080/api/v1/crusts/${crustIdToDelete}`)
    //   .then((resp) => {
    // if (resp.status == 204) {
    //   //if yes , delete entry from  crustStateReducer
    //   props.dispatchToCrustStateReducer({
    //     type: "DeleteCrust",
    //     item: crustIdToDelete,
    //   });
    //   setStatusSuccess(
    //     `CrustId =${crustIdToDelete} deleted successfully !!!`
    //   );
    //   setTimeout(() => {
    //     setStatusSuccess("");
    //   }, 9000);
    //     }
    //   })
    //   .catch((err) => {
    // setStatusFail(`Failed to delete CrustId =${crustIdToDelete}  ...`);
    // setTimeout(() => {
    //   setStatusFail("");
    // }, 5000);
    //  });
  };
  //<======handler Functions==========================================
  return (
    <React.Fragment>
      <span className={`${styles.crustActionStatusSuccess} text-align-center`}>
        {statusSuccess}
      </span>
      <span className={`${styles.crustActionStatusFail}`}>{statusFail}</span>

      <div className={styles.containerCrustTable}>
        <Table
          className={`table-light table-hover  table-bordered ${styles.crustTable}`}
        >
          <thead>
            <tr>
              <th>Crust Id</th>
              <th>Crust Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody className={`${styles.tableBody}`}>
            {props.crustList.map((c) => (
              <tr key={"key_" + c.crustId} id={`${c.crustId}_pp`}>
                <td>{c.crustId}</td>
                <td>{c.crust}</td>
                <td id={`${c.crustId}_p`}>
                  <Button
                    type="submit"
                    onClick={(e: any) => {
                      handleSetCrustToEdit(e);
                      handleShow();
                    }}
                    value={c.crustId}
                  >
                    Edit Crust
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    className="ms-2 "
                    style={{ minWidth: "2rem", height: "2rem" }}
                    onClick={handleDeleteCrust}
                    value={c.crustId}
                  >
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="ModalCrustEdit">
        <Modal show={show} backdrop="static">
          <Modal.Header>
            <Modal.Title>
              Edit Crust Details for CrustId = {crustToEdit?.crustId}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalEditCrust}>
            <div className={`${styles.mainFormContainer}`}>
              <Form onSubmit={handleEditCrust}>
                <div className={`col-11 me-auto  ${styles.crustForm}`}>
                  <Row>
                    <Form.Group as={Row}>
                      <FormLabel htmlFor="crustId">CrustId :</FormLabel>
                      <Form.Control
                        type="text"
                        name="crustId"
                        defaultValue={crustToEdit?.crustId}
                        readOnly
                        plaintext
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <FormLabel htmlFor="crustName">
                      Enter Crust Name :
                      <FormControl
                        type="text"
                        name="crustName"
                        defaultValue={crustToEdit?.crust}
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

export default AdminShowCrustTable;
