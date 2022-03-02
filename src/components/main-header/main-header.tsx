import { FC } from "react";

import Logo from "assets/images/logo.svg";
import Container from "components/container/container";
import Avatar from "components/avatar/avatar";

import "./main-header.scss";

const MainHeader:FC = function() {
  return (
    <header className="header">
      <Container className="main-header__container">
        <img className="" src={Logo} alt="tazkoor logo" width="70px" height="28" />

        <div className="header__avatar">
          <Avatar className="header__avatar-icon" chars="AK" color="#FE6645" />
        </div>
      </Container>
    </header>
  )
};

export default MainHeader;