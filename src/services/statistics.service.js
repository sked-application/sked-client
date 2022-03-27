import api from '../api';

const findAll = (params) => {
  return api.get('v1/statistics', {
    params,
  });
};

export default {
  findAll,
};
