import { FC, Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";
import { ModalBodyProps } from "react-bootstrap/esm/ModalBody";

type ModalOverlayProps = {
  children: ReactNode;
};
const Backdrop: FC = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay: FC<ModalBodyProps> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement: any = document.getElementById("overlays");

const Modal: FC<ModalOverlayProps> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
