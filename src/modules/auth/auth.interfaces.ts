import { ICompany } from '../../modules/company/company.interfaces';
import { IUser } from '../../modules/user/user.interfaces';

export interface IAuth {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  userCompany: ICompany | undefined;
  isProfessional: boolean;
  isCustomer: boolean;
  redirectToSignIn: boolean;
  token: string | undefined;
  loggedUser: IUser | undefined;
}
