import { FC, MouseEvent } from "react";

import "./word-card.scss";

interface Props {
  id: Number;
  nativeLanguage: string;
  translateLanguage: string;
  onClick?: Function;
}

const WordCard:FC<Props> = function({id, nativeLanguage, translateLanguage, onClick}) {
  const handleButtonClick = function(evt: MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(evt);
    }
  }

  return (
    <article className="word-card">
      <h3 className="word-card__native">{nativeLanguage}</h3>
      <p className="word-card__translate">{translateLanguage}</p>
      <button data-id={id} onClick={handleButtonClick} className="word-card__edit">
        <span className="visually-hidden">open edit modal</span>
      </button>
    </article>
  );
}

export default WordCard;