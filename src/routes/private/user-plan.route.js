import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../common/contexts/auth';

const UserPrivatePlanRoute = ({ component: Component, plan, ...rest }) => {
  const { isAuthenticated, userCompany } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && userCompany && userCompany.plan === plan ? (
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
