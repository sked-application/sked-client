import api from '../api/api';

const find = ({ account }) => {
    return api.get(`/accounts/${account}`);
};

export default {
    find,
};
