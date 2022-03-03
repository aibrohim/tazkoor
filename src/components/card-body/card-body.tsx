import Button from "components/button/button";
import Container from "components/container/container";
import { Colors } from "consts";
import { FC, useEffect, useState } from "react";

import "./card-body.scss";

const CardBody:FC = function() {
  const [ isTranslationShown, setTranslationShow ] = useState<boolean>(false);
  const [ secondsRemaining, setSecondsRemaining ] = useState<number>(5);

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

  return (
    <div className="card-body">
      <Container className="card-body__container">
        <div className={"card-body__wrapper " + translationShownWrapperClass}>
          <div className="card-body__word card-body__word--front"> 
            <p className="card-body__word-name">Apple</p>
            <span className="card-body__word-order">1/8</span>
            <span className="card-body__time-remaining">0:{secondsRemaining}</span>
          </div>
          <div className={"card-body__word card-body__word--back"}> 
            <p className="card-body__word-name">Olma</p>
            <p className="card-body__word-translation">Apple</p>
            <span className="card-body__word-order">1/8</span>
          </div>
        </div>
        {!isTranslationShown 
          ? <Button onClick={handleShowAnswerClick}>Javobni ko'rish</Button>
          : (
            <div className="card-body__answer-options">
              <Button className="card-body__answer-option" color={Colors.pink}>Noto'g'ri</Button>
              <Button className="card-body__answer-option" color={Colors.success}>To'g'ri</Button>
            </div>
          )
        }
      </Container>
    </div>
  );
}

export default CardBody;