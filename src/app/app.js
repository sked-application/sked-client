import React, { useContext, useEffect, useState, Fragment } from 'react';
import AppRoutes from '../routes/routes';
import AppHeader from '../components/header-component/header.component';
import Copyright from '../components/copyright-component/copyright.component';

import {
  AuthProvider,
  AuthContext,
} from '../contexts/auth-context/auth.context';
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
        <Fragment>
          <AppHeader currentPathname={currentPathname} />
          <AppRoutes />
          <Copyright />
        </Fragment>
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
