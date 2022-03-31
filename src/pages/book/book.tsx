import BookeHeader from "components/book-header/book-header";
import BookInfo from "components/book-info/book-info";
import BookUsers from "components/book-users/book-users";
import ChangeUserPermissions from "components/change-user-permissions/change-user-permissions";
import Container from "components/container/container";
import GameBtns from "components/game-btns/game-btns";
import BookInfoSkeleton from "components/loaders/book-info-skeleton/book-info-skeleton";
import Nav from "components/nav/nav";
import ShareBook from "components/share-book/share-book";
import Switch from "components/switch/switch";
import Themes from "components/themes/themes";
import UpdateBook from "components/update-book/update-book";
import UsersStats from "components/users-stats/users-stats";
import Words from "components/words/words";
import { Book as BookProps, SwitchOption, BookUser, WordRelationType, BookRoles } from "consts";
import { useAuth } from "contexts/auth";
import { useEffect } from "react";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { client } from "utils/client";

import "./book.scss";

enum BookPages {
  Themes,
  Words
}

const tabs: SwitchOption[] = [
  {
    id: 0,
    text: "Themes"
  },
  {
    id: 1,
    text: "Words"
  }
]

const Book:FC = function() {
  const { id } = useParams();

  const { user } = useAuth();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: "book_" + id,
    queryFn: () => {
      return client("books/one", {
        method: "GET",
        token: user?.token,
        headers: {
          book: id
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  const [ activePage, setActivePage ] = useState<BookPages>(BookPages.Themes);
  
  const [ isShareModalOpen, setShareModalOpen ] = useState<boolean>(false);
  const [ isUpdateModalOpen, setUpdateModalOpen ] = useState<boolean>(false);
  const [ isUsersOpen, setUsersOpen ] = useState<boolean>(false);
  const [ isStatsOpen, setStatsOpen ] = useState<boolean>(false);

  const [ , setUsers ] = useState<BookUser[]>([]);
  const [ activeUser, setActiveUser ] = useState<BookUser | null>(null);

  const handleSwitchChange = (changedItem:BookPages) => {
    setActivePage(+changedItem)
  };

  const handleShareModalClose = () => setShareModalOpen(false);
  const handleShareBtnClick = () => setShareModalOpen(true);
  const handleUpdateBtnClick = () => setUpdateModalOpen(true);
  const handleUserClick = () => navigate("#users");
  const handleStatsClick = () => navigate("#stats");

  useEffect(() => {
    if (location.hash === "#users") {
      setUsersOpen(true)
    } else {
      setUsersOpen(false);
    }

    if (location.hash === "#stats") {
      setStatsOpen(true)
    } else {
      setStatsOpen(false);
    }
  }, [location]);

  const currentBook : BookProps = data && data.book;
  const bookRole: number | undefined = data && currentBook.role - 1;
  
  return (
    <>
      <BookeHeader role={bookRole} onShareClick={handleShareBtnClick} onEditClick={handleUpdateBtnClick} onUsersClick={handleUserClick} onStatsClick={handleStatsClick} />
      <main className="book-page">
        <Container>
          {!data && isLoading && <BookInfoSkeleton />}
          {currentBook && <BookInfo {...currentBook} />}

          {activePage === BookPages.Words && (
            <GameBtns
              isLoading={!data && isLoading}
              language_native={currentBook?.language_native}
              language_translate={currentBook?.language_translate}
              type={WordRelationType.Book} 
            />
          )}
          
          <div className="book-page__pages">
            {
              activePage === BookPages.Themes
                ? <Themes />
                : <Words
                  languages={
                    currentBook
                      ? {language_native: currentBook.language_native, language_translate: currentBook.language_translate}
                      : undefined
                  }
                  type={WordRelationType.Book}
                />
            }
            <Switch options={tabs} className="book-page__switch" onChange={handleSwitchChange} />
          </div>
        </Container>

        {isShareModalOpen && <ShareBook title="Bir nima kitob" onClose={handleShareModalClose} />}
        {
          currentBook
          && 
          <UpdateBook
            isOpened={isUpdateModalOpen}
            setOpen={setUpdateModalOpen}
            title={currentBook.title}
            language_native={currentBook.language_native.id}
            language_translate={currentBook.language_translate.id}
          />
          }
      </main>
      <Nav />

      {isUsersOpen && <BookUsers setUsers={setUsers} setActiveUser={setActiveUser} />}
      {isStatsOpen && <UsersStats setOpen={setStatsOpen} />}
      {activeUser && currentBook.role - 1 === BookRoles.Owner && <ChangeUserPermissions user={activeUser} setActiveUser={setActiveUser} />}
    </>
  );
}

export default Book;