import api from '../api/api';

const signIn = ({ email, password }) => {
  return api.post('/v1/auth/signin-admin', {
    email,
    password,
  });
};

const signUp = ({ company, user }) => {
  return api.post('/v1/auth/signup-admin', {
    company,
    user,
  });
};

const customerSignIn = ({ email, password }) => {
  return api.post('/v1/auth/signin-customer', {
    email,
    password,
  });
};

const customerSignUp = ({ email, name, telephone, password }) => {
  return api.post('/v1/auth/signup-customer', {
    email,
    name,
    telephone,
    password,
  });
};

const recorverPassword = ({ email, is_customer }) => {
  return api.post('/sign/recover', {
    email,
    is_customer,
  });
};

const resetPassword = ({ password, token }) => {
  return api.post('/sign/reset', {
    password,
    token,
  });
};

export default {
  signIn,
  signUp,
  recorverPassword,
  resetPassword,
  customerSignIn,
  customerSignUp,
};
