import api from '../api/api';

const signIn = ({ email, password }) => {
    return api.post('/sign/in', {
        email,
        password,
    });
};

const signUp = ({ account, user }) => {
    return api.post('/sign/up', {
        account,
        user,
    });
};

const recorverPassword = ({ email, is_customer }) => {
    return api.post('/sign/recover', {
		email,
		is_customer,
    });
};

const resetPassword = ({ password, token }) => {
    return api.post('/sign/reset', {
		password,
		token,
    });
};

export default {
    signIn,
    signUp,
	recorverPassword,
	resetPassword,
};
