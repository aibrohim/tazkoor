import BookInfo from "components/book-info/book-info";
import Container from "components/container/container";
import GameBtns from "components/game-btns/game-btns";
import BookInfoSkeleton from "components/loaders/book-info-skeleton/book-info-skeleton";
import Nav from "components/nav/nav";
import ThemeHeader from "components/theme-header/theme-header";
import Words from "components/words/words";
import { WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

const Theme:FC = function() {
  const { id } = useParams();

  const { token } = useAuth();

  const { 
    isLoading,
    data,
  } = useQuery({
    queryKey: "theme_" + id,
    queryFn: () => {
      return client("games/theme", {
        method: "GET",
        token,
        headers: {
          theme: id
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: true,
    retry: 3
  });
  
  const themeInfo = data && data.data;
  console.log(themeInfo);
  

  return (
    <>
      <ThemeHeader bookId={themeInfo ? themeInfo.book_id : null} />
      <main className="theme-page">
        <Container>
          {(isLoading && !data) && <BookInfoSkeleton />}
          {
            themeInfo
            &&
            (
              <BookInfo
                title={themeInfo.title}
                id={themeInfo.id}
                words_count={themeInfo.words_count}
                themes_count={null}
                language_native={themeInfo.language_native}
                language_translate={themeInfo.language_translate}
              />
            )
          }
          
          <GameBtns
            isLoading={isLoading}
            language_native={themeInfo?.language_native}
            language_translate={themeInfo?.language_translate}
            type={WordRelationType.Theme}
          />

          <Words
            type={WordRelationType.Theme} 
            languages={
              themeInfo
                ? {
                  language_native: themeInfo.language_native,
                  language_translate: themeInfo.language_translate
                }
                : undefined
            }
          />
        </Container>
      </main>
      <Nav />
    </>
  );
};

export default Theme;