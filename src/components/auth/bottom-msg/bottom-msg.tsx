import { FC } from "react";
import "./bottom-msg.scss";

interface Props {
  className?: string;
  [x:string]: any
}

const AuthBottomMsg:FC<Props> = function({className = "", ...props}) {
  return (
    <p className={"auth-bottom-msg " + className} {...props} />
  );
}

export default AuthBottomMsg;