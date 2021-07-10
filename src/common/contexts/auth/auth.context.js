import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import userService from '../../../services/user.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userCompany, setUserCompany] = useState();

  const handleSignIn = async (token) => {
    setAuthData(token);
  };

  const handleSignOut = async (withoutRedirect) => {
    await removeAuthData();

    if (!withoutRedirect) {
      history.push('/sign-in');
    }
  };

  const setAuthData = async (token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    const { data } = await userService.profile();

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userCompany', JSON.stringify(data.company));

    setUserCompany(data.company);
    setIsAuthenticated(true);
    setIsAuthLoading(false);
  };

  const removeAuthData = async () => {
    api.defaults.headers.Authorization = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('userCompany');
    setIsAuthenticated(false);
    setUserCompany();
    setIsAuthLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthData(JSON.parse(token));
    } else {
      removeAuthData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthLoading,
        userCompany,
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
