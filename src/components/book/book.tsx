import { Book as BookProps } from "consts";
import { FC } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Share } from "assets/icons/share.svg";

import "./book.scss";
import BookCardSkeleton from "components/loaders/book-card-skeleton/book-card-skeleton";
import ThemeWordsInfo from "components/theme-words-info/theme-words-info";

interface Props extends BookProps {
  className?: string;
  [x:string]: any
}

const Book:FC<Props> = function({
  isLoading,
  id,
  title,
  language_native,
  language_translate,
  themes_count,
  words_count,
  className = ""
}) {

  if (isLoading) {
    return <BookCardSkeleton />;
  }
  
  return (
    <article className={"book " + className}>
      <Link className="book__link" to={"/book/" + id}>
        <h3 className="book__title">{title}</h3>
        <p className="book__languages">
          <strong className="book__language">{language_native.title}</strong>
          &nbsp;and&nbsp;
          <strong className="book__language">{language_translate.title}</strong>
        </p>
        <ThemeWordsInfo themes={themes_count} words={words_count} />
      </Link>

      <Link className="book__share" to={"/share-book/" + id}>
        <span className="visually-hidden">Share book</span>
        <Share className="book__share-icon" fill="#333" />
      </Link>
    </article>
  )
}

export default Book;