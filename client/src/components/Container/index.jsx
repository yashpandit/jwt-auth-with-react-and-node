import useAuthContext from '../../AuthProvider/hooks/useAuthContext';
import Login from '../Login';
import Success from '../Success';

const Container = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="flex justify-center text-gray-700 bg-white border rounded h-128 w-128 drop-shadow-md">
      {isLoggedIn ? <Success /> : <Login />}
    </div>
  );
};

export default Container;
