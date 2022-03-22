import Popup from "components/popup/popup";
import { Dispatch, FC, MouseEvent } from "react";

import { ReactComponent as Share } from "assets/icons/share.svg";
import { ReactComponent as Stats } from "assets/icons/statistics.svg";
import { ReactComponent as Users } from "assets/icons/users.svg";
import { ReactComponent as Pen } from "assets/icons/pen.svg";
import { ReactComponent as Leave } from "assets/icons/leave.svg";
import { HeaderPopupTypes } from "consts";

interface Props {
  isPopupOpen: boolean;
  setPopupOpen: Dispatch<React.SetStateAction<boolean>>;
  type: HeaderPopupTypes;
  onShareClick?: () => void;
  onUsersClick?: () => void;
  onStatsClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
}

const BookThemeHeaderPopup:FC<Props> = ({
  isPopupOpen, 
  setPopupOpen, 
  type,
  onShareClick,
  onUsersClick,
  onStatsClick,
  onEditClick,
  onDeleteClick
}) => {
  const handlePopupClosed = () => {
    setPopupOpen(false)
  };

  if (!isPopupOpen) {
    return null;
  }

  return (
    <Popup onPopupClosed={handlePopupClosed} className="book-header__popup">
      <ul className="book-header__popup-list">
        {
          type === HeaderPopupTypes.Book
          && (
            <li className="book-header__popup-item">
              <button onClick={onShareClick ? () => onShareClick() : undefined} className="book-header__popup-btn">
                <span className="book-header__popup-btn-inner">
                  <span className="book-header__popup-btn-txt">Share</span>
                  <Share fill="currentColor" width={18} height={18} />
                </span>
              </button>
            </li>
          )
        }
        {
          type === HeaderPopupTypes.Book
          && (
            <li className="book-header__popup-item">
              <button onClick={onUsersClick ? () => onUsersClick() : undefined} className="book-header__popup-btn">
                <span className="book-header__popup-btn-inner">
                  <span className="book-header__popup-btn-txt">Users</span>
                  <Users fill="currentColor" width={18} height={18} />
                </span>
              </button>
            </li>
          )
        }
        <li className="book-header__popup-item">
          <button onClick={onStatsClick ? () => onStatsClick() : undefined} className="book-header__popup-btn">
            <span className="book-header__popup-btn-inner">
              <span className="book-header__popup-btn-txt">Statistics</span>
              <Stats fill="currentColor" width={18} height={18} />
            </span>
          </button>
        </li>
        <li className="book-header__popup-item">
          <button onClick={onEditClick ? () => onEditClick() : undefined} className="book-header__popup-btn">
            <span className="book-header__popup-btn-inner">
              <span className="book-header__popup-btn-txt">Edit</span>
              <Pen fill="currentColor" width={18} height={18} />
            </span>
          </button>
        </li>
        <li className="book-header__popup-item">
          <button onClick={onDeleteClick ? (evt: MouseEvent<HTMLButtonElement>) => onDeleteClick(evt) : undefined} className="book-header__popup-btn book-header__popup-btn--exit">
            <span className="book-header__popup-btn-inner">
              <span className="book-header__popup-btn-txt">Delete</span>
              <Leave fill="currentColor" width={18} height={18} />
            </span>
          </button>
        </li>
      </ul>
    </Popup>
  );
}

export default BookThemeHeaderPopup;