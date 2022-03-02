import BooksSection from "components/books-section/books-section"
import { Book } from "consts";
import { FC } from "react";

import "./all-books.scss";

interface Props {
  books: Book[]
}

const AllBooks:FC<Props> = function({books}) {
  return (
    <BooksSection 
      title="All books"
      className="all-books"
      bookClassName="all-books__book"
      books={books}
    />
  )
}

export default AllBooks;