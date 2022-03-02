import { FC } from "react";
import "./form.scss";

interface Props {
  className?: string;
  [x:string]: any;
}

const AuthForm:FC<Props> = function({className = "", ...props}) {
  return (
    <form 
      className={"auth-form " + className} 
      method="POST" 
      action="#" 
      {...props} 
    />
  );
}

export default AuthForm;