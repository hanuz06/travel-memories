import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  const modalRef = useRef(null);

  const content = (
    <div ref={modalRef} className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
  return createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props?.show && <Backdrop onClick={props?.onCancel} />}
      <CSSTransition in={props?.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
