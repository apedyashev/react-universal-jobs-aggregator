import React from 'react';
import {Route, Switch} from 'react-router';
import {
  App,
  NotFound,
  UserPage,
  RepoPage,
  HomePage
} from 'containers';

export default () => {
  const routes = (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/:login" component={UserPage} />
      <Route path="/:login/:name" component={RepoPage} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
  return routes;
};
