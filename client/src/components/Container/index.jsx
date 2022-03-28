import { useState } from 'react';
import useAuthContext from '../../AuthProvider/hooks/useAuthContext';
import Signup from '../Signup';
import Login from '../Login';
import Success from '../Success';

const Container = () => {
  const { state: { isLoggedIn } } = useAuthContext();
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleIsRegistered = () => {
    setIsRegistered(prev => !prev);
  };

  return (
    <div className="flex justify-center text-gray-700 bg-white border rounded h-112 w-112 drop-shadow-md">
      {isLoggedIn && <Success />}
      {!isLoggedIn && (
        isRegistered
          ? <Login toggleIsRegistered={toggleIsRegistered} />
          : <Signup toggleIsRegistered={toggleIsRegistered}  /> 
      )}
    </div>
  );
};

export default Container;
