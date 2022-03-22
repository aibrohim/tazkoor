import Button from "components/button/button";
import Container from "components/container/container";
import { Colors, Word } from "consts";
import { FC, useEffect, useState } from "react";
import getStringCapitalized from "utils/stringCapitalizer";

import "./card-body.scss";

interface Props {
  wordData: Word | undefined;
  length: number;
  order: number;
  onAnswerCheck: (isTrue : boolean) => void
}

const CardBody:FC<Props> = function({wordData, length, order, onAnswerCheck}) {
  const [ isTranslationShown, setTranslationShow ] = useState<boolean>(false);
  const [ secondsRemaining, setSecondsRemaining ] = useState<number>(30);

  useEffect(() => {
    if (secondsRemaining >= 1) {
      setTimeout(() => setSecondsRemaining(secondsRemaining - 1), 1000);
    } else {
      setTranslationShow(true)
    }
  }, [secondsRemaining]);

  const handleShowAnswerClick = function() {
    setTranslationShow(true);
    setSecondsRemaining(0);
  }

  const translationShownWrapperClass = isTranslationShown ? "card-body__wrapper--shown" : "card-body__wrapper--hidden";

  if (!wordData) {
    return null;
  }

  const handleFalseClick = () => {
    onAnswerCheck(false);
  }

  const handleTrueClick = () => {
    onAnswerCheck(true);
  }

  const { title, title_translate } = wordData;

  return (
    <div className="card-body">
      <Container className="card-body__container">
        <div className={"card-body__wrapper " + translationShownWrapperClass}>
          <div className="card-body__word card-body__word--front"> 
            <p className="card-body__word-name">{getStringCapitalized(title)}</p>
            <span className="card-body__word-order">{order}/{length}</span>
            <span className="card-body__time-remaining">0:{secondsRemaining}</span>
          </div>
          <div className={"card-body__word card-body__word--back"}> 
            <p className="card-body__word-name">{getStringCapitalized(title_translate)}</p>
            <p className="card-body__word-translation">{getStringCapitalized(title)}</p>
            <span className="card-body__word-order">{order}/{length}</span>
          </div>
        </div>
        {!isTranslationShown 
          ? <Button onClick={handleShowAnswerClick}>Javobni ko'rish</Button>
          : (
            <div className="card-body__answer-options">
              <Button onClick={handleFalseClick} className="card-body__answer-option" data-answer="false" color={Colors.pink}>Noto'g'ri</Button>
              <Button onClick={handleTrueClick} className="card-body__answer-option" data-answer="true" color={Colors.success}>To'g'ri</Button>
            </div>
          )
        }
      </Container>
    </div>
  );
}

export default CardBody;