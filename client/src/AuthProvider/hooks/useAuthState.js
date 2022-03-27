import { useState } from "react";

const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
  };
};

export default useAuthState;