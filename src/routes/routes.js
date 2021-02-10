import React from 'react';
import Main from '../pages/main/main.page';
import SignUp from '../pages/sign-up/sign-up.page';
import SignIn from '../pages/sign-in/sign-in.page';
import Profile from '../pages/profile/profile.page';
import Services from '../pages/service/service.page';
import Settings from '../pages/timegrid/timegrid.page';
import NotFound from '../pages/not-found/not-found.page';
import Schedules from '../pages/schedule/schedule.page';
import ScheduleLock from '../pages/schedule-lock/schedule-lock.page';
import ResetPassword from '../pages/reset-password/reset-password.page';
import SignInCustomer from '../pages/customer-sign-in/customer-sign-in.page';
import RecoverPassword from '../pages/recover-password/recover-password.page';
import CustomerSchedules from '../pages/customer-schedule/customer-schedule.page';

import UserPrivateRoute from './private/user.route';
import CustomerPrivateRoute from './private/customer.route';

import { Route, Switch, Redirect } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Switch>
            <UserPrivateRoute exact path="/schedules" component={Schedules} />
            <UserPrivateRoute exact path="/services" component={Services} />
            <UserPrivateRoute exact path="/settings" component={Settings} />
            <UserPrivateRoute exact path="/profile" component={Profile} />
            <UserPrivateRoute exact path="/schedule-lock" component={ScheduleLock} />
            <CustomerPrivateRoute exact path="/customer-schedules" component={CustomerSchedules} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/customer-sign-in" component={SignInCustomer} />
            <Route exact path="/recover-password" component={RecoverPassword} />
            <Route exact path="/recover-password-customer" component={RecoverPassword} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/:account" component={Main} />
            <Redirect to="not-found" />
        </Switch>
    );
};

export default AppRoutes;
