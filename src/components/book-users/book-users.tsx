import { FC } from "react";

import { ReactComponent as Back } from "assets/icons/chevron-left.svg";

import "./book-users.scss";
import Container from "components/container/container";
import { useQuery } from "react-query";
import { client } from "utils/client";
import { useAuth } from "contexts/auth";
import { useParams } from "react-router-dom";
import Avatar from "components/avatar/avatar";
import { BookUser, SwitchOption } from "consts";
import Switch from "components/switch/switch";

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

const BookUsers:FC = function() {
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
  
  const handleRoleTabsChange = () => {};

  return null;

  return (
    <section className="book-users">
      <header className="book-users__header">
        <Container className="book-users__container">
          <button className="book-users__back">
            <Back />
          </button>

          <h1 className="book-users__title">Book users</h1>
        </Container>
      </header>

      <div className="book-users__content container">
        <Switch options={userRolesTab} className="book-users__switch" onChange={handleRoleTabsChange} />
        <ul className="book-users__users-list">
          {
            data 
            &&
            data.users.map((user: BookUser) => (
              <li key={user.id} className="book-users__user">
                <Avatar className="book-users__user-avatar" chars={user.name.slice(0, 1)} color={user.color} />
                <span className="book-users__user-name">{user.name}</span>

                <span className="book-users__user-role">{user.role}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export default BookUsers;