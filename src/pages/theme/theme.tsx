import BookInfo from "components/book-info/book-info";
import Container from "components/container/container";
import EditTheme from "components/edit-theme/edit-theme";
import GameBtns from "components/game-btns/game-btns";
import BookInfoSkeleton from "components/loaders/book-info-skeleton/book-info-skeleton";
import Nav from "components/nav/nav";
import ThemeHeader from "components/theme-header/theme-header";
import Words from "components/words/words";
import { WordRelationType } from "consts";
import { useAuth } from "contexts/auth";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { client } from "utils/client";

const Theme:FC = function() {
  const { id } = useParams();

  const { token } = useAuth();

  const [ isEditOpen, setEditOpen ] = useState<boolean>(false);

  console.log("theme_" + id);
  
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
  
  return (
    <>
      <ThemeHeader bookId={themeInfo ? themeInfo.book_id : null} onEditClick={() => setEditOpen(true)} />
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
            bookId={themeInfo?.book_id}
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

          {themeInfo && <EditTheme isOpen={isEditOpen} setOpen={setEditOpen} title={themeInfo.title} />}
        </Container>
      </main>
      <Nav />
    </>
  );
};

export default Theme;