import React, { createContext, Dispatch, useState } from "react";

type AuthContextType = {
  isAuth: boolean
  setIsAuth: Dispatch<React.SetStateAction<boolean>>
}

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType>(
  {} as {
    isAuth: boolean
    setIsAuth: Dispatch<React.SetStateAction<boolean>>
  }
);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}