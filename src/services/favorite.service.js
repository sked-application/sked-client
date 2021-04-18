import api from '../api';

const favorite = (data) => {
  return api.post('v1/favorites', data);
};

const find = ({ companyId }) => {
  return api.get(`v1/favorites/${companyId}`);
};

const findAll = () => {
  return api.get('v1/favorites');
};

export default {
  favorite,
  findAll,
  find,
};
