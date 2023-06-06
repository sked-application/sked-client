import React from 'react';
import AppRoutes from '../routes/routes';
import { AuthProvider, AuthContext } from '../contexts/auth';
import { LayoutProvider, LayoutContext } from '../contexts/layout';
import Loading from '../shared/components/loading';
import Layout from '../layout/layout.component';
import '../styles/main.scss';

const App: React.FC = () => (
  <AuthProvider>
    <AuthContext.Consumer>
      {({ AUTH_PROVIDER }) =>
        AUTH_PROVIDER.state.isAuthLoading ? (
          <div className="mt-6">
            <Loading />
          </div>
        ) : (
          <LayoutProvider>
            <LayoutContext.Consumer>
              {() => (
                <Layout>
                  <AppRoutes />
                </Layout>
              )}
            </LayoutContext.Consumer>
          </LayoutProvider>
        )
      }
    </AuthContext.Consumer>
  </AuthProvider>
);

export default App;
