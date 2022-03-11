import Container from "components/container/container";
import { AnimationEvent, FC, ReactElement, useEffect, useState } from "react";

import "./form-modal.scss";

export interface ModalProps {
  title: string;
  description?: string;
  onToggle?: Function;
  onClose?: Function;
  opened?: boolean;
  children?: ReactElement
}

const FormModal:FC<ModalProps> = function({
  title, 
  description, 
  opened, 
  onToggle, 
  onClose, 
  children
}) {
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const [ isClosing, setClosing ] = useState<boolean>(false);

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen)
    }
  }, [isOpen, onToggle]);

  useEffect(() => {
    if (typeof opened === "boolean") {
      setOpen(opened)
    }
  }, [opened]);

  const handleCloseClick = function() {
    setClosing(true);
  }

  const handleModalAnimationEnd = function(evt:AnimationEvent<HTMLDivElement>) {
    if (evt.animationName === "form-modal-closing") {
      setOpen(false);
      setClosing(false);
      if (onClose) {
        onClose();
      }
    }
  }

  const openClass = isOpen ? "form-modal--opened " : "";
  const closingClass = isClosing ? "form-modal--closing " : "";

  return (
    <div onAnimationEnd={handleModalAnimationEnd} className={"form-modal " + openClass + closingClass}>
      <div className="form-modal__content">
        <Container className="form-modal__container">
          <h2 className="form-modal__title">{title}</h2>
          {description && <p className="form-modal__description">{description}</p>}
          {children}
          <button onClick={handleCloseClick} className="form-modal__close">
            <span className="visually-hidden">Open/close modal</span>
          </button>
        </Container>
      </div>
    </div>
  );
}

export default FormModal;