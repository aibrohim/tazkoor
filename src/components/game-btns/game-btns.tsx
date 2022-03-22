import Button from "components/button/button";
import { FC, useState } from "react";
import { Colors, GameTypes, Language, Weights, WordRelationType } from "consts";

import "./game-btns.scss";
import ChooseLanguageModal from "components/choose-language-modal/choose-language-modal";

interface Props {
  isLoading: boolean;
  type: WordRelationType;
  language_native: Language;
  language_translate: Language;
}

const GameBtns:FC<Props> = function({ type, language_native, language_translate, isLoading }) {
  console.log(isLoading);
  
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
      {
        (isLoading && !language_native && !language_translate)
        ? 
          (
            <>
              <div className="game-btns__item skeleton" />
              <div className="game-btns__item skeleton" />
            </>
          )
        : (
          <>
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
          </>
        )
      }

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
            language_native={language_native} 
            language_translate={language_translate}
          />
        )
      }
    </div>
  ); 
}

export default GameBtns;