import api from '../api/api';

const signIn = ({ email, password }) => {
    return api.post('/customer/sign/in', {
        email,
        password,
    });
};

const signUp = ({ email, name, telephone, password }) => {
    return api.post('/customer/sign/up', {
        email,
        name,
        telephone,
        password,
    });
};

export default {
    signIn,
    signUp,
};
