import React from 'react';
import { IAuth } from '../../modules/auth/auth.interfaces';
import { getLocalToken } from '../../modules/auth/auth.utils';
import { AuthActions } from './auth.actions';
import { AuthDispatch } from './auth.dispatch';

export const AuthInitialState: IAuth = {
  isAuthenticated: false,
  isAuthLoading: true,
  userCompany: undefined,
  isProfessional: false,
  isCustomer: false,
  redirectToSignIn: false,
  token: getLocalToken(),
  loggedUser: undefined,
};

export const AuthContext = React.createContext<{
  AUTH_PROVIDER: {
    state: IAuth;
    dispatch: React.Dispatch<AuthDispatch>;
    actions: { [key in AuthActions]: AuthActions };
  };
}>({
  AUTH_PROVIDER: {
    state: AuthInitialState,
    dispatch: () => null,
    actions: AuthActions,
  },
});
