import { FC } from "react";

import "./theme-words-info.scss";

interface Props {
  themes: number | string;
  words: number | string
}

const ThemeWordsInfo:FC<Props> = function() {
  return (
    <div className="theme-words-info">
      <p className="theme-words-info__item">
        <strong className="theme-words-info__item-title">Themes:</strong>
        12
      </p>
      <p className="theme-words-info__item">
        <strong className="theme-words-info__item-title">Words:</strong>
        12
      </p>
    </div>
  );
}

export default ThemeWordsInfo;