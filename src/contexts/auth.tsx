import { getUser, logout } from "auth-provider";
import { UserData } from "consts";
import { Dispatch, FC } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface AppContextInterface {
  user: UserData | null;
  setUser: Dispatch<React.SetStateAction<UserData | null>>
}

const AuthContext = createContext<AppContextInterface | null>(null);

const AuthProvider:FC = function(params: any) {
  const [ user, setUser ] = useState<UserData | null>(getUser());
  
  useEffect(() => {
    if (!user) {
      logout();
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser}} {...params} />;
}

export const useAuth = () => {
  const values = useContext<AppContextInterface | null>(AuthContext);

  if (!values) {
    throw Error("useAuth must be called inside AuthProvider");
  }

  return values;
};

export default AuthProvider;