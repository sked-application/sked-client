import api from '../api';

const find = ({ url }) => {
  return api.get(`/v1/companies/${url}`);
};

const valid = ({ url }) => {
  return api.get('/v1/companies/valid', {
    params: {
      url,
    },
  });
};

export default {
  find,
  valid,
};
