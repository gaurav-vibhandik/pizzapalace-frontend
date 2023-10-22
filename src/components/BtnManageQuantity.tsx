import React from "react";
import styles from "./BtnManageQuantity.module.css";

const BtnManageQuantity = (props: any) => {
  const { quantity, handleBtnAdd, handleBtnRemove } = props;

  return (
    <React.Fragment>
      <div className={styles.btnContainer}>
        <div>
          <button
            type="button"
            className={styles.btnRemoveQty}
            onClick={handleBtnRemove}
          >
            -
          </button>
        </div>
        <div className={styles.btnQty}>{quantity}</div>

        <div className="">
          <button
            type="button"
            className={styles.btnAddQty}
            onClick={handleBtnAdd}
          >
            +
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BtnManageQuantity;
