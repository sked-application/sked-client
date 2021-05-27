import api from '../api';

const create = (data) => {
  return api.post('v1/users/professional/invite', data);
};

const profile = () => {
  return api.get('v1/users/profile');
};

const updateProfile = ({ user, company }) => {
  return api.put(`v1/users/profile`, {
    user,
    company,
  });
};

const findAllByCompanyId = ({ companyId }) => {
  return api.get(`v1/users/${companyId}/grouped`);
};

const findAllBy = () => {
  return api.get(`v1/users`);
};

export default {
  profile,
  updateProfile,
  findAllByCompanyId,
  findAllBy,
  create,
};
