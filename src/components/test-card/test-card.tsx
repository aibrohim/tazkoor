import Button from "components/button/button";
import Container from "components/container/container";
import { FC } from "react";

import "./test-card.scss"; 

const TestCard:FC = function() {
  return (
    <main className="test-card">
      <Container className="test-card__container">
        <p className="test-card__word">
          Mother

          <span className="test-card__word-order">1/8</span>
          <span className="test-card__time-remaining">0:15</span>
        </p>
        <form action="#" className="test-card__options">
          <label className="test-card__option-label">
            Ona
            <input className="visually-hidden" name="option" type="radio" />
          </label>
          <label className="test-card__option-label test-card__option-label--false">
            Ota
            <input className="visually-hidden" name="option" type="radio" />
          </label>
          <label className="test-card__option-label">
            Bola
            <input className="visually-hidden" name="option" type="radio" />
          </label>
          <label className="test-card__option-label test-card__option-label--true">
            Qiz
            <input className="visually-hidden" name="option" type="radio" />
          </label>
        </form>

        <Button className="test-card__next-btn" type="button">Keyingi savol</Button>
      </Container>
    </main>
  );
}

export default TestCard;