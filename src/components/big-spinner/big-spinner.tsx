import { CSSProperties, FC } from "react";

import "./big-spinner.scss";

interface Props {
  margin?: string;
  styles?: CSSProperties
}

const BigSpinner:FC<Props> = function({margin, styles}) {
  return (
    <div style={{margin, ...styles}} className="big-spinner" />
  );
}

export default BigSpinner;