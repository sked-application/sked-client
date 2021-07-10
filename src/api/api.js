import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

const handleResponse = ({ data }) => data;

const handleError = (error) => {
  const response = error.response;

  if (response && response.data && response.data.message === 'Unauthorized') {
    const isProfessionalUser = !!JSON.parse(
      localStorage.getItem('userCompany'),
    );
    const href = isProfessionalUser ? '/sign-in' : '/customer-sign-in';

    localStorage.removeItem('token');
    localStorage.removeItem('userCompany');
    window.location.href = href;

    return Promise.reject({
      response: {
        data: {
          message: 'Sua sessão expirou, realize o login novamente.',
        },
      },
    });
  }

  return Promise.reject(error);
};

api.interceptors.response.use(handleResponse, handleError);

export default api;
