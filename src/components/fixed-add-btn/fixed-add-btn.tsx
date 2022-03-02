import Button from "components/button/button";
import { Colors } from "consts";
import { FC } from "react";

import "./fixed-add-btn.scss";

interface Props {
  addText: string;
  [x:string]: any;
}

const FixedAddBtn:FC<Props> = function({addText, ...props}) {
  return (
    <Button className="fixed-add-btn" color={Colors.primary} {...props}>
      Add {addText}
    </Button>
  );
}

export default FixedAddBtn;