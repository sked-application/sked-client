import api from '../api';

const signIn = ({ email, password }) => {
  return api.post('v1/auth/signin-admin', {
    email,
    password,
  });
};

const signUp = ({ name, email, password }) => {
  return api.post('v1/auth/signup-admin', {
    name,
    email,
    password,
  });
};

const setup = ({ name, url, timeGrids, email, services, token }) => {
  return api.post('v1/auth/setup-admin', {
    name,
    url,
    email,
    timeGrids,
    services,
    token,
  });
};

const customerSignIn = ({ name, confirmationSmsCode }) => {
  return api.post('v1/auth/signin-customer', {
    name,
    confirmationSmsCode,
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

const customerSignUp = ({ name, telephone }) => {
  return api.post('v1/auth/signup-customer', {
    name,
    telephone,
  });
};

const sendRecoverEmail = ({ email }) => {
  return api.post('v1/auth/send-recover-email', {
    email,
  });
};

const resetPassword = ({ password, token }) => {
  return api.post(
    'v1/auth/reset-password',
    {
      password,
    },
    { params: { token } },
  );
};

export default {
  signIn,
  signUp,
  setup,
  sendRecoverEmail,
  resetPassword,
  customerSignIn,
  customerSignUp,
  customerSignIngGoogle,
  customerSignInWithGoogle,
};
