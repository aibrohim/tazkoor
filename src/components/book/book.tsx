import { Book as BookProps } from "consts";
import { FC } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Share } from "assets/icons/share.svg";

import "./book.scss";
import BookCardSkeleton from "components/loaders/book-card-skeleton/book-card-skeleton";

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
        <div className="book__footer">
          {themes_count ? <p className="book__data">Themes: {themes_count}</p> : null}
          {words_count ? <p className="book__data">Words: {words_count}</p> : null}
        </div>
      </Link>

      <Link className="book__share" to={"/share-book/" + id}>
        <span className="visually-hidden">Share book</span>
        <Share className="book__share-icon" fill="#333" />
      </Link>
    </article>
  )
}

export default Book;