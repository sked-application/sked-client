import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../api/api';

import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [userAccountName, setUserAccountName] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const accountName = localStorage.getItem('userAccountName');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setIsAuthenticated(true);
            setUserAccountName(JSON.parse(accountName));
        }

        setIsAuthLoading(false);
    }, []);

    const handleSignIn = (token, account) => {
        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;

        if (account) {
            setUserAccountName(account.name);
            localStorage.setItem(
                'userAccountName',
                JSON.stringify(account.name)
            );
        }

        setIsAuthenticated(true);
    };

    const handleSignOut = (withoutRedirect) => {
        api.defaults.headers.Authorization = undefined;
        localStorage.removeItem('token');
        localStorage.removeItem('userAccountName');
        setIsAuthenticated(false);
        setUserAccountName();

        if (!withoutRedirect) {
            history.push('/signin');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isAuthLoading,
                userAccountName,
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
