import Button from "components/button/button";
import { FC, ReactNode } from "react";

import "./submit.scss";

interface Props {
  className?: string;
  children: ReactNode;
  [x:string]: any;
}

const AuthSubmit:FC<Props> = function({className = "", children, ...props}) {
  return (
    <Button className={"auth-submit " + className} type="submit" {...props}>{children}</Button>
  );
}

export default AuthSubmit;