import Container from "components/container/container";

import { ReactComponent as Back } from "assets/icons/chevron-left.svg";

import { Dispatch, FC } from "react";

import "./users-stats.scss";
import Avatar from "components/avatar/avatar";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/auth";
import { client } from "utils/client";
import { BookUser } from "consts";
import BigSpinner from "components/big-spinner/big-spinner";

interface Props {
  setOpen: Dispatch<React.SetStateAction<boolean>>
}

const UsersStats:FC<Props> = function({ setOpen }) {
  const { id } = useParams();

  const { user } = useAuth();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: `${id}_book_users`,
    queryFn: () => {
      return client("books/users", {
        method: "GET",
        token: user?.token,
        headers: {
          book: id
        }
      })
    },
    enabled: true,
    refetchOnWindowFocus: true
  });

  const handleBackPress = () => setOpen(false);
  return (
    <section className="users-stats">
      <header className="users-stats__header">
        <Container className="users-stats__container">
          <button onClick={handleBackPress} className="users-stats__back">
            <Back />
          </button>

          <h1 className="users-stats__title">Book Statictics</h1>
        </Container>
      </header>

      <div className="users-stats__body">
        <Container>
          {isLoading && <BigSpinner />}
          <ul className="users-stats__list">
            {
              data 
              &&
              data.users.map((user: BookUser) => (
                <li key={user.id} className="users-stats__user">
                  <Avatar className="users-stats__user-avatar" chars={user.name.slice(0, 1)} color={user.color} />
                  <span className="users-stats__user-name">{user.name}</span>
                  <p className="users-stats__user-answers">
                    <span className="users-stats__corrects">True 76</span>
                    <span className="users-stats__incorrects">False 45</span>
                  </p>
                </li>
              ))
            }
          </ul>
        </Container>
      </div>
    </section>
  );
}

export default UsersStats;