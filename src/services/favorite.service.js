import api from '../api';

const create = (data) => {
  return api.post('v1/favorites', data);
};

const remove = ({ companyId }) => {
  return api.delete(`v1/favorites/${companyId}`);
};

const find = ({ companyId }) => {
  return api.get(`v1/favorites/${companyId}`);
};

const findAll = () => {
  return api.get('v1/favorites');
};

export default {
  create,
  remove,
  findAll,
  find,
};
