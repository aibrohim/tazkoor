import Container from "components/container/container";
import { FC } from "react";

import "../../card-body/card-body.scss";

const CardSkeleton:FC = function() {
  return (
    <div className="card-body">
      <Container className="card-body__container">

        <div className="card-body__word skeleton" style={{position: "static"}} />
      </Container>
    </div>
  );
}

export default CardSkeleton;