import api from '../api/api';

const create = (data) => {
    return api.post('v1/schedule-locks', data);
};

const update = (id, changes) => {
    return api.put(`/schedule-locks/${id}`, changes);
};

const findAll = () => {
    return api.get('v1/schedule-locks');
};

const remove = (id) => {
    return api.delete(`/schedule-locks/${id}`);
};

export default {
	create,
	update,
    remove,
    findAll,
};
