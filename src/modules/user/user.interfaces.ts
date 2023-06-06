import { ICompany } from '../company/company.interfaces';

export interface IUser {
  id: number;
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  role: string;
  thumbnail: string;
  company: ICompany;
  token?: string;
}

export interface IUserById {
  [key: number]: IUser;
}
