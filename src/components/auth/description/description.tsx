import { FC } from "react";
import "./description.scss";

interface Props {
  className?: string;
  [x: string]: any
}

const AuthDescription:FC<Props> = function({className = "", ...props}) {
  return (
    <p className={"auth-description " + className} {...props} />
  );
}

export default AuthDescription;