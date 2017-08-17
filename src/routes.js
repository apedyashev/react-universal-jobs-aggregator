import React from 'react';
import {Route, Switch} from 'react-router';
import {
  NotFound,
  HomePage,
  LoginPage,
} from 'containers';

export default () => {
  const routes = (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
  return routes;
};
