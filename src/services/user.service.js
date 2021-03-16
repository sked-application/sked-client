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

const findAllByCompanyId = ({ companyId }) => {
    return api.get(`v1/users/${companyId}/grouped`);
};

export default {
	profile,
	updateProfile,
	findAllByCompanyId,
};
