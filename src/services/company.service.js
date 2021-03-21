import api from '../api';

const find = ({ company }) => {
  return api.get(`/v1/companies/${company}`);
};

export default {
  find,
};
