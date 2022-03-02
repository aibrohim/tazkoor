import { AnimationEvent, Dispatch, FC, useEffect, useState } from "react";

import Img from "assets/images/splash-1.jpg";
import Container from "components/container/container";
import Button from "components/button/button";
import { Colors, Weights } from "consts";

import "./pro-modal.scss";

interface Props {
  openProp?: boolean;
  setOpen?: Dispatch<React.SetStateAction<boolean>>
}

const ProModal:FC<Props> = function({openProp, setOpen: setModalOpen}) {
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const [ isClosing, setClosing ] = useState<boolean>(false);

  useEffect(() => {
    if (typeof openProp === "boolean") {
      setOpen(openProp)
    }
  }, [openProp]);

  const handleCloseClick = ():void => {
    setClosing(true);
  }

  const handleAnimationEnd = (evt:AnimationEvent<HTMLDivElement>) => {
    if (evt.animationName === "pro-modal-content-close") {
      setClosing(false);
      setOpen(false);
      if (setModalOpen) {
        setModalOpen(false);
      }
    }
  }

  return (
    <div
      className={
        "pro-modal "
        + (isOpen ? "pro-modal--opened " : "")
        + (isClosing ? "pro-modal--closing" : "")
      }
    >
      <Container className="pro-modal__container">
        <div
          onAnimationEnd={handleAnimationEnd}
          className="pro-modal__wrapper"
        >
          <img className="pro-modal__img" src={Img} alt="Bookshelf" />
          <div className="pro-modal__content">
            <p className="pro-modal__heading">Subscribe to continue your activities</p>
            <p className="pro-modal__description">Whether a medieval typesetter chose to garble a well-known</p>

            <Button className="pro-modal__btn" link to="/pro" color={Colors.primary} weight={Weights.medium}>USD 0.99/month.</Button>
          </div>
          <button onClick={handleCloseClick} className="pro-modal__close">
            <span className="visually-hidden">Open/close modal</span>
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ProModal;