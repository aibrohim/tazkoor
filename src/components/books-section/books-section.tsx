import Book from "components/book/book";
import Title from "components/title/title";
import { Book as BookProps } from "consts";
import { FC } from "react";

import "./books-section.scss";

interface Props {
  title: string;
  books: BookProps[],
  bookClassName?: string;
  className?: string;
  listClass?: string;
}

const BooksSection:FC<Props> = function({title, books, className = "", bookClassName = "", listClass = ""}) {
  return (
    <section className={"books-section " + className}>
      <Title className="books-section__title">{title}</Title>

      <div className={"books-section__list " + listClass}>
        {books.map((book) => <Book className={bookClassName} key={book.id} {...book} />)}
      </div>
    </section>
  )
}

export default BooksSection;