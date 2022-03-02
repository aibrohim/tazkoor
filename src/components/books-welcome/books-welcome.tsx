import Title from "components/title/title";
import { Colors, Weights } from "consts";
import { FC } from "react";

import Button from "../button/button";

import "./books-welcome.scss";

const BooksWelcome:FC = function() {
  return (
    <div className="books-welcome">
      <Title className="books-welcome__title">Welcome</Title>
      <p className="books-welcome__description">
        Whether a medieval typesetter chose to garble a well-known
      </p>
      <Button color={Colors.muted} weight={Weights.medium} link to="/add-book">Add book</Button>
    </div>
  );
}

export default BooksWelcome;