import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import useRequest from '../../hooks/useRequest';
import useAuthContext from '../../AuthProvider/hooks/useAuthContext';

const initialState = {
  username: '',
  password: '',
};

const Login = (props) => {
  const { toggleIsRegistered } = props;
  const [state, setState] = useState(initialState);
  const request = useRequest();
  const { setState: setAuthState } = useAuthContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const handleReset = () => {
    setState(initialState);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const response = await request('login', {
        method: 'POST',
        body: {
          name: state.username,
          password: state.password,
        },
      });

      if (response && response.status === 200) {
        const { refreshToken } = response.data;

        const { data: { accessToken } } = await request('refresh-token', {
          method: 'POST',
          body: {
            token: refreshToken,
          },
        });

        setAuthState({
          accessToken,
          refreshToken,
          username: state.username,
          isLoggedIn: true,
        });
  
        return;
      }
    } catch(err) {
      alert(err);
    }
  };

  return (
    <div className="h-full w-full flex items-center flex-col">
      <h1 className="my-6 text-xl text-gray-700">Log In</h1>
      <div className="flex flex-col items-center justify-center border-dashed border-t-2 border-gray-400 w-full h-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <Input
            label="username"
            type="text"
            id="username"
            name="username"
            value={state.username}
            onChange={handleChange}
            required
          />
          <Input
            label="password"
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <div className="flex items-center gap-3">
            <Button type="button" onClick={handleReset}>reset</Button>
            <Button theme="primary" type="submit">submit</Button>
          </div>
        </form>
        <div className="mt-6 text-sm">
          Haven't registered yet? Click <button className="text-blue-500" onClick={toggleIsRegistered}>here</button> to sign up!
        </div>
      </div>
    </div>
  );
};

export default Login;
