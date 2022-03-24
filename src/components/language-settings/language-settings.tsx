import Button from "components/button/button";
import Container from "components/container/container";
import Nav from "components/nav/nav";
import SettingsHeader from "components/settings-header/settings-header";
import { FC, FormEvent } from "react";

import { ReactComponent as USA } from "assets/icons/america-flag.svg";
import { ReactComponent as Russia } from "assets/icons/russian-flag.svg";
import { ReactComponent as Uzbekistan } from "assets/icons/uzbekistan-flag.svg";

import "./language-settings.scss";

const LanguageSettings:FC = function() {

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  return (
    <>
      <SettingsHeader title="Profile" />
      <main className="settings-page">
        <Container className="settings-page__container">
          <p className="settings-page__title">Language</p>
          <p className="settings-page__description">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>

          <form onSubmit={handleFormSubmit} className="settings-page__form language-form">
            <div className="settings-page__fields language-form__fields">
              <label className="language-form__label">
                <input defaultChecked className="language-form__radio visually-hidden" type="radio" name="language" />
                <span className="language-form__language-content">
                  <USA />
                  English
                </span>
              </label>
              <label className="language-form__label">
                <input defaultChecked className="language-form__radio visually-hidden" type="radio" name="language" />
                <span className="language-form__language-content">
                  <Russia />
                  Russkiy
                </span>
              </label>
              <label className="language-form__label">
                <input defaultChecked className="language-form__radio visually-hidden" type="radio" name="language" />
                <span className="language-form__language-content">
                  <Uzbekistan />
                  O'zbekcha
                </span>
              </label>
            </div>

            <Button className="settings-page__btn settings-page__submit" tpye="submit">Save Changes</Button>
          </form>
        </Container>
      </main>
      <Nav />
    </>
  );
}

export default LanguageSettings;