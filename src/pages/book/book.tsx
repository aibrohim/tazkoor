import BookeHeader from "components/book-header/book-header";
import BookInfo from "components/book-info/book-info";
import Container from "components/container/container";
import GameBtns from "components/game-btns/game-btns";
import Nav from "components/nav/nav";
import Switch from "components/switch/switch";
import Themes from "components/themes/themes";
import Words from "components/words/words";
import { WordRelationType } from "consts";
import { FC, useState } from "react";

import "./book.scss";

enum BookPages {
  Themes,
  Words
}

const Book:FC = function() {
  const [ activePage, setActivePage ] = useState<BookPages>(BookPages.Themes);

  const handleSwitchChange = (changedItem:BookPages) => setActivePage(changedItem);

  return (
    <>
      <BookeHeader />
      <main className="book-page">
        <Container>
          <BookInfo />
          <GameBtns />
          
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