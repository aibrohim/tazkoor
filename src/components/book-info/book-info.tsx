import ThemeWordsInfo from "components/theme-words-info/theme-words-info";
import Title from "components/title/title";
import { Weights } from "consts";
import { FC } from "react";

import "./book-info.scss";

const BookInfo:FC = function() {
  return (
    <div className="book-info">
      <Title weight={Weights.medium} className="book-info__title">Advanced Grammar in Use</Title>
      <p className="book-info__languages">
        <strong className="book-info__languages">Russian</strong>
        &nbsp;and&nbsp;
        <strong className="book-info__languages">English</strong>
      </p>

      <ThemeWordsInfo />
    </div>
  );
}

export default BookInfo;