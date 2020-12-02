import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth';

const UserPrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, userAccountName } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && userAccountName ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};

UserPrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default UserPrivateRoute;
