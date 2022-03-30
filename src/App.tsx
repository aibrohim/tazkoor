import AuthenticatedApp from "authenticated-app";
import StatusMessage from "components/status-message/status-message";
import { MessageTypes } from "consts";
import { useAuth } from "contexts/auth";
import { createContext, Dispatch, FC, useState } from "react";
import UnAuthenticatedApp from "unauthenticated-app";

interface ContextType {
  type: MessageTypes,
  message: string;
  setMessageType?: Dispatch<React.SetStateAction<MessageTypes>>;
  setMessage?: Dispatch<React.SetStateAction<string>>
}

export const StatusMessageContext = createContext<ContextType>({type: MessageTypes.success, message: ""});

const App:FC = function () {
  const [ messageType, setMessageType ] = useState<MessageTypes>(MessageTypes.success);
  const [ message, setMessage ] = useState<string>("");

  const { user } = useAuth();
  
  return (
    <StatusMessageContext.Provider value={{type: messageType, message, setMessageType, setMessage}}>
      {
        user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
      }
      {message && <StatusMessage />}
    </StatusMessageContext.Provider>
  );
}

export default App;
