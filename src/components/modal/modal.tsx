import { AnimationEvent, forwardRef, MouseEvent, ReactNode, useImperativeHandle, useState } from "react";

import "./modal.scss";

interface Props {
  className?: string;
  onShadowClick?: Function;
  children: ReactNode
}

export interface RefMethods {
  close: () => Promise<void>;
}

const Modal = forwardRef<RefMethods, Props>(({children, onShadowClick}, ref) => {
  const [ isOpen, setOpen ] = useState<boolean>(true);

  const handleShadowClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      setOpen(false);
    }
  };
  
  const handleAnimationEnd = (evt: AnimationEvent<HTMLDivElement>) => {
    if (evt.animationName === "modal-content-close" && onShadowClick) {
      onShadowClick();
    }
  }

  useImperativeHandle(ref, () => ({
    close: () => {
      return new Promise((resolve:any) => {
        setOpen(false);
        setTimeout(() => {
          resolve();
        }, 150);
      });
    }
  }));

  return (
    <div onAnimationEnd={handleAnimationEnd} onClick={handleShadowClick} className={"modal " + (!isOpen ? "modal--closed" : "")}>
      <div className="modal__content">
        {children}
      </div>
    </div>
  );
});

export default Modal;