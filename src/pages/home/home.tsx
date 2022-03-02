import AllBooks from "components/all-books/all-books";
import BigSpinner from "components/big-spinner/big-spinner";
import BooksWelcome from "components/books-welcome/books-welcome";
import Container from "components/container/container";
import MainHeader from "components/main-header/main-header";
import Nav from "components/nav/nav";
import ProCard from "components/pro-card/pro-card";
import RecentBooks from "components/recent-books/recent-books";
import { useAuth } from "contexts/auth";
import { FC } from "react";
import { useQuery } from "react-query";
import { client } from "utils/client";

const Home:FC = function() {
  const { token } = useAuth();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: "books",
    queryFn: () => {
      return client("books", {
        method: "GET",
        token,
      })
    },
    enabled: true,
    refetchOnWindowFocus: true
  });

  return (
    <>
      <MainHeader />
      <main>
        <Container>
          {isLoading && <BigSpinner />}
          {
            data?.books.length ? 
            (
              <>
                <RecentBooks />
                <AllBooks books={data.books} />

                <ProCard />
              </>
            )
            : data?.books ? (
              <BooksWelcome />
            )
            : null
          }
        </Container>
      </main>
      <Nav />
    </>
  );
}

export default Home;