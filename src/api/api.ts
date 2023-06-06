import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const response = error.response;

    if (response && response.data && response.data.message === 'Unauthorized') {
      const isProfessionalUser = !!localStorage.getItem('userCompany');
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
  },
);

export default api;
