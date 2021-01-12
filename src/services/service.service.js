import api from '../api/api';

const create = (data) => {
    return api.post('/services', data);
};

const update = (id, changes) => {
    return api.put(`/services/${id}`, changes);
};

const findAll = () => {
    return api.get('/services');
};

const findAllByAccountId = (params) => {
    return api.get('/services/by-id', {
        params,
    });
};

const remove = (id) => {
    return api.delete(`/services/${id}`);
};

export default {
	create,
	update,
    remove,
    findAll,
    findAllByAccountId,
};
