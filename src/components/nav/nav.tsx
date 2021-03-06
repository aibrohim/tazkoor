import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as Home } from "assets/icons/home.svg";
import { ReactComponent as Add } from "assets/icons/add-book.svg";
import { ReactComponent as Statistics } from "assets/icons/stats.svg";
import { ReactComponent as Settings } from "assets/icons/settings.svg";
import { ReactComponent as Library } from "assets/icons/books.svg";

import "./nav.scss";

interface Props {

}

const Nav:FC<Props> = function() {
  const isSettings = window.location.pathname.toLowerCase().startsWith("/settings");
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" className="nav__link">
            <Home />
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/joined-books" className="nav__link">
            <Library />
            Joined
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/add-book" className="nav__link">
            <Add />
            Add book
          </NavLink>
        </li>
        <li className="nav__item">
          <Link to="/statistics" className="nav__link">
            <Statistics />
            Statistics
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/settings" className={`nav__link ${isSettings ? "active" : ""}`}>
            <Settings />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;