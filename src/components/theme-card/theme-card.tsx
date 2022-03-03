import { Theme } from "consts";
import { FC } from "react";
import { Link } from "react-router-dom";

import "./theme-card.scss";

interface Props extends Theme {

}

const ThemeCard:FC<Props> = function({id, title}) {
  return (
    <article className="theme-card">
      <Link className="theme-card__link" to={"/theme/" + id}>
        <h3 className="theme-card__title">{title}</h3>
        <p className="theme-card__words"><strong style={{fontWeight: "500"}}>Words: </strong>12</p>
      </Link>
    </article>
  );
}

export default ThemeCard;