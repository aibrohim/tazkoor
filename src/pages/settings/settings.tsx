import Avatar from "components/avatar/avatar";
import Nav from "components/nav/nav";
import { useAuth } from "contexts/auth";
import { FC } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Profile } from "assets/icons/profile.svg";
import { ReactComponent as Password } from "assets/icons/password.svg";
import { ReactComponent as Globe } from "assets/icons/globe.svg";
import { ReactComponent as Chevron } from "assets/icons/chevron-left.svg";

import "./settings.scss";

//51

const Settings:FC = function() {
  const { user } = useAuth();
  return (
    <>
      <main className="settings">
        {user && <Avatar className="settings__avatar" color={user.avatar} chars={user.name.slice(0, 1)} />}
        <p className="settings__name">{user?.name}</p> 

        <nav className="settings__menu">
          <Link className="settings__menu-link" to="/profile">
            <Profile className="settings__menu-icon" />
            Profile
            <Chevron className="settings__menu-chevron" />
          </Link>
          <Link className="settings__menu-link" to="/profile">
            <Password className="settings__menu-icon" />
            Password
            <Chevron className="settings__menu-chevron" />
          </Link>
          <Link className="settings__menu-link" to="/profile">
            <Globe className="settings__menu-icon" />
            Language
            <Chevron className="settings__menu-chevron" />
          </Link>
        </nav>
      </main>
      <Nav />
    </>
  );
}

export default Settings;