import BookeHeader from "components/book-header/book-header";
import BookInfo from "components/book-info/book-info";
import Container from "components/container/container";
import GameBtns from "components/game-btns/game-btns";
import BookInfoSkeleton from "components/loaders/book-info-skeleton/book-info-skeleton";
import Nav from "components/nav/nav";
import Switch from "components/switch/switch";
import Themes from "components/themes/themes";
import Words from "components/words/words";
import { Book as BookProps, WordRelationType } from "consts";
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

const Book:FC = function() {
  const { id } = useParams();

  const { token } = useAuth();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: "books",
    queryFn: () => {
      return client("books", {
        method: "GET",
        token,
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });
  

  const [ activePage, setActivePage ] = useState<BookPages>(BookPages.Themes);

  const handleSwitchChange = (changedItem:BookPages) => setActivePage(changedItem);

  const currentBook : BookProps = data && data.books.find((book : BookProps) => book.id === (id ? +id : 0));
  console.log(!data && isLoading);
  

  return (
    <>
      <BookeHeader />
      <main className="book-page">
        <Container>
          {!data && isLoading && <BookInfoSkeleton />}
          {data && <BookInfo {...currentBook} />}

          <GameBtns
            isLoading={!data && isLoading}
            language_native={currentBook.language_native}
            language_translate={currentBook.language_translate}
            type={WordRelationType.Book} 
          />
          
          <div className="book-page__pages">
            {
              data 
              &&  
              (
                activePage === BookPages.Themes
                  ? <Themes />
                  : <Words languages={{language_native: currentBook.language_native, language_translate: currentBook.language_translate}} type={WordRelationType.Book} />
              )
            }
            <Switch className="book-page__switch" onChange={handleSwitchChange} />
          </div>
        </Container>
      </main>
      <Nav />
    </>
  );
}

export default Book;