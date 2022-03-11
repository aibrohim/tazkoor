import Button from "components/button/button";
import { FC, useState } from "react";
import { Colors, GameTypes, Weights, WordRelationType } from "consts";

import "./game-btns.scss";
import ChooseLanguageModal from "components/choose-language-modal/choose-language-modal";

interface Props {
  type: WordRelationType;
}

const GameBtns:FC<Props> = function({ type }) {
  const [ isLanguageModalOpen, setLanguageModalOpen ] = useState<boolean>(false);
  const [ gameType, setGameType ] = useState<GameTypes>(GameTypes.Card);

  const handleTestBtnClick = () => {
    setLanguageModalOpen(true);
    setGameType(GameTypes.Test);
  }

  const handleCardBtnClick = () => {
    setLanguageModalOpen(true);
    setGameType(GameTypes.Card);
  }

  const handleModalClosed = () => {
    setLanguageModalOpen(false);
  }

  return (
    <div className="game-btns">
      <Button
        className="game-btns__item"
        weight={Weights.medium}
        color={Colors.pink}
        onClick={handleTestBtnClick}
      >
        Test
      </Button>
      <Button
        onClick={handleCardBtnClick}
        className="game-btns__item"
        weight={Weights.medium}
        color={Colors.pink}
      >
        Card
      </Button>

      {
        isLanguageModalOpen
        && 
        (
          <ChooseLanguageModal
            opened={isLanguageModalOpen}
            onClose={handleModalClosed}
            type={type}
            title=""
            gameType={gameType}
          />
        )
      }
    </div>
  ); 
}

export default GameBtns;