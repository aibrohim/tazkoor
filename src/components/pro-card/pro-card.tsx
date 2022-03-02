import { FC } from "react";
import { Link } from "react-router-dom";

import "./pro-card.scss";

interface Props {
  className?: string;
}

const ProCard:FC<Props> = function({className = ""}) {
  return (
    <article className={"pro-card " + className}>
      <Link to="pro" className="pro-card__link">
        <p className="pro-card__heading">
          Be in the black buy the pro version
        </p>
        <p className="pro-card__description">
          Whether a medieval typesetter chose to garble a well-known
        </p>
        <p className="pro-card__price">
          1 months free, then USD 0.99/month.
        </p>
      </Link>
    </article>
  );
};

export default ProCard;