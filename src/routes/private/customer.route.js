import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../common/contexts/auth';

const CustomerPrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, userCompany } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userCompany ? (
          <Redirect to="/schedules" />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

CustomerPrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default CustomerPrivateRoute;
