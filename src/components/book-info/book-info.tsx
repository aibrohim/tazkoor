import ThemeWordsInfo from "components/theme-words-info/theme-words-info";
import Title from "components/title/title";
import { Book, Weights } from "consts";
import { FC } from "react";

import "./book-info.scss";

const BookInfo:FC<Book> = function({title, language_native, language_translate, themes_count, words_count}) {
  return (
    <div className="book-info">
      <Title weight={Weights.medium} className="book-info__title">{title}</Title>
      <p className="book-info__languages">
        <strong className="book-info__languages">{language_native.name}</strong>
        &nbsp;and&nbsp;
        <strong className="book-info__languages">{language_translate.name}</strong>
      </p>

      <ThemeWordsInfo themes={themes_count} words={words_count} />
    </div>
  );
}

export default BookInfo;