import React from "react";
import styles from "../BtnManageQuantity.module.css";
import OrderLine from "../interfaces/orderLineInterface";

const EditOrder_BtnManageQuantity = (props: any) => {
  const { quantity, handleBtnAdd, handleBtnRemove } = props;
  const curOL: OrderLine = props.curOrderLine;

  // console.log("=======> Inside BtnManageQty :");
  // console.log("🚀 ~ file: EditOrder_BtnManageQuantity.tsx:11 ~ curOl:", curOL);

  return (
    <React.Fragment>
      <div className={styles.btnContainer}>
        <div>
          <button
            type="button"
            className={styles.btnRemoveQty}
            onClick={() => {
              if (quantity == 1) {
                console.log(
                  "orderId= " + curOL.orderId + "  olID=" + curOL.orderLineId
                );
              }

              handleBtnRemove(curOL.orderId, curOL.orderLineId, quantity);
            }}
          >
            -
          </button>
        </div>
        <div className={styles.btnQty}>{quantity}</div>

        <div className="">
          <button
            type="button"
            className={styles.btnAddQty}
            onClick={() => {
              handleBtnAdd(curOL.orderId, curOL.orderLineId);
            }}
          >
            +
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditOrder_BtnManageQuantity;
