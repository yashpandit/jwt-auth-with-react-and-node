import useAuthContext from '../../AuthProvider/hooks/useAuthContext';
import Login from '../Login';
import Signup from '../Signup';
import Success from '../Success';

const Container = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="flex justify-center text-gray-700 bg-white border rounded h-112 w-112 drop-shadow-md">
      {isLoggedIn ? <Success /> : <Signup />}
    </div>
  );
};

export default Container;
