import Button from "components/button/button";
import { Colors, Weights } from "consts";
import { FC } from "react";

import "./game-btns.scss";

const GameBtns:FC = function() {
  return (
    <div className="game-btns">
      <Button className="game-btns__item" weight={Weights.medium} color={Colors.pink}>
        Test
      </Button>
      <Button className="game-btns__item" weight={Weights.medium} color={Colors.pink}>
        Card
      </Button>
    </div>
  ); 
}

export default GameBtns;