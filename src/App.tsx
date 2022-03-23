import AuthenticatedApp from "authenticated-app";
import { useAuth } from "contexts/auth";
import { FC } from "react";
import UnAuthenticatedApp from "unauthenticated-app";

const App:FC = function () {
  const { user } = useAuth();
  
  return (
    <>
      {
        user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
      }
    </>
  );
}

export default App;
