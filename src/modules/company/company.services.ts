import api from '../../api';
import {
  ICompany,
  ICompanyFindParams,
  ICompanyValidParams,
} from './company.interfaces';

const find = (data: ICompanyFindParams): Promise<{ data: ICompany }> => {
  return api.get(`/v1/companies/${data.url}`);
};

const valid = (data: ICompanyValidParams): Promise<{ data: boolean }> => {
  return api.get('/v1/companies/valid', {
    params: {
      url: data.url,
    },
  });
};

export default {
  find,
  valid,
};
