import Button from "components/button/button";
import Container from "components/container/container";
import { Colors, Weights } from "consts";
import { useGameResults } from "contexts/result";
import { FC } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import { Navigate } from "react-router-dom";
import getStringCapitalized from "utils/stringCapitalizer";

import "./finish-game.scss";

const colors = [
  "#53DD82",
  "#EB4F4A",
  "#72A4C3",
  "#F8D43C",
  "#83D5C9",
  "#11B0EA",
]

const FinishGame:FC = function() {
  const { results, setResults } = useGameResults();

  if (!results) {
    return <Navigate to="/" />
  }

  const handleFinishClick = () => setResults(null);

  const corrects = results.filter(word => word.isTrue);
  const inCorrects = results.filter(word => !word.isTrue);

  return (
    <div className="finish-game">
      <Container className="finish-game__container">

        <header className="finish-game__header">
          <h1 className="finish-game__title">Finish</h1>
        </header>
        <main className="finish-game__result">
          <p className="finish-game__correct">
            {corrects.length}
            <br />
            Correct answers
          </p>
          <p className="finish-game__incorrect">
            {inCorrects.length} Incorrect answers 
            &nbsp;{Boolean(inCorrects.length) && <span className="finish-game__incorrect-word">{getStringCapitalized(inCorrects[0].title)}{inCorrects.length > 1 && ", ..."}</span>}
          </p>
          <span className="finish-game__confetti"><ConfettiExplosion particleCount={120} floorHeight={1000} colors={colors} floorWidth={1200} particleSize={15} force={1} /></span>
          <span className="finish-game__confetti finish-game__confetti--right"><ConfettiExplosion particleCount={120} floorHeight={1000} colors={colors} floorWidth={1200} particleSize={15} force={1} /></span>
          <Button className="finish-game__details" weight={Weights.medium} color={Colors.muted}>Details</Button>

          <div className="finish-game__actions">
            <Button className="finish-game__action" weight={Weights.semiBold} color={Colors.muted}>Play again</Button>
            <Button onClick={handleFinishClick} className="finish-game__action"  weight={Weights.medium} color={Colors.primary}>Finish</Button>
          </div>

        </main>
      </Container>
    </div>
  );
}

export default FinishGame;