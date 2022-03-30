import { FC } from "react";

const JoinedBookCard:FC = function() {
  return ( 
    <article className="joined-book-card">
      <h3 className="joined-book-card__title">Advanced Grammar in Use</h3>
      <p className="joined-book-card__languages">Russian and English</p>
      <div className="joined-book-card__footer">
        <p className="joined-book-card__owner">Usmon Hamidulloh</p>
        <p className="joined-book-card__players">15 players</p>
      </div>
    </article>
  );
}

export default JoinedBookCard;