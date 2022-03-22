import Container from "components/container/container";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import { ReactComponent as Dots } from "assets/icons/dots.svg";
import BookThemeHeaderPopup from "components/book-theme-header-popup/book-theme-header-popup";
import { HeaderPopupTypes } from "consts";

interface Props {
  bookId: number | null
}

const ThemeHeader:FC<Props> = function({bookId}) {
  const [ isPopupOpen, setPopupOpen ] = useState<boolean>(false);
  
  const handlePopupOpenerClick = () => setPopupOpen(true);

  return (
    <header className="book-header">
      <Container className="book-header__container">
        <Link to={bookId ? `/book/${bookId}` : `/books`} className="book-header__back">
          <ChevronLeft width={24} height={24} className="book-header__back-icon" />
        </Link>
        <p className="book-header__title">Theme</p>
        <div className="book-header__popup-wrapper">
          <button onClick={handlePopupOpenerClick} className="book-header__popup-toggler">
            <Dots className="book-header__popup-toggler-icon" />
          </button>

          <BookThemeHeaderPopup
            isPopupOpen={isPopupOpen}
            setPopupOpen={setPopupOpen}
            type={HeaderPopupTypes.Theme}
          />
        </div>
      </Container>
    </header>
  );
}

export default ThemeHeader;