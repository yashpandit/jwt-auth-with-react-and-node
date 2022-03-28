import { createContext } from "react";
import useAuthState from "./hooks/useAuthState";

export const initialAuthState = {
  state: {
    isLoggedIn: false,
    username: '',
    accessToken: '',
    refreshToken: '',
  },
  setState: () => {},
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
