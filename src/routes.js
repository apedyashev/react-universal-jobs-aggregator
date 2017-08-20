import React from 'react';
import {/* Route, */Switch} from 'react-router';
import {RouteWithLayout} from 'helpers/router';
import {
  NotFound,
  HomePage,
  LoginPage,
  DashboardJobsPage,
} from 'containers';
import {
  LandingPageLayout,
  AuthPageLayout,
  DashboardLayout,
} from 'components/layouts';

export default () => {
  const routes = (
    <Switch>
      <RouteWithLayout exact layout={LandingPageLayout} path="/" component={HomePage} />
      <RouteWithLayout exact layout={AuthPageLayout} path="/login" component={LoginPage} />
      <RouteWithLayout exact layout={DashboardLayout} path="/dashboard" component={DashboardJobsPage} />
      <RouteWithLayout layout={LandingPageLayout} path="/404" component={NotFound} />
      <RouteWithLayout layout={LandingPageLayout} path="*" component={NotFound} />
    </Switch>
  );
  return routes;
};
