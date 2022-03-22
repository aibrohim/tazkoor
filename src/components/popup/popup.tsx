import useEventListener from "hooks/useEventListener";
import { AnimationEvent, FC, ReactNode, useEffect, useState } from "react";

import "./popup.scss";

interface Props {
  className?: string;
  children: ReactNode;
  onPopupClosed?: () => void;
}

const Popup:FC<Props> = function({ className = "", children, onPopupClosed }) {
  const [ isClosing, setClosing ] = useState<boolean>(false);

  const handleDocClick = (evt:any) => {
    if (!evt.target.closest(".popup")) {
      setClosing(true)
    }
  };

  useEventListener("click", handleDocClick);

  const handlePopupAnimaitonEnd = (evt: AnimationEvent<HTMLDivElement>) => {
    if (evt.animationName === "popup-closing" && onPopupClosed) {
      onPopupClosed();
    }
  }

  return (
    <div onAnimationEnd={handlePopupAnimaitonEnd} className={`popup ${(isClosing ? "popup--closing " : "") + className}`}>
      {children}
    </div>
  );
}

export default Popup;