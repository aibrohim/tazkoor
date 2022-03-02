import { FC } from "react";
import { Link } from "react-router-dom";

import "./theme-card.scss";

const ThemeCard:FC = function() {
  return (
    <article className="theme-card">
      <Link className="theme-card__link" to="/theme/12">
        <h3 className="theme-card__title">Unit 1</h3>
        <p className="theme-card__words"><strong style={{fontWeight: "500"}}>Words: </strong>12</p>
      </Link>
    </article>
  );
}

export default ThemeCard;