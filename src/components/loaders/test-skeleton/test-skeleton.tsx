import Container from "components/container/container";
import { FC } from "react";

import "../../test-card/test-card.scss";

const TestSkeleton:FC = function() {
  return (
    <div className="test-card">
      <Container className="test-card__container">
        <div className="test-card__word skeleton" />
        <div className="test-card__options-set test-card__options">
          <div className="test-card__option-label skeleton" />
          <div className="test-card__option-label skeleton" />
          <div className="test-card__option-label skeleton" />
          <div className="test-card__option-label skeleton" />
        </div>
        <div className="test-card__next-btn skeleton" />
      </Container>
    </div>
  )
}

export default TestSkeleton;