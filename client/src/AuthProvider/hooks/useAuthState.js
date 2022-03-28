import { useEffect, useState } from "react";
import { initialAuthState } from "..";
import useRequest from "../../hooks/useRequest";

const REFRESH_TOKEN_TIMEOUT_MS = 15000;

const useAuthState = () => {
  const [state, setState] = useState(initialAuthState.state);
  const request = useRequest();

  useEffect(() => {
    if (state.isLoggedIn) {
      const interval = setInterval(async () => {
        const { data: { accessToken }} = await request('refresh-token', {
          method: 'POST',
          body: {
            token: state.refreshToken,
          },
        });

        setState(prev => ({
          ...prev,
          accessToken,
        }));
      }, REFRESH_TOKEN_TIMEOUT_MS);

      return () => clearInterval(interval);
    }
  }, [state.isLoggedIn]);

  return {
    state,
    setState,
  };
};

export default useAuthState;