import AddBook from "pages/add-book/add-book";
import Book from "pages/book/book";
import Books from "pages/books/books";
import CardGame from "pages/card-game/card-game";
import Home from "pages/home/home";
import Theme from "pages/theme/theme";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const AuthenticatedApp:FC = function() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/library" element={<Books />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="/theme/:id" element={<Theme />} />
      <Route path="/card/:id" element={<CardGame />} />
    </Routes>
  )
};

export default AuthenticatedApp;