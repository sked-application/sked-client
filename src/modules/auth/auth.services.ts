import api from '../../api';
import { IService } from '../service/service.interfaces';
import { ITimegridByDay } from '../timegrid/timegrid.interfaces';
import { IUser } from '../user/user.interfaces';

const signIn = (data: {
  email: string;
  password: string;
}): Promise<{ data: string }> => {
  return api.post('v1/auth/signin-admin', {
    email: data.email,
    password: data.password,
  });
};

const signUp = (data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ data: string }> => {
  return api.post('v1/auth/signup-admin', {
    name: data.name,
    email: data.email,
    password: data.password,
  });
};

const setup = (data: {
  name: string;
  url: string;
  email: string;
  token: string;
  timeGrids: ITimegridByDay;
  services: IService[];
}): Promise<{ data: string }> => {
  return api.post('v1/auth/setup-admin', {
    name: data.name,
    url: data.url,
    email: data.email,
    timeGrids: data.timeGrids,
    services: data.services,
    token: data.token,
  });
};

const customerSignIn = (data: {
  name: string;
  confirmationSmsCode: string;
}): Promise<{ data: string }> => {
  return api.post('v1/auth/signin-customer', {
    name: data.name,
    confirmationSmsCode: data.confirmationSmsCode,
  });
};

const customerSignUp = (data: {
  email: string;
  telephone: string;
}): Promise<{ data: Pick<IUser, 'name'> }> => {
  return api.post('v1/auth/signup-customer', {
    email: data.email,
    telephone: data.telephone,
  });
};

const sendRecoverEmail = (data: {
  email: string;
}): Promise<{ data: string }> => {
  return api.post('v1/auth/send-recover-email', {
    email: data.email,
  });
};

const resetPassword = (data: {
  password: string;
  token: string;
}): Promise<{ data: Pick<IUser, 'role'> }> => {
  return api.post(
    'v1/auth/reset-password',
    {
      password: data.password,
    },
    { params: { token: data.token } },
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
};
