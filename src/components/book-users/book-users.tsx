import { Dispatch, FC, useEffect } from "react";

import { ReactComponent as Back } from "assets/icons/chevron-left.svg";

import "./book-users.scss";
import Container from "components/container/container";
import { useQuery } from "react-query";
import { client } from "utils/client";
import { useAuth } from "contexts/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Avatar from "components/avatar/avatar";
import { BookRoles, BookUser, SwitchOption } from "consts";
import Switch from "components/switch/switch";
import BigSpinner from "components/big-spinner/big-spinner";

const userRolesTab: SwitchOption[] = [
  {
    id: "all",
    text: "All"
  },
  {
    id: "viewer",
    text: "Viewer"
  },
  {
    id: "admin",
    text: "Admin"
  },
  {
    id: "owner",
    text: "Owner"
  }
]

interface Props {
  setUsers: Dispatch<React.SetStateAction<BookUser[]>>;
  setActiveUser: Dispatch<React.SetStateAction<BookUser | null>>
}

const BookUsers:FC<Props> = function({setUsers, setActiveUser}) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data, setUsers]);
  
  const handleRoleTabsChange = () => {};
  const handleBackPress = () => {
    navigate(location.pathname)
  };

  const handleListClick = (evt: any) => {
    if (evt.target.matches("button") && data) {
      const pressedUser = data.users.find((user: BookUser) => user.id === +evt.target.dataset.id);

      setActiveUser(pressedUser);
    }
  }

  return (
    <section className="book-users">
      <header className="book-users__header">
        <Container className="book-users__container">
          <button onClick={handleBackPress} className="book-users__back">
            <Back />
          </button>

          <h1 className="book-users__title">Book users</h1>
        </Container>
      </header>

      <div className="book-users__content container">
        <Switch options={userRolesTab} className="book-users__switch" onChange={handleRoleTabsChange} />
        {
          isLoading && !data && <BigSpinner />
        }
        <ul onClick={handleListClick} className="book-users__users-list">
          {
            data 
            &&
            data.users.map((user: BookUser) => (
              <li key={user.id} className="book-users__user">
                <Avatar className="book-users__user-avatar" chars={user.name.slice(0, 1)} color={user.color} />
                <span className="book-users__user-name">{user.name}</span>

                <span className="book-users__user-role">{BookRoles[user.role - 1]}</span>
                <button data-id={user.id} className="book-users__user-btn" />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export default BookUsers;