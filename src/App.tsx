import AuthenticatedApp from "authenticated-app";
import { useAuth } from "contexts/auth";
import { FC } from "react";
import UnAuthenticatedApp from "unauthenticated-app";

const App:FC = function () {
  const { token } = useAuth();
  
  return token ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;
