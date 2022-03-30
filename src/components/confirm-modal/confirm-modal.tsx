import Button from "components/button/button";
import Modal, { RefMethods } from "components/modal/modal";
import { Colors, Weights } from "consts";
import { FC, useRef } from "react";

import "./confirm-modal.scss";

interface Props {
  title: string;
  description?: string;
  onCancelClick?: Function;
  onAcceptClick?: (arg0: (() => Promise<void>) | undefined) => any;
  onShadowClick?: Function;
  confirmText?: string;
}

const ConfirmModal:FC<Props> = function({
  title, 
  description,
  confirmText,
  onCancelClick,
  onAcceptClick,
  onShadowClick
}) {
  const modalRef = useRef<RefMethods>(null);

  const handleCancelClick = function() {
    modalRef.current?.close().then(() => {
      if (onCancelClick) onCancelClick()
    });
  }

  const handleAcceptClick = function() {
    if (onAcceptClick) onAcceptClick(modalRef.current?.close);
  }

  const handleShadowClick = function(evt: any) {
    if (onShadowClick) {
      onShadowClick();
    }
  }
  
  return (
    <Modal ref={modalRef} onShadowClick={handleShadowClick} className="confirm-modal">
      <p className="confirm-modal__title">{title}</p>
      <p className="confirm-modal__description">{description}</p>

      <div className="confirm-modal__actions">
        <Button onClick={handleCancelClick} className="confirm-modal__action" weight={Weights.semiBold} color={Colors.muted}>Cancel</Button>
        <Button onClick={handleAcceptClick} className="confirm-modal__action" weight={Weights.semiBold} color={Colors.red}>{confirmText || "Leave"}</Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;