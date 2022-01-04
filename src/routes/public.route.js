import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../common/contexts/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
  const AUTH = useContext(AuthContext);
  const redirectUrl = AUTH.isProfessional
    ? '/schedules'
    : '/customer-schedules';

  return (
    <Route
      {...rest}
      render={(props) =>
        AUTH.isAuthenticated ? (
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
