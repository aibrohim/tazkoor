import Container from "components/container/container";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import { ReactComponent as Dots } from "assets/icons/dots.svg";
import { ReactComponent as Share } from "assets/icons/share.svg";
import { ReactComponent as Stats } from "assets/icons/statistics.svg";
import { ReactComponent as Users } from "assets/icons/users.svg";
import { ReactComponent as Pen } from "assets/icons/pen.svg";
import { ReactComponent as Leave } from "assets/icons/leave.svg";

import "./book-header.scss";
import Popup from "components/popup/popup";

const BookeHeader:FC = function() {
  const [ isPopupOpen, setPopupOpen ] = useState<boolean>(false);

  const handlePopupClosed = () => {
    console.log("ishladim");
    setPopupOpen(false)
  };
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

          {
            isPopupOpen
            &&
            (
              <Popup onPopupClosed={handlePopupClosed} className="book-header__popup">
                <ul className="book-header__popup-list">
                  <li className="book-header__popup-item">
                    <button className="book-header__popup-btn">
                      <span className="book-header__popup-btn-inner">
                        <span className="book-header__popup-btn-txt">Share</span>
                        <Share fill="currentColor" width={18} height={18} />
                      </span>
                    </button>
                  </li>
                  <li className="book-header__popup-item">
                    <button className="book-header__popup-btn">
                      <span className="book-header__popup-btn-inner">
                        <span className="book-header__popup-btn-txt">Users</span>
                        <Users fill="currentColor" width={18} height={18} />
                      </span>
                    </button>
                  </li>
                  <li className="book-header__popup-item">
                    <button className="book-header__popup-btn">
                      <span className="book-header__popup-btn-inner">
                        <span className="book-header__popup-btn-txt">Statistics</span>
                        <Stats fill="currentColor" width={18} height={18} />
                      </span>
                    </button>
                  </li>
                  <li className="book-header__popup-item">
                    <button className="book-header__popup-btn">
                      <span className="book-header__popup-btn-inner">
                        <span className="book-header__popup-btn-txt">Edit</span>
                        <Pen fill="currentColor" width={18} height={18} />
                      </span>
                    </button>
                  </li>
                  <li className="book-header__popup-item">
                    <button className="book-header__popup-btn book-header__popup-btn--exit">
                      <span className="book-header__popup-btn-inner">
                        <span className="book-header__popup-btn-txt">Leave</span>
                        <Leave fill="currentColor" width={18} height={18} />
                      </span>
                    </button>
                  </li>
                </ul>
              </Popup>
            )
          }
        </div>
      </Container>
    </header>
  );
}

export default BookeHeader;