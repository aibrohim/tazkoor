import { FC } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Back } from "assets/icons/chevron-left.svg";

import "./settings-header.scss";
import Container from "components/container/container";

interface Props {
  title: string;
}

const SettingsHeader:FC<Props> = function({ title }) {
  return (
    <header className="settings-header">
      <Container className="settings-header__container">
        <Link className="settings-header__back" to="/settings">
          <Back />
        </Link>
        <h1 className="settings-header__title">{title}</h1>
      </Container>
    </header>
  );
}

export default SettingsHeader;