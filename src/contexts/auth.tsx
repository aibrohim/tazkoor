import { getToken, logout } from "auth-provider";
import { FC } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface AppContextInterface {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AppContextInterface | null>(null);

const AuthProvider:FC = function(params: any) {
  const [ token, setToken ] = useState<string | null>(getToken());
  
  useEffect(() => {
    if (!token) {
      logout();
    }
  }, [token]);

  return <AuthContext.Provider value={{token, setToken}} {...params} />;
}

export const useAuth = () => {
  const values = useContext<AppContextInterface | null>(AuthContext);

  if (!values) {
    throw Error("useAuth must be called inside AuthProvider");
  }

  return values;
};

export default AuthProvider;