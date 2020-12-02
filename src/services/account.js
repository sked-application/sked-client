import api from '../api/api';

const find = (params) => {
    return api.get('/accounts', {
        params,
    });
};

export default {
    find,
};
