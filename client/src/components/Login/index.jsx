import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

const initialState = {
  username: '',
  password: '',
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    setLoading(true);
  };

  return (
    <div className="h-full w-full flex items-center flex-col">
      <h1 className="my-6 text-xl text-gray-700">Log In</h1>
      <div className="flex items-center justify-center border-dashed border-t-2 border-gray-400 w-full h-full">
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
            <Button theme="primary" type="submit" disabled={loading}>submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
