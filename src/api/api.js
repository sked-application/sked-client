import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

api.interceptors.response.use(null, (error) => {
	const response = error.response;

	// TODO: Validate token expired

    if (response && (response.data & response.message === 'Token expirado')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userAccountUrl');
        window.location.href = '/sign-in';
    }

    return Promise.reject(error);
});

export default api;
