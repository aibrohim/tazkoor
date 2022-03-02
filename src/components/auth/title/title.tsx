import { FC } from "react";
import { ReactNode } from "react";
import "./title.scss";

interface Props {
  className?: string;
  children: ReactNode;
  [x:string]: any;
}

const AuthTitle:FC<Props> = function({className = "", children, ...props}) {
  return (
    <h1 className={"auth-title " + className} {...props}>{children}</h1> 
  );
}

export default AuthTitle;