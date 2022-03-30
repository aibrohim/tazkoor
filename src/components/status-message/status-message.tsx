import { FC } from "react";

import { ReactComponent as Close } from "assets/icons/close.svg";
import { ReactComponent as CheckCircle } from "assets/icons/check-circle.svg";
import { ReactComponent as Warning } from "assets/icons/warning.svg";

import "./status-message.scss";
import useStatusMessage from "hooks/useStatusMessage";
import { MessageTypes } from "consts";

const StatusMessage:FC = function() {
  const { message, type, setMessage } = useStatusMessage();

  const handleCloseClick = () => {
    if (setMessage) {
      setMessage("")
    }
  };

  return (
    <div className={`status-message ${type === MessageTypes.error ? "status-message--error" : ""}`}>
      {type === MessageTypes.success ? <CheckCircle className="status-message__icon" /> : <Warning className="status-message__icon" />}
      {message}
      <button onClick={handleCloseClick} className="status-message__close"><Close width={18} height={18} fill="#333333" /></button>
    </div>
  );
}

export default StatusMessage;