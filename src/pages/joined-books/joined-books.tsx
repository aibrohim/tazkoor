import BigSpinner from "components/big-spinner/big-spinner";
import BooksSection from "components/books-section/books-section";
import Container from "components/container/container";
import FixedAddBtn from "components/fixed-add-btn/fixed-add-btn";
import JoinBookModal from "components/join-book-modal/join-book-modal";
import MainHeader from "components/main-header/main-header";
import Nav from "components/nav/nav";
import { useAuth } from "contexts/auth";
import { useState } from "react";
import { useQuery } from "react-query";
import { client } from "utils/client";

import "./joined-books.scss";

const JoinedBooks = function() {
  const { user } = useAuth();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: "joined-books",
    queryFn: () => {
      return client("books/joined", {
        method: "GET",
        token: user?.token,
      })
    },
    enabled: true,
    refetchOnWindowFocus: true
  });

  const [ isJoinModalOpen, setJoinModalOpen ] = useState<boolean>(false);

  const handleAddBtnClick = () => setJoinModalOpen(true);

  return (
    <>
      <MainHeader />
      <main className="joined-books">
        <Container>
          {isLoading && <BigSpinner />}

          {data && <BooksSection title="Joined books" className="joined-books__section" bookClassName="joined-books__item" books={data.books} />}
          <FixedAddBtn onClick={handleAddBtnClick} addText="Kitobga qo'shilish" />
        </Container>
      </main>
      <Nav />

      <JoinBookModal open={isJoinModalOpen} setOpen={setJoinModalOpen} />
    </>
  );
}

export default JoinedBooks;