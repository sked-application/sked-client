import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
import ProfessionalInvitation from '../pages/professional-invitation';
import Professionals from '../pages/professionals';
import Favorites from '../pages/favorites';
import CustomerSchedules from '../pages/customer-schedule';
import UserPrivateRoute from './private/user.route';
import UserPrivatePlanRoute from './private/user-plan.route';
import CustomerPrivateRoute from './private/customer.route';
import PublicRoute from './public.route';

const routes = {
  userPrivateRoutes: [
    { path: '/schedules', component: Schedules },
    { path: '/services', component: Services },
    { path: '/settings', component: Timegrid },
    { path: '/profile', component: Profile },
    { path: '/schedule-locks', component: ScheduleLocks },
  ],
  userPrivatePlanRoute: [
    { path: '/professionals', component: Professionals, plan: 'CUSTOM' },
  ],
  customerPrivateRoute: [
    { path: '/customer-schedules', component: CustomerSchedules },
    { path: '/customer-profile', component: CustomerProfile },
    { path: '/favorites', component: Favorites },
  ],
  publicRoute: [
    { path: '/sign-up', component: SignUp },
    { path: '/sign-in', component: SignIn },
    { path: '/customer-sign-in', component: CustomerSignIn },
    { path: '/recover-password', component: RecoverPassword },
    { path: '/recover-password-customer', component: RecoverPassword },
    { path: '/reset-password/:token', component: ResetPassword },
  ],
  defaultRoute: [
    {
      path: '/professional-invitation/:token',
      component: ProfessionalInvitation,
    },
    { path: '/not-found', component: NotFound },
    { path: '/:company', component: Main },
  ],
};

const AppRoutes = () => {
  return (
    <Switch>
      {routes.userPrivateRoutes.map((route) => (
        <UserPrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}

      {routes.userPrivatePlanRoute.map((route) => (
        <UserPrivatePlanRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
          plan={route.plan}
        />
      ))}

      {routes.customerPrivateRoute.map((route) => (
        <CustomerPrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}

      {routes.publicRoute.map((route) => (
        <PublicRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}

      {routes.defaultRoute.map((route) => (
        <Route
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default AppRoutes;
