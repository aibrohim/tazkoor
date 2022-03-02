import { Weights } from "consts";
import { FC } from "react";

import "./title.scss";

interface Props {
  children: any;
  weight?: Weights;
  className?: string;
}

const Title:FC<Props> = function({children, weight = Weights.semiBold, className = ""}) {
  return (
    <h1 className={"title title--" + weight + " " + className}>{children}</h1>
  )
}

export default Title;