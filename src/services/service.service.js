import api from '../api';

const create = (data) => {
  return api.post('v1/services', data);
};

const update = (id, changes) => {
  return api.put(`v1/services/${id}`, changes);
};

const findAll = () => {
  return api.get('v1/services');
};

const findAllByCompanyId = ({ companyId, userId }) => {
  return api.get(`v1/services/grouped`, {
    params: {
      companyId,
      userId,
    },
  });
};

const remove = (id) => {
  return api.delete(`v1/services/${id}`);
};

export default {
  create,
  update,
  remove,
  findAll,
  findAllByCompanyId,
};
