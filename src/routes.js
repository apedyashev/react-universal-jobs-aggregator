import React from 'react';
import {/* Route, */Switch} from 'react-router';
import {RouteWithLayout} from 'helpers/router';
import {
  NotFound,
  HomePage,
  LoginPage,
} from 'containers';
import {
  LandingPageLayout,
  AuthPageLayout,
} from 'components/layouts';

export default () => {
  const routes = (
    <Switch>
      <RouteWithLayout exact layout={LandingPageLayout} path="/" component={HomePage} />
      <RouteWithLayout exact layout={AuthPageLayout} path="/login" component={LoginPage} />
      <RouteWithLayout layout={LandingPageLayout} path="/404" component={NotFound} />
      <RouteWithLayout layout={LandingPageLayout} path="*" component={NotFound} />
    </Switch>
  );
  return routes;
};
