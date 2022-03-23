import { FC } from "react";

import "./avatar.scss";

interface Props {
  color: string;
  chars: string;
  isPro?: boolean;
  className?: string;
}

const Avatar:FC<Props> = function({color, chars, isPro, className = ""}) {
  return (
    <div className={"avatar " + (isPro ? " avatar--pro " : "") + className} style={{background: color}}>
      {chars}
    </div>
  );
}

export default Avatar;