import Button from "components/button/button";
import Container from "components/container/container";
import { TestWord, WordResult } from "consts";
import { FC, useEffect, useState } from "react";
import getStringCapitalized from "utils/stringCapitalizer";

import "./test-card.scss"; 

interface Props {
  word: TestWord,
  book: number;
  length: number;
  index: number;
  onAnswered?: (answer: WordResult) => void
}

const TestCard:FC<Props> = function({word, book, length, index, onAnswered}) {
  const [ answer, setAnswer ] = useState<WordResult | null>();
  const [ secondsRemaining, setSecondsRemaining ] = useState<number>(15);
  const [ answerShown, setAnswerShown ] = useState<boolean>(false);
  const [ checkedId, setCheckedId ] = useState<number | null>(null);

  useEffect(() => {
    if (secondsRemaining >= 1) {
      setTimeout(() => setSecondsRemaining(secondsRemaining - 1), 1000);
    } else {
      if (!answer) {
        setAnswerShown(true);
        setAnswer({
          id: word.id,
          title: word.title,
          title_translate: word.title_translate,
          partsofspeech: 1,
          book,
          theme: null,
          isTrue: false,
          seconds: 14
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsRemaining]);

  const handleFormChange = (evt: any) => {
    const changedItemId = +evt.target.dataset.id;

    const isCorrect = Boolean(changedItemId === word.id);

    setCheckedId(changedItemId);
    setAnswer({
      id: word.id,
      title: word.title,
      title_translate: word.title_translate,
      partsofspeech: 1,
      book,
      theme: null,
      isTrue: isCorrect,
      seconds: 14
    });
  }

  const handleSubmitClick = () => {
    if (answer && onAnswered) {
      onAnswered(answer);
    }
  }
  
  return (
    <main className="test-card">
      <Container className="test-card__container">
        <p className="test-card__word">
          {getStringCapitalized(word.title || "")}

          <span className="test-card__word-order">{index}/{length}</span>
          <span className="test-card__time-remaining">0:{secondsRemaining}</span>
        </p>
        <form onChange={handleFormChange} action="#" className="test-card__options">
          <fieldset disabled={Boolean(answer)} className="test-card__options-set">
            {
              word.options.map(option => (
                <label
                  key={option.id}
                  className={
                    `test-card__option-label 
                      ${(answerShown && option.id === word.id) ? "test-card__option-label--auto " : ""}
                      ${
                        answer && checkedId === option.id && !answerShown
                          ? answer.isTrue ? "test-card__option-label--true" : "test-card__option-label--false" 
                          : answer && !answer.isTrue && option.id === word.id && !answerShown ? "test-card__option-label--true" : ""
                      }
                    `}>
                  {getStringCapitalized(option.title_translate)}
                  <input data-id={option.id} className="visually-hidden" name="option" type="radio" />
                </label>
              ))
            }
          </fieldset>
        </form>

        <Button onClick={handleSubmitClick} disabled={!answer} className="test-card__next-btn" type="button">Keyingi savol</Button>
      </Container>
    </main>
  );
}

export default TestCard;