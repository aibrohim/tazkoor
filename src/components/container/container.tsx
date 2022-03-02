import { FC } from "react";
import "./container.scss";

interface PropTypes {
  className?: string,
  [x:string]: any;
}

const Container:FC<PropTypes> = function ({className = "", ...props}) {
  return (
    <div className={"container " + className} {...props} />
  );
}

export default Container;