import Container from "components/container/container";
import { AnimationEvent, FC, ReactNode, useState } from "react";

import "./info-modal.scss";

interface Props {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}

const InfoModal:FC<Props> = function({className = "", children, onClose}) {
  const [ isClosing, setClosing ] = useState<boolean>(false);

  const handleCloseClick = () => setClosing(true);
  const handleModalClick = (evt: any) => {
    if (evt.target.matches(".info-modal__container") || evt.target.matches(".info-modal")) {
      setClosing(true)
    }
  };

  const handleAnimationEnd = (evt: AnimationEvent<HTMLDivElement>) => {
    if (evt.animationName === "info-modal-content-close" && onClose) {
      onClose();
    }
  }

  return (
    <div onAnimationEnd={handleAnimationEnd} onClick={handleModalClick} className={`info-modal ${isClosing ? "info-modal--closing " : ""}`}>
      <Container className="info-modal__container">
        <div className={`info-modal__content ${className}`}>
          {children}

          <button onClick={handleCloseClick} className="info-modal__close">
            <span className="visually-hidden">Open/close modal</span>
          </button>
        </div>
      </Container>
    </div>
  )
}

export default InfoModal;