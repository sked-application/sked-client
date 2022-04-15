import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '../routes/routes';
import AppHeader from '../common/components/header';
import Copyright from '../common/components/copyright';
import { AuthProvider, AuthContext } from '../common/contexts/auth';

import '../common/styles/main.scss';

const skipHeader = ['/sign-up'];

const AppContexted = () => {
  const { AUTH_STATE } = useContext(AuthContext);
  const [currentPathname, setCurrentPathname] = useState('');
  const location = useLocation();
  const routeMatches = (pathname) => {
    return skipHeader.some((route) => pathname.indexOf(route) !== -1);
  };

  useEffect(() => {
    setCurrentPathname(location.pathname);
  }, [location.pathname]);

  return (
    <Fragment>
      {AUTH_STATE.isAuthLoading ? (
        <div className="loading m-t-32"></div>
      ) : (
        <Fragment>
          {!routeMatches(currentPathname) && (
            <AppHeader currentPathname={currentPathname} />
          )}
          <AppRoutes />
          <Copyright />
        </Fragment>
      )}
    </Fragment>
  );
};

const App = () => (
  <AuthProvider>
    <AppContexted />
  </AuthProvider>
);

export default App;
