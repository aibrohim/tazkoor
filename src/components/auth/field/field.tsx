import Field from "components/field/field";
import { FC } from "react";

import "./field.scss"; 

interface Props {
  label?: string;
  className?: string;
  inputClass?: string;
  [x:string]: any
}

const AuthField:FC<Props> = function({label, className = "", inputClass = "", ...props}) {
  return (
    <Field label={label} containerClass={"auth-field " + className} className={inputClass} {...props} />
  );
}

export default AuthField;