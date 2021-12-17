import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import userService from '../../../services/user.service';

const initialState = {
  isAuthenticated: false,
  isAuthLoading: true,
  userCompany: null,
};

const actions = {
  SET_AUTH_DATA: 'SET_AUTH_DATA',
  REMOVE_AUTH_DATA: 'REMOVE_AUTH_DATA',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_AUTH_DATA:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        userCompany: action.value,
      };
    case actions.REMOVE_AUTH_DATA:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        userCompany: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSignIn = (token) => setAuthData(token);

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

  const handleSignOut = (withoutRedirect) => {
    removeAuthData();

    if (!withoutRedirect) {
      history.push('/sign-in');
    }
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
    const token = localStorage.getItem('token');

    if (token) {
      setAuthData(JSON.parse(token));
      return;
    }

    removeAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        userCompany: state.userCompany,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
