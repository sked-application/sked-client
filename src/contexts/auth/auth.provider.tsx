import React from 'react';
import api from '../../api';
import userService from '../../modules/user/user.service';
import { useHistory } from 'react-router-dom';
import { AuthActions } from './auth.actions';
import { AuthContext, AuthInitialState } from './auth.context';
import { AuthReducer } from './auth.reducer';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const history = useHistory();
  const [state, dispatch] = React.useReducer(AuthReducer, AuthInitialState);

  const setAuthData = async (token: string): Promise<void> => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    const { data } = await userService.profile();

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userCompany', JSON.stringify(data.company));

    dispatch({
      type: AuthActions.SET_AUTH_DATA,
      value: data,
    });
  };

  const removeAuthData = (): void => {
    api.defaults.headers.Authorization = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('userCompany');

    dispatch({
      type: AuthActions.REMOVE_AUTH_DATA,
    });
  };

  React.useEffect(() => {
    if (state.token) {
      setAuthData(state.token);
      return;
    }

    removeAuthData();

    if (state.redirectToSignIn) {
      history.push('/sign-in');
    }
  }, [state.token, history, state.redirectToSignIn]);

  return (
    <AuthContext.Provider
      value={{
        AUTH_PROVIDER: {
          state,
          dispatch,
          actions: AuthActions,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
