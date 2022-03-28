import axios from 'axios';
import useAuthContext from '../AuthProvider/hooks/useAuthContext';

const useRequest = () => {
  const { state: { accessToken } } = useAuthContext();

  const request = async (url, options) => {
    const { method, body, authRequired } = options ?? {};
    const apiUrl = `http://localhost:4000/${url}`;
    const response = await axios({
      url: apiUrl,
      method: method || 'GET',
      ...(body ? { data: body } : {}),
      headers: {
        'Content-Type': 'application/json',
        ...(authRequired ? { 'Authorization': `Bearer ${accessToken}` } : {}),
      },
    });

    return response;
  };

  return request;
};

export default useRequest;
