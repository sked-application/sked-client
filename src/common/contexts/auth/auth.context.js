import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import userService from '../../../services/user.service';

const getLocalToken = () => {
  const token = localStorage.getItem('token');

  return token ? JSON.parse(token) : undefined;
};

const initialState = {
  isAuthenticated: false,
  isAuthLoading: true,
  userCompany: null,
  isProfessional: null,
  isCustomer: null,
  redirectToSignIn: false,
  token: getLocalToken(),
};

const actions = {
  SET_AUTH_DATA: 'SET_AUTH_DATA',
  REMOVE_AUTH_DATA: 'REMOVE_AUTH_DATA',
  SET_SIGN_IN: 'SET_SIGN_IN',
  SET_SIGN_OUT: 'SET_SIGN_OUT',
  SET_SIGN_OUT_WITHOUT_REDIRECT: 'SET_SIGN_OUT_WITHOUT_REDIRECT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_AUTH_DATA:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        userCompany: action.value,
        isProfessional: action.value ? true : false,
        isCustomer: action.value ? false : true,
      };
    case actions.REMOVE_AUTH_DATA:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        userCompany: null,
        isProfessional: null,
        isCustomer: null,
      };
    case actions.SET_SIGN_IN:
      return {
        ...state,
        token: action.value,
      };
    case actions.SET_SIGN_OUT:
      return {
        ...state,
        redirectToSignIn: true,
        token: undefined,
      };
    case actions.SET_SIGN_OUT_WITHOUT_REDIRECT:
      return {
        ...state,
        redirectToSignIn: false,
        token: undefined,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAuthData = async (token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    const { data } = await userService.profile();

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userCompany', JSON.stringify(data.company));

    dispatch({
      type: actions.SET_AUTH_DATA,
      value: data.company,
    });
  };

  const removeAuthData = () => {
    api.defaults.headers.Authorization = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('userCompany');

    dispatch({
      type: actions.REMOVE_AUTH_DATA,
    });
  };

  useEffect(() => {
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
        AUTH_STATE: state,
        AUTH_DISPATCH: dispatch,
        AUTH_ACTIONS: actions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
