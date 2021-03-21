import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '../routes/routes';
import AppHeader from '../common/components/header';
import Copyright from '../common/components/copyright';
import { AuthProvider, AuthContext } from '../common/contexts/auth';

import '../common/styles/main.scss';

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
