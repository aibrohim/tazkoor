import { FC } from "react";
import "./fields.scss";

interface Props {
  className?: string;
  [x:string]: any;
}

const AuthFields:FC<Props> = function({className = "", ...props}) {
  return (
    <div className={"auth-fields " + className} {...props} />
  );
}

export default AuthFields;