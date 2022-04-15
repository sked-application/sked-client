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

const confirmInvitation = ({ password, confirmPassword, token }) => {
  return api.post(
    'v1/users/confirm-invitation',
    {
      password,
      confirmPassword,
    },
    { params: { token } },
  );
};

const findAllByCompanyId = ({ companyId }) => {
  return api.get(`v1/users/${companyId}/grouped`);
};

const findByConfirmationToken = ({ token, password }) => {
  return api.get('v1/users/by-confirmation-token', {
    params: {
      token,
      password,
    },
  });
};

const verifyEmail = ({ email }) => {
  return api.get('v1/users/verify-email', {
    params: {
      email,
    },
  });
};

const findAll = () => {
  return api.get(`v1/users`);
};

export default {
  profile,
  updateProfile,
  findAllByCompanyId,
  findAll,
  create,
  confirmInvitation,
  findByConfirmationToken,
  verifyEmail,
};
