import api from '../api';

const create = (data) => {
  return api.post('v1/schedules', data);
};

const updateStatus = ({ id, status }) => {
  return api.put(`v1/schedules/status/${id}`, {
    status,
  });
};

const findAll = (params) => {
  return api.get('v1/schedules', {
    params,
  });
};

export default {
  create,
  findAll,
  updateStatus,
};
