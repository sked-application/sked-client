import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../common/contexts/auth';

const UserPrivatePlanRoute = ({ component: Component, plan, ...rest }) => {
  const [AuthState] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        AuthState.isAuthenticated &&
        AuthState.isProfessional &&
        AuthState.userCompany.plan === plan ? (
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
