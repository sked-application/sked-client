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
import Statistics from '../pages/statistics';
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

type routesTypes =
  | 'USER_PRIVATE_ROUTES'
  | 'USER_PRIVATE_PLAN_ROUTES'
  | 'CUSTOMER_PRIVATE_ROUTES'
  | 'PUBLIC_ROUTES'
  | 'DEFAULT_ROUTES';

type routesTypesValues = {
  path: string;
  component: React.FC;
  plan?: string;
};

const routes: { [key in routesTypes]: routesTypesValues[] } = {
  USER_PRIVATE_ROUTES: [
    { path: '/schedules', component: Schedules },
    { path: '/services', component: Services },
    { path: '/settings', component: Timegrid },
    { path: '/profile', component: Profile },
    { path: '/schedule-locks', component: ScheduleLocks },
    { path: '/statistics', component: Statistics },
  ],
  USER_PRIVATE_PLAN_ROUTES: [
    { path: '/professionals', component: Professionals, plan: 'CUSTOM' },
  ],
  CUSTOMER_PRIVATE_ROUTES: [
    { path: '/customer-schedules', component: CustomerSchedules },
    { path: '/customer-profile', component: CustomerProfile },
    { path: '/favorites', component: Favorites },
  ],
  PUBLIC_ROUTES: [
    { path: '/sign-up/:token?', component: SignUp },
    { path: '/sign-in', component: SignIn },
    { path: '/customer-sign-in', component: CustomerSignIn },
    { path: '/recover-password', component: RecoverPassword },
    { path: '/recover-password-customer', component: RecoverPassword },
    { path: '/reset-password/:token', component: ResetPassword },
    { path: '/', component: SignIn },
  ],
  DEFAULT_ROUTES: [
    {
      path: '/professional-invitation/:token',
      component: ProfessionalInvitation,
    },
    { path: '/not-found', component: NotFound },
    { path: '/:company', component: Main },
  ],
};

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      {routes.USER_PRIVATE_ROUTES.map((route) => (
        <UserPrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}

      {routes.USER_PRIVATE_PLAN_ROUTES.map((route) => (
        <UserPrivatePlanRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
          plan={route.plan}
        />
      ))}

      {routes.CUSTOMER_PRIVATE_ROUTES.map((route) => (
        <CustomerPrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}

      {routes.PUBLIC_ROUTES.map((route) => (
        <PublicRoute
          exact
          key={route.path}
          path={route.path}
          component={route.component}
        />
      ))}

      {routes.DEFAULT_ROUTES.map((route) => (
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
