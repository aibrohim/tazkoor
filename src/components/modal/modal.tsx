import { FC, ReactNode } from "react";

import "./modal.scss";

interface Props {
  className?: string;
  onShadowClick?: Function;
  children: ReactNode
}

const Modal:FC<Props> = function({children, onShadowClick}) {
  const handleShadowClick = () => {if (onShadowClick) onShadowClick()};

  return (
    <div onClick={handleShadowClick} className="modal">
      <div className="modal__content">
        {children}
      </div>
    </div>
  );
}

export default Modal;