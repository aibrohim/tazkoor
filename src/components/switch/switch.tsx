import { SwitchOption } from "consts";
import { FC, FormEvent, useEffect, useRef, useState } from "react";

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
  options: SwitchOption[]
}

interface BarStyles {
  left: string;
  height: string;
  width: string;
}

const Switch:FC<Props> = function({options, className = "", onChange}) {
  const [ styles, setStyles ] = useState<BarStyles>({left: "4px", width: "72px", height: "33px"});

  const tabsRef = useRef<any>();

  useEffect(() => {
    const checkedItem = tabsRef.current?.querySelector("input:checked");

    const checkedLabel = checkedItem?.parentElement;
    const height = checkedLabel?.clientHeight + "px";
    const left = checkedLabel?.offsetLeft + "px";
    const width = checkedLabel?.offsetWidth + "px";
    
    setStyles({
      height,
      left,
      width
    })
  }, []);

  const handleFormChange = function(evt:FormEvent<HTMLFormElement>) {
    const checkedItem = evt.currentTarget.querySelector("input:checked");

    onChange(checkedItem?.id);

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
    <form ref={tabsRef} onChange={handleFormChange} className={"switch " + className} action="#">
      {
        options.map((option: SwitchOption, index: number) => (
          <label key={option.id} className="switch__label">
            <input className="visually-hidden switch__radio" defaultChecked={index === 0} id={`${option.id}`} name="item" type="radio" />
            <span className="switch__label-txt">{option.text}</span>
          </label>
        ))
      }
      <span style={styles} className="switch__bar"></span>
    </form>
  );
}

export default Switch;