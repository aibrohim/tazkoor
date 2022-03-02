import Container from "components/container/container";
import { FC } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import { ReactComponent as Dots } from "assets/icons/dots.svg";

import "./book-header.scss";

const BookeHeader:FC = function() {
  return (
    <header className="book-header">
      <Container className="book-header__container">
        <Link to="/" className="book-header__back">
          <ChevronLeft width={24} height={24} className="book-header__back-icon" />
        </Link>
        <p className="book-header__title">Book</p>
        <div className="book-header__popup-wrapper">
          <button className="book-header__popup-toggler">
            <Dots className="book-header__popup-toggler-icon" />
          </button>
        </div>
      </Container>
    </header>
  );
}

export default BookeHeader;