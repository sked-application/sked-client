import { ICompany } from '../company/company.interfaces';
import { IUser } from '../user/user.interfaces';

export interface IFavorite {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  companyId: number;
  company?: ICompany;
  userId: number;
  user?: IUser;
}

export interface IFavoriteCreateParams {
  companyId: number;
}

export interface IFavoriteRemoveParams {
  companyId: number;
}

export interface IFavoriteFindParams {
  companyId: number;
}
