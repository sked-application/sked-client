import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userCompany, setUserCompany] = useState();

  const handleSignIn = (token, company) => {
    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (company) {
      setUserCompany(company);
      localStorage.setItem('userCompany', JSON.stringify(company));
    }

    setIsAuthenticated(true);
  };

  const handleSignOut = (withoutRedirect) => {
    api.defaults.headers.Authorization = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('userCompany');
    setIsAuthenticated(false);
    setUserCompany();

    if (!withoutRedirect) {
      history.push('/sign-in');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setIsAuthenticated(true);
      setUserCompany(JSON.parse(localStorage.getItem('userCompany')));
    }

    setIsAuthLoading(false);
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
