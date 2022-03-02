import { FC, FormEvent, useState } from "react";

import "./switch.scss";

interface Label {
  name: string;
  text: string;
}

interface Props {
  labels?: Label[],
  onChange: Function;
  defaultValue?: string | number;
  className?: string;
}

interface BarStyles {
  left: string;
  height: string;
  width: string;
}

const Switch:FC<Props> = function({labels, className = "", onChange}) {
  const [ styles, setStyles ] = useState<BarStyles>({left: "4px", width: "72px", height: "33px"});

  const handleFormChange = function(evt:FormEvent<HTMLFormElement>) {
    const checkedItem = evt.currentTarget.querySelector("input:checked");

    onChange(Number(checkedItem?.id));

    const checkedLabel = checkedItem?.parentElement;
    const height = checkedLabel?.clientHeight + "px";
    const left = checkedLabel?.offsetLeft + "px";
    const width = checkedLabel?.offsetWidth + "px";
    
    setStyles({
      height,
      left,
      width
    })
  }

  return (
    <form onChange={handleFormChange} className={"switch " + className} action="#">
      <label className="switch__label">
        <input className="visually-hidden switch__radio" defaultChecked id="0" name="item" type="radio" />
        <span className="switch__label-txt">Themes</span>
      </label>
      <label className="switch__label">
        <input className="visually-hidden switch__radio" id="1" name="item" type="radio" />
        <span className="switch__label-txt">Words</span>
      </label>
      <span style={styles} className="switch__bar"></span>
    </form>
  );
}

export default Switch;