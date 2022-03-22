import Container from "components/container/container";
import BookThemeHeaderPopup from "components/book-theme-header-popup/book-theme-header-popup";

import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import { ReactComponent as Dots } from "assets/icons/dots.svg"

import { HeaderPopupTypes } from "consts";

import "./book-header.scss";

interface Props {
  onShareClick?: () => void;
  onUsersClick?: () => void;
  onStatsClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const BookeHeader:FC<Props> = function(props) {
  const [ isPopupOpen, setPopupOpen ] = useState<boolean>(false);
  
  const handlePopupOpenerClick = () => setPopupOpen(true);

  return (
    <header className="book-header">
      <Container className="book-header__container">
        <Link to="/" className="book-header__back">
          <ChevronLeft width={24} height={24} className="book-header__back-icon" />
        </Link>
        <p className="book-header__title">Book</p>
        <div className="book-header__popup-wrapper">
          <button onClick={handlePopupOpenerClick} className="book-header__popup-toggler">
            <Dots className="book-header__popup-toggler-icon" />
          </button>

          <BookThemeHeaderPopup
            isPopupOpen={isPopupOpen}
            setPopupOpen={setPopupOpen}
            type={HeaderPopupTypes.Book}
            {...props}
          />
        </div>
      </Container>
    </header>
  );
}

export default BookeHeader;