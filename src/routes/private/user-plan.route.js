import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../common/contexts/auth';

const UserPrivatePlanRoute = ({ component: Component, plan, ...rest }) => {
  const AUTH = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        AUTH.isAuthenticated &&
        AUTH.isProfessional &&
        AUTH.userCompany.plan === plan ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

UserPrivatePlanRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  plan: PropTypes.string.isRequired,
};

export default UserPrivatePlanRoute;
