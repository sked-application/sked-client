import React from 'react';
import Main from '../pages/main';
import SignUp from '../pages/sign-up';
import SignIn from '../pages/sign-in';
import Profile from '../pages/profile';
import Services from '../pages/services';
import Timegrid from '../pages/timegrid';
import NotFound from '../pages/not-found';
import Schedules from '../pages/schedules';
import ScheduleLocks from '../pages/schedule-locks';
import ResetPassword from '../pages/reset-password';
import CustomerSignIn from '../pages/customer-sign-in';
import CustomerProfile from '../pages/customer-profile';
import RecoverPassword from '../pages/recover-password';
import Professionals from '../pages/professionals';
import Favorites from '../pages/favorites';
import CustomerSchedules from '../pages/customer-schedule';
import UserPrivateRoute from './private/user.route';
import UserPrivatePlanRoute from './private/user-plan.route';
import CustomerPrivateRoute from './private/customer.route';

import { Route, Switch, Redirect } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Switch>
      <UserPrivateRoute exact path="/schedules" component={Schedules} />
      <UserPrivateRoute exact path="/services" component={Services} />
      <UserPrivateRoute exact path="/settings" component={Timegrid} />
      <UserPrivateRoute exact path="/profile" component={Profile} />
      <UserPrivatePlanRoute
        exact
        path="/professionals"
        component={Professionals}
        plan="CUSTOM"
      />
      <UserPrivateRoute
        exact
        path="/schedule-locks"
        component={ScheduleLocks}
      />
      <CustomerPrivateRoute
        exact
        path="/customer-schedules"
        component={CustomerSchedules}
      />
      <CustomerPrivateRoute
        exact
        path="/customer-profile"
        component={CustomerProfile}
      />
      <CustomerPrivateRoute exact path="/favorites" component={Favorites} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/customer-sign-in" component={CustomerSignIn} />
      <Route exact path="/recover-password" component={RecoverPassword} />
      <Route
        exact
        path="/recover-password-customer"
        component={RecoverPassword}
      />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/:company" component={Main} />
      <Redirect to="not-found" />
    </Switch>
  );
};

export default AppRoutes;
