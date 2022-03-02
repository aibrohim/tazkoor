import { Colors, Weights } from "consts";
import { ReactNode, FC } from "react";
import { Link } from "react-router-dom";

import "./button.scss";

interface Props {
  children: ReactNode;
  className?: string;
  link?: boolean;
  icon?: ReactNode;
  to?: string;
  color?: Colors;
  weight?: Weights;
  [x:string]: any,
}

const Button:FC<Props> = function({children, className = "", link, icon, to, color = Colors.primary, weight = Weights.semiBold, ...props}) {
  const colorClass = "button--" + color + " ";
  const weightClass = "button--" + weight + " ";

  if (link && to) {
    return (
      <Link to={to} className={"button " + weightClass + colorClass + className} {...props}>
        <span className="button__inner">
          {icon}
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button className={"button " + weightClass + colorClass + className} {...props}>
      <span className="button__inner">
        {icon}
        {children}
      </span>
    </button>
  );
}

export default Button;