import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

const handleResponse = ({ data }) =>  data;

const handleError = (error) => {
	const response = error.response;

    if (response.data && response.data.message === 'Token expirado') {
        localStorage.removeItem('token');
        localStorage.removeItem('userAccountUrl');
        window.location.href = '/sign-in';
    }

    return Promise.reject(error);
};

api.interceptors.response.use(handleResponse, handleError);

export default api;
