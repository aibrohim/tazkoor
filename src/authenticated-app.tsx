import AddBook from "pages/add-book/add-book";
import Book from "pages/book/book";
import Books from "pages/books/books";
import CardGame from "pages/card-game/card-game";
import Home from "pages/home/home";
import TestGame from "pages/test-game/test-game";
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
      <Route path="/game/card/:wordRelation/:id" element={<CardGame />} />
      <Route path="/game/test/:wordRelation/:id" element={<TestGame />} />
    </Routes>
  )
};

export default AuthenticatedApp;