import { IUser } from '../../modules/user/user.interfaces';
import { AuthActions } from './auth.actions';

export type AuthDispatch = {
  type: AuthActions;
  value?: IUser;
};
