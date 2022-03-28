import { initialAuthState } from "../../AuthProvider";
import useAuthContext from "../../AuthProvider/hooks/useAuthContext";
import useRequest from "../../hooks/useRequest";
import Button from "../Button";

const Success = () => {
  const {
    state: { username, refreshToken },
    setState
  } = useAuthContext();
  const request = useRequest();

  const handleLogout = async () => {
    try {
      await request('logout', {
        method: 'DELETE',
        body: {
          token: refreshToken,
        },
      });

      setState(initialAuthState.state);
    } catch(err) {
      alert(err);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <h1>hey {username}, you are now logged in!</h1>
      <Button theme="primary" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Success;
