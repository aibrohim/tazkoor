import Button from "components/button/button";
import Container from "components/container/container";
import InfoModal from "components/info-modal/info-modal";
import { Colors, MessageTypes, Weights } from "consts";
import useStatusMessage from "hooks/useStatusMessage";
import { FC } from "react";
import { useParams } from "react-router-dom";

import "./share-book.scss";

interface Props {
  title: string;
  onClose?: () => void;
}

const ShareBook:FC<Props> = function({ title, onClose }) {
  const { id } = useParams();

  const { setMessage, setMessageType } = useStatusMessage();

  const handleShareClick = () => {
    if (setMessage && setMessageType) {
      navigator.clipboard.writeText(`${id}`).then(() => {
        setMessage("Copied");
        setMessageType(MessageTypes.success)
      })
      .catch(() => {
        setMessage("Something went wrong. Please try again");
        setMessageType(MessageTypes.error)
      })
    }
  }

  return (
    <InfoModal className="share-book" onClose={onClose}>
      <Container>
        <h2 className="share-book__title">{title}</h2>
        <p className="share-book__description">
          To share a book, copy the book ID:
          <strong className="share-book__id">{id}</strong>
        </p>

        <Button onClick={handleShareClick} className="share-book__btn" weight={Weights.semiBold} color={Colors.primary}>Copy ID</Button>
      </Container>
    </InfoModal>
  );
}

export default ShareBook;