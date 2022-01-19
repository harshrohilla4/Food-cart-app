import { Fragment } from "react";
import  ReactDOM  from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={classes.backdrop}/>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const HtmlElement = document.getElementById("Overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop/>, HtmlElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        HtmlElement
      )}
    </Fragment>
  );
};

export default Modal;
