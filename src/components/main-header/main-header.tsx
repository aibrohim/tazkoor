import { FC } from "react";

import Logo from "assets/images/logo.svg";
import Container from "components/container/container";
import Avatar from "components/avatar/avatar";

import "./main-header.scss";
import { useAuth } from "contexts/auth";

const MainHeader:FC = function() {
  const { user } = useAuth();

  return (
    <header className="header">
      <Container className="main-header__container">
        <img className="" src={Logo} alt="tazkoor logo" width="70px" height="28" />

        {
          user 
          &&
          (<div className="header__avatar">
            <Avatar className="header__avatar-icon" chars={user.name.slice(0, 1)} color={user.avatar} />
          </div>)
        }
      </Container>
    </header>
  )
};

export default MainHeader;