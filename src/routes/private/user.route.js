import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../common/contexts/auth';

const UserPrivateRoute = ({ component: Component, ...rest }) => {
  const AUTH = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        AUTH.isAuthenticated && AUTH.isProfessional ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

UserPrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default UserPrivateRoute;
