import api from '../api';

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

export default {
  profile,
  updateProfile,
  findAllByCompanyId,
};
