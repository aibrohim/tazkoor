import { FC, ReactNode } from "react";

import "./popup.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const Popup:FC<Props> = function({ className = "", children }) {
  return (
    <div className={"popup " + className}>
      {children}
    </div>
  );
}

export default Popup;