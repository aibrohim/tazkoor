import FormModal from "components/form-modal/form-modal";
import { WordResult } from "consts";
import { Dispatch, FC } from "react";

import "./game-results-modal.scss";

interface Props {
  isOpen: boolean; 
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  results: WordResult[]
}

const generateAnswerClass = function(isTrue : boolean) {
  return isTrue ? "game-results-modal__item-result--true" : "game-results-modal__item-result--false";
}

const GameResultsModal:FC<Props> = function({isOpen, setOpen, results}) {
  const handleModalClosed = () => setOpen(!isOpen);
  return (
    <FormModal title="Detailed results" opened={isOpen} onClose={handleModalClosed} description="Whether a medieval typesetter chose to garble a well-known">
      <div className="game-results-modal">
        <ul className="game-results-modal__list">
          {results.map(word => (
            <li key={word.id} className="game-results-modal__item">
              {word.title}
              <span className={"game-results-modal__item-result " + generateAnswerClass(word.isTrue)}>{word.isTrue ? "True" : "False"}</span>
            </li>
          ))}
        </ul>
      </div>
    </FormModal>
  );
}

export default GameResultsModal;