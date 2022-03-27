import { createContext } from "react";
import useAuthState from "./hooks/useAuthState";

const initialAuthState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  username: '',
  setUsername: () => {},
};

export const AuthContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
  const value = useAuthState();

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
