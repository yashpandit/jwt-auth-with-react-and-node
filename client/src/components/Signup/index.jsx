import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import Button from "../Button";
import Input from "../Input";

const initialState ={
  username: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const request = useRequest();

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

    setLoading(true);

    await request('users', {
      method: 'POST',
      body: {
        name: state.username,
        password: state.password,
      },
    });

    setLoading(false);
  };

  return (
    <div className="h-full w-full flex items-center flex-col">
      <h1 className="my-6 text-xl text-gray-700">Sign Up</h1>
      <div className="flex items-center justify-center border-dashed border-t-2 border-gray-400 w-full h-full">
        <form className="flex flex-col items-center gap-4">
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
          <Input
            label="confirm password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="flex items-center gap-3">
            <Button type="button" onClick={handleReset}>reset</Button>
            <Button
              theme="primary"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
