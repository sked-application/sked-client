import api from '../api';

const signIn = ({ email, password }) => {
  return api.post('v1/auth/signin-admin', {
    email,
    password,
  });
};

const signUp = ({ company, user }) => {
  return api.post('v1/auth/signup-admin', {
    company,
    user,
  });
};

const customerSignIn = ({ email, password }) => {
  return api.post('v1/auth/signin-customer', {
    email,
    password,
  });
};

const customerSignInWithGoogle = ({ accessToken, tokenId }) => {
  return api.post('v1/auth/signin-customer/google', {
    accessToken,
    tokenId,
  });
};

const customerSignIngGoogle = ({ token }) => {
  return api.post('v1/auth/google', {
    token,
  });
};

const customerSignUp = ({ email, name, telephone, password }) => {
  return api.post('v1/auth/signup-customer', {
    email,
    name,
    telephone,
    password,
  });
};

const sendRecoverEmail = ({ email }) => {
  return api.post('v1/auth/send-recover-email', {
    email,
  });
};

const resetPassword = ({ password, confirmPassword, token }) => {
  return api.post(
    'v1/auth/reset-password',
    {
      password,
      confirmPassword,
    },
    { params: { token } },
  );
};

export default {
  signIn,
  signUp,
  sendRecoverEmail,
  resetPassword,
  customerSignIn,
  customerSignUp,
  customerSignIngGoogle,
  customerSignInWithGoogle,
};
