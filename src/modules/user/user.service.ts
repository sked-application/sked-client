import api from '../../api';
import { ICompany } from '../company/company.interfaces';
import { IUser, IUserById } from './user.interfaces';

const create = (data: {
  name: string;
  email: string;
}): Promise<{ data: string }> => {
  return api.post('v1/users/professional/invite', {
    name: data.name,
    email: data.email,
  });
};

const profile = (): Promise<{ data: IUser }> => {
  return api.get('v1/users/profile');
};

const updateProfile = (data: {
  user: Pick<IUser, 'name' | 'telephone' | 'thumbnail'>;
  company: Pick<ICompany, 'name' | 'telephone' | 'address' | 'thumbnail'>;
}): Promise<{ data: string }> => {
  return api.put(`v1/users/profile`, {
    user: data.user,
    company: data.company,
  });
};

const confirmInvitation = (data: {
  password: string;
  token: string;
}): Promise<{ data: string }> => {
  return api.post(
    'v1/users/confirm-invitation',
    {
      password: data.password,
    },
    { params: { token: data.token } },
  );
};

const findAllByCompanyId = (data: {
  companyId: number;
}): Promise<{ data: IUserById }> => {
  return api.get(`v1/users/${data.companyId}/grouped`);
};

const findByConfirmationToken = (data: {
  password: string;
  token: string;
}): Promise<{ data: IUser }> => {
  return api.get('v1/users/by-confirmation-token', {
    params: {
      token: data.token,
      password: data.password,
    },
  });
};

const verifyEmail = (data: { email: string }): Promise<{ data: boolean }> => {
  return api.get('v1/users/verify-email', {
    params: {
      email: data.email,
    },
  });
};

const findAll = (): Promise<{ data: IUser[] }> => {
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
