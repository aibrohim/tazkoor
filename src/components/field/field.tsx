import { FormEvent, ReactElement, useState } from "react";

import { ReactComponent as Eye } from "assets/icons/eye.svg";
import { ReactComponent as ClosedEye } from "assets/icons/hidden-eye.svg";

import "./field.scss";
import { FC } from "react";

enum EyeTypes {
  isShown,
  isHidden
}

interface EyeIconTypes {
  [EyeTypes.isShown]: ReactElement;
  [EyeTypes.isHidden]: ReactElement;
}

const EyeIcon:EyeIconTypes = {
  [EyeTypes.isShown]: <Eye pointerEvents="none" width="20" height="20" />,
  [EyeTypes.isHidden]: <ClosedEye pointerEvents="none" width="20" height="20" />,
};

interface Props {
  containerClass?: string;
  className?: string;
  label?: string;
  type?: string;
  onChange?: (evt: FormEvent) => void
}

const Field:FC<Props> = function ({
  containerClass = "", 
  className = "", 
  label, 
  type = "text", 
  onChange, 
  ...props
}) {
  const [ passwordVisible, setPasswordVisible ] = useState<EyeTypes>(EyeTypes.isHidden);
  const [ inputValueLength, setInputValuLength ] = useState<number>(0);

  const handleEyeClick = () => {
    setPasswordVisible(passwordVisible === EyeTypes.isHidden ? EyeTypes.isShown : EyeTypes.isHidden);
  };
  
  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setInputValuLength(evt.currentTarget.value.length);
    if (onChange) onChange(evt); 
  };

  const handleSelectChange = (evt:FormEvent<HTMLSelectElement>) => {
    if (onChange) onChange(evt); 
  }

  const inputType = type === "password" ? passwordVisible === EyeTypes.isShown ? "text" : "password" : type;

  return (
    <div className={"field " + containerClass}>
      <label className="field__label">
        {
          type !== "select"
          ? (
            <input
              className={"field__input " + className}
              type={inputType} 
              onChange={handleInputChange}
              {...props}
            />
          )
          : (
            <select
              className={"field__input field__input--select " + className}
              onChange={handleSelectChange}
              {...props}
            />
          )
        }
        {label ? <span className={"field__label-txt " + (inputValueLength ? "field__label-tx--hidden" : "")}>{label}</span> : null}
        {
          type === "password"
            && (
              <button onClick={handleEyeClick} className="field__password-toggler" type="button">
                {EyeIcon[passwordVisible]}
              </button>
            )
        }
      </label>
    </div>
  );
}

export default Field;