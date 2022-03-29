import BookeHeader from "components/book-header/book-header";
import BookInfo from "components/book-info/book-info";
import BookUsers from "components/book-users/book-users";
import Container from "components/container/container";
import GameBtns from "components/game-btns/game-btns";
import BookInfoSkeleton from "components/loaders/book-info-skeleton/book-info-skeleton";
import Nav from "components/nav/nav";
import ShareBook from "components/share-book/share-book";
import Switch from "components/switch/switch";
import Themes from "components/themes/themes";
import UpdateBook from "components/update-book/update-book";
import Words from "components/words/words";
import { Book as BookProps, SwitchOption, WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
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
    queryKey: "books",
    queryFn: () => {
      return client("books", {
        method: "GET",
        token: user?.token,
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });
  

  const [ activePage, setActivePage ] = useState<BookPages>(BookPages.Themes);
  
  const [ isShareModalOpen, setShareModalOpen ] = useState<boolean>(false);
  const [ isUpdateModalOpen, setUpdateModalOpen ] = useState<boolean>(false);
  const [ isUsersOpen, setUsersOpen ] = useState<boolean>(false);

  const handleSwitchChange = (changedItem:BookPages) => {
    setActivePage(+changedItem)
  };

  const handleShareModalClose = () => setShareModalOpen(false);
  const handleShareBtnClick = () => setShareModalOpen(true);
  const handleUpdateBtnClick = () => setUpdateModalOpen(true);
  const handleUserClick = () => setUsersOpen(true);

  const currentBook : BookProps = data && data.books.find((book : BookProps) => book.id === (id ? +id : 0));
  
  return (
    <>
      <BookeHeader onShareClick={handleShareBtnClick} onEditClick={handleUpdateBtnClick} onUsersClick={handleUserClick} />
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

      {isUsersOpen && <BookUsers setOpen={setUsersOpen} />}
    </>
  );
}

export default Book;