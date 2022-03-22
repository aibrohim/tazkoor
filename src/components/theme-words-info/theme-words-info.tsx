import { FC } from "react";

import "./theme-words-info.scss";

interface Props {
  themes: number | string | null;
  words: number | string | null;
}

const ThemeWordsInfo:FC<Props> = function({themes, words}) {
  return (
    <div className="theme-words-info">
      {
        Boolean(themes) &&
        <p className="theme-words-info__item">
          <strong className="theme-words-info__item-title">Themes: </strong>
          {themes}
        </p>
      }
      {
        <p className="theme-words-info__item">
          <strong className="theme-words-info__item-title">Words: </strong>
          {words}
        </p>
      }
    </div>
  );
}

export default ThemeWordsInfo;