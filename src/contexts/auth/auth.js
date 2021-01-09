import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../api/api';

import { useHistory } from 'react-router-dom';

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

    const handleSignIn = (token, account) => {
        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;

        if (account) {
            setUserAccountUrl(account.url);
            localStorage.setItem('userAccountUrl', JSON.stringify(account.url));
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
            history.push('/signin');
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
