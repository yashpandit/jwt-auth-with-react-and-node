import axios from 'axios';

const useRequest = () => {
  const request = async (url, options) => {
    const { method, body } = options;
    const apiUrl = `http://localhost:4000/${url}`;
    const response = await axios({
      url: apiUrl,
      method: method || 'GET',
      ...(body ? { data: body } : {}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    return response;
  };

  return request;
};

export default useRequest;
