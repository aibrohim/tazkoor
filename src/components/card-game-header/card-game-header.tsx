import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import ConfirmModal from "components/confirm-modal/confirm-modal";
import Container from "components/container/container";
import { GameTypes } from "consts";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./card-game-header.scss";

interface Props {
  type: GameTypes;
  backUrl: string;
}

const GameHeader:FC<Props> = function({type, backUrl}) {
  const [ isConfirmOpen, setConfirmOpen ] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleBackClick = function() {
    setConfirmOpen(!isConfirmOpen);
  }
  
  const handleAcceptClick = function() {
    navigate(backUrl);
  }

  const handleCancelClick = function() {
    setConfirmOpen(false);
  }

  const handleShadowClick = () => setConfirmOpen(false);

  return (
    <>
      <header className="card-game-header">
        <Container className="card-game-header__container">
          <button onClick={handleBackClick} className="card-game-header__back">
            <ChevronLeft className="card-game-header__back-icon" />
          </button>

          <p className="card-game-header__title">{type[0].toUpperCase() + type.slice(1)} game</p>
        </Container>
      </header>

      {
        isConfirmOpen &&
        (
          <ConfirmModal
            title="Are you sure you want to delete this user?"
            description="Then you can't get that user back"
            onAcceptClick={handleAcceptClick}
            onCancelClick={handleCancelClick}
            onShadowClick={handleShadowClick}
          />
        )
      }
    </>
  );
};

export default GameHeader;