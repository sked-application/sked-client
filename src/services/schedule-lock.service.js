import api from '../api';

const create = (data) => {
  return api.post('v1/schedule-locks', data);
};

const update = (id, changes) => {
  return api.put(`v1/schedule-locks/${id}`, changes);
};

const findAll = () => {
  return api.get('v1/schedule-locks');
};

const remove = (id) => {
  return api.delete(`v1/schedule-locks/${id}`);
};

export default {
  create,
  update,
  remove,
  findAll,
};
