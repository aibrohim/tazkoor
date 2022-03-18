import BookeHeader from "components/book-header/book-header";
import BookInfo from "components/book-info/book-info";
import Container from "components/container/container";
import GameBtns from "components/game-btns/game-btns";
import BookInfoSkeleton from "components/loaders/book-info-skeleton/book-info-skeleton";
import Nav from "components/nav/nav";
import Switch from "components/switch/switch";
import Themes from "components/themes/themes";
import Words from "components/words/words";
import { WordRelationType } from "consts";
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
    queryKey: "book_" + id,
    queryFn: () => {
      return client("books", {
        method: "GET",
        token,
        headers: {
          "theme_id": id
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });

  const [ activePage, setActivePage ] = useState<BookPages>(BookPages.Themes);

  const handleSwitchChange = (changedItem:BookPages) => setActivePage(changedItem);

  return (
    <>
      <BookeHeader />
      <main className="book-page">
        <Container>
          {!data && isLoading && <BookInfoSkeleton />}
          {data && <BookInfo {...data.books[0]} />}

          <GameBtns type={WordRelationType.Book} />
          
          <div className="book-page__pages">
            {
              activePage === BookPages.Themes
                ? <Themes />
                : <Words type={WordRelationType.Book} />
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