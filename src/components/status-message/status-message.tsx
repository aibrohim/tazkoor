import { FC } from "react";

import { ReactComponent as Close } from "assets/icons/close.svg";
import { ReactComponent as CheckCircle } from "assets/icons/check-circle.svg";

import "./status-message.scss";

const StatusMessage:FC = function() {
  return (
    <div className="status-message">
      <CheckCircle className="status-message__icon" />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, soluta.
      <button className="status-message__close"><Close width={18} height={18} fill="#333333" /></button>
    </div>
  );
}

export default StatusMessage;