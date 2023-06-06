import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { AUTH_STATE } = useContext(AuthContext);
  const redirectUrl = AUTH_STATE.isProfessional
    ? '/schedules'
    : '/customer-schedules';

  return (
    <Route
      {...rest}
      render={(props) =>
        AUTH_STATE.isAuthenticated ? (
          <Redirect to={redirectUrl} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PublicRoute;
