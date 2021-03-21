import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userAccountUrl, setUserAccountUrl] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setIsAuthenticated(true);
      setUserAccountUrl(JSON.parse(localStorage.getItem('userAccountUrl')));
    }

    setIsAuthLoading(false);
  }, []);

  const handleSignIn = (token, company) => {
    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (company) {
      setUserAccountUrl(company.url);
      localStorage.setItem('userAccountUrl', JSON.stringify(company.url));
    }

    setIsAuthenticated(true);
  };

  const handleSignOut = (withoutRedirect) => {
    api.defaults.headers.Authorization = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('userAccountUrl');
    setIsAuthenticated(false);
    setUserAccountUrl();

    if (!withoutRedirect) {
      history.push('/sign-in');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthLoading,
        userAccountUrl,
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
