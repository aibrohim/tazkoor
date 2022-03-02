import BooksSection from "components/books-section/books-section";
import { books } from "mock/books";
import { FC } from "react";

import "./recent-books.scss";

const RecentBooks:FC = function() {
  return (
    <BooksSection
      books={books}
      title="Recent books"
      className="recent-books"
      bookClassName="recent-books__book"
      listClass="recent-books__books"
    />
  );
}

export default RecentBooks;