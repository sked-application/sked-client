import { IAuth } from '../../modules/auth/auth.interfaces';
import { AuthActions } from './auth.actions';
import { AuthDispatch } from './auth.dispatch';

export const AuthReducer = (state: IAuth, action: AuthDispatch): IAuth => {
  switch (action.type) {
    case AuthActions.SET_AUTH_DATA:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        isProfessional: action.value?.company ? true : false,
        isCustomer: action.value?.company ? false : true,
        userCompany: action.value?.company,
        loggedUser: action.value,
      };
    case AuthActions.REMOVE_AUTH_DATA:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        userCompany: undefined,
        isProfessional: false,
        isCustomer: false,
      };
    case AuthActions.SET_SIGN_IN:
      return {
        ...state,
        token: action.value?.token,
      };
    case AuthActions.SET_SIGN_OUT:
      return {
        ...state,
        redirectToSignIn: true,
        token: undefined,
      };
    case AuthActions.SET_SIGN_OUT_WITHOUT_REDIRECT:
      return {
        ...state,
        redirectToSignIn: false,
        token: undefined,
      };
    default:
      return state;
  }
};
