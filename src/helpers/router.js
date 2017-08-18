import React from 'react';
import {PropTypes} from 'prop-types';
import {Route} from 'react-router';
import _ from 'lodash';

const extractedRoutes = [];
export default function extractRoutes(routes) {
  let r = routes;
  if (_.isPlainObject(routes)) {
    r = [routes];
  }
  _.forEach(r, (route) => {
    extractedRoutes.push(route.props);

    if (route && route.props && route.props.children) {
      extractRoutes(route.props.children);
    }
  });

  return extractedRoutes;
}

export function RouteWithLayout({layout, component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return React.createElement(layout, props, React.createElement(component, props));
      }}
    />
  );
}
RouteWithLayout.propTypes = {
  layout: PropTypes.node.isRequired,
  component: PropTypes.node.isRequired,
};
