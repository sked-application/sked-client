import api from '../api/api';

const find = ({ company }) => {
    return api.get(`/v1/companies/${company}`);
};

export default {
    find,
};
