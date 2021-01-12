import api from '../api/api';

const profile = () => {
	return api.get('/users/profile');
};

const updateProfile = ({ user, account}) => {
    return api.put(`/users/profile`, {
		user,
		account,
	});
};

const findAllByAccountId = (params) => {
    return api.get('/users', {
		params
	});
};

export default {
	profile,
	updateProfile,
	findAllByAccountId,
};
