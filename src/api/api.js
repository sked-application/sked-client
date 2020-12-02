import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

api.interceptors.response.use(null, (error) => {
	const response = error.response;

    if (response && ((response.status === 401) || response.data.includes('jwt expired'))) {
        localStorage.removeItem('token');
        localStorage.removeItem('userAccountName');
        window.location.href = '/signin';
    }

    return Promise.reject(error);
});

export default api;
