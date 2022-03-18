import CardGameHeader from "components/card-game-header/card-game-header";
import TestCard from "components/test-card/test-card";
import { GameTypes } from "consts";
import { FC } from "react";
import { useParams } from "react-router-dom";

const TestGame:FC = function() {
  const { wordRelation, id } = useParams();

  return (
    <>
      <CardGameHeader backUrl={`/${wordRelation}/${id}`} type={GameTypes.Test} />
      <TestCard />
    </>
  );
}

export default TestGame;