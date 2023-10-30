import React from "react";
import styles from "../BtnManageQuantity.module.css";

const EditOrder_BtnManageQuantity = (props: any) => {
  const { curOrderLineId, quantity, handleBtnAdd, handleBtnRemove } = props;

  return (
    <React.Fragment>
      <div className={styles.btnContainer}>
        <div>
          <button
            type="button"
            className={styles.btnRemoveQty}
            onClick={() => {
              handleBtnRemove(curOrderLineId, quantity);
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
              handleBtnAdd(curOrderLineId);
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
