import React, { useContext, useEffect, useState } from 'react';
import AppRoutes from '../routes/routes';
import AppHeader from '../components/header.component';
import Copyright from '../components/copyright.component';

import { AuthProvider, AuthContext } from '../contexts/auth.context';
import { useLocation } from 'react-router-dom';

import '../styles/main.scss';

const AppContexted = () => {
    const { isAuthLoading } = useContext(AuthContext);
    const [currentPathname, setCurrentPathname] = useState('');
    const location = useLocation();

    useEffect(() => {
        setCurrentPathname(location.pathname);
    }, [location.pathname]);

    return (
        <>
            {isAuthLoading ? (
                <div className="loading m-t-30"></div>
            ) : (
                <>
                    <AppHeader currentPathname={currentPathname} />
                    <AppRoutes />
					<Copyright />
                </>
            )}
        </>
    );
};

const App = () => (
    <AuthProvider>
        <AppContexted />
    </AuthProvider>
);

export default App;
