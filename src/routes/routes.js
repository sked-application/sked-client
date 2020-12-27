import React from 'react';
import SignIn from '../pages/sign-in/sign-in';
import SignInCustomer from '../pages/sign-in-customer/sign-in-customer';
import SignUp from '../pages/sign-up/sign-up';
import RecoverPassword from '../pages/recover-password/recover-password';
import ResetPassword from '../pages/reset-password/reset-password';
import Main from '../pages/main/main';
import Schedules from '../pages/schedules/schedules';
import CustomerSchedules from '../pages/customer-schedules/customer-schedules';
import Services from '../pages/services/services';
import Settings from '../pages/settings/settings';
import Profile from '../pages/profile/profile';
import NotFound from '../pages/not-found/not-found';
import UserPrivateRoute from './private/user-route';
import CustomerPrivateRoute from './private/customer-route';

import { Route, Switch, Redirect } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Switch>
            <UserPrivateRoute exat path="/schedules" component={Schedules} />
            <UserPrivateRoute exat path="/services" component={Services} />
            <UserPrivateRoute exat path="/settings" component={Settings} />
            <UserPrivateRoute exat path="/profile" component={Profile} />
            <CustomerPrivateRoute exat path="/customer-schedules" component={CustomerSchedules} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signin-customer" component={SignInCustomer} />
            <Route exact path="/recover-password" component={RecoverPassword} />
            <Route exact path="/recover-password-customer" component={RecoverPassword} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <Route exat path="/not-found" component={NotFound} />
            <Route exat path="/:account" component={Main} />
            <Redirect to="not-found" />
        </Switch>
    );
};

export default AppRoutes;
