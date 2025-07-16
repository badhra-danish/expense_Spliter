import React, { useContext } from "react";
import { createContext, useState } from "react";
// interface user {
//   displayName: string;
//   email: string;
//   avatarUrl: string;
//   mobile: string;
// }
interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  //   user: user | null;
  //   setUser: (user: user | null) => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [user, setUser] = useState<user | null>(null);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

// export const useLogin = useContext(LoginContext);
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
