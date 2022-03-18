import BookInfo from "components/book-info/book-info";
import Container from "components/container/container";
import GameBtns from "components/game-btns/game-btns";
import Nav from "components/nav/nav";
import ThemeHeader from "components/theme-header/theme-header";
import Words from "components/words/words";
import { WordRelationType } from "consts";
import { FC } from "react";

const Theme:FC = function() {
  return (
    <>
      <ThemeHeader />
      <main className="theme-page">
        <Container>
          {/* <BookInfo /> */}
          <GameBtns type={WordRelationType.Theme} />

          <Words type={WordRelationType.Theme} />
        </Container>
      </main>
      <Nav />
    </>
  );
};

export default Theme;