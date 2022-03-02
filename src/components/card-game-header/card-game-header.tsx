import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import Container from "components/container/container";

import "./card-game-header.scss";

const CardGameHeader = function() {
  return (
    <header className="card-game-header">
      <Container className="card-game-header__container">
        <button className="card-game-header__back">
          <ChevronLeft className="card-game-header__back-icon" />
        </button>

        <p className="card-game-header__title">Card game</p>
      </Container>
    </header>
  );
};

export default CardGameHeader;