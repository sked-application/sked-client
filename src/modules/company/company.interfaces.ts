import { TCompanyPlans } from './company.types';

export interface ICompany {
  address: string;
  cpfCnpj: string;
  createdAt: string;
  deletedAt: string;
  id: number;
  name: string;
  plan: TCompanyPlans;
  telephone: string;
  thumbnail: string;
  updatedAt: string;
  url: string;
}

export interface ICompanyFindParams {
  url: string;
}

export interface ICompanyValidParams {
  url: string;
}
