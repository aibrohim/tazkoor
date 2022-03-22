import Container from "components/container/container";
import { FC, MouseEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ChevronLeft } from "assets/icons/chevron-left.svg";
import { ReactComponent as Dots } from "assets/icons/dots.svg";
import BookThemeHeaderPopup from "components/book-theme-header-popup/book-theme-header-popup";
import { HeaderPopupTypes } from "consts";
import { useMutation } from "react-query";
import { client } from "utils/client";
import { useAuth } from "contexts/auth";
import ConfirmModal from "components/confirm-modal/confirm-modal";

interface Props {
  bookId: number | null
}

const ThemeHeader:FC<Props> = function({bookId}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ isDeleteModalOpen, setDeleteModalOpen ] = useState<boolean>(false);
  const [ isPopupOpen, setPopupOpen ] = useState<boolean>(false);

  const { token } = useAuth();

  const { mutateAsync } = useMutation(() => client(`themes`, {
    token,
    method: "DELETE",
    data: {
      id: id,
    }
  }));
  
  const handlePopupOpenerClick = () => setPopupOpen(true);
  const handleDeleteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.currentTarget.blur();

    setPopupOpen(false);
    setDeleteModalOpen(true);
  };

  const handleAcceptClick = () => mutateAsync().then(() => navigate(`/book/${bookId}`));

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
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </Container>
      {isDeleteModalOpen && <ConfirmModal onAcceptClick={handleAcceptClick} title="Do you really want to delete this theme?" />}
    </header>
  );
}

export default ThemeHeader;