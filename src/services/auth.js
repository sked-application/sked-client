import api from '../api/api';

const signIn = ({ email, password }) => {
    return api.post('/sign/in', {
        email,
        password,
    });
};

const signUp = ({ name, account, email, password }) => {
    return api.post('/sign/up', {
        name,
        account,
        email,
        password,
    });
};

const recorverPassword = ({ email }) => {
    return api.post('/sign/recover', {
        email,
    });
};

export default {
    signIn,
    signUp,
    recorverPassword,
};
