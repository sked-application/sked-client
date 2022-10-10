import React, { useContext, Fragment } from 'react';
import AppRoutes from '../routes/routes';
import { AuthProvider, AuthContext } from '../common/contexts/auth';
import '../common/styles/main.scss';
import Loading from '../common/components/loading';
import Layout from '../common/components/layout/layout.component';

const AppContexted = () => {
  const { AUTH_STATE } = useContext(AuthContext);

  return (
    <Fragment>
      {AUTH_STATE.isAuthLoading ? (
        <Loading className="mt-6" />
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
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
