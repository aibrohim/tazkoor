import Button from "components/button/button";
import Modal from "components/modal/modal";
import { Colors, Weights } from "consts";
import { FC } from "react";

import "./confirm-modal.scss";

interface Props {
  title: string;
  description?: string;
  onCancelClick?: Function;
  onAcceptClick?: Function;
  onShadowClick?: Function;
}

const ConfirmModal:FC<Props> = function({
  title, 
  description,
  onCancelClick,
  onAcceptClick,
  onShadowClick
}) {
  const handleCancelClick = function() {
    if (onCancelClick) onCancelClick();
  }

  const handleAcceptClick = function() {
    if (onAcceptClick) onAcceptClick();
  }

  const handleShadowClick = function() {
    if (onShadowClick) onShadowClick();
  }
  
  return (
    <Modal onShadowClick={handleShadowClick} className="confirm-modal">
      <p className="confirm-modal__title">{title}</p>
      <p className="confirm-modal__description">{description}</p>

      <div className="confirm-modal__actions">
        <Button onClick={handleCancelClick} className="confirm-modal__action" weight={Weights.semiBold} color={Colors.muted}>Cancel</Button>
        <Button onClick={handleAcceptClick} className="confirm-modal__action" weight={Weights.semiBold} color={Colors.red}>Leave</Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;