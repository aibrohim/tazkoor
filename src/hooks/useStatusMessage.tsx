import { StatusMessageContext } from "App";
import { useContext } from "react";

const useStatusMessage = function() {
  const values = useContext(StatusMessageContext);

  if (!values) {
    throw Error("useStatusMessage cannot be used outside of StatusMessageContext")
  }

  return values;
}

export default useStatusMessage;