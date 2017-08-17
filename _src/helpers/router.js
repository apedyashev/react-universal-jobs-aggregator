import _ from 'lodash';

const extractedRoutes = [];
export default function extractRoutes(routes) {
  let r = routes;
  if (_.isPlainObject(routes)) {
    r = [routes];
  }
  _.forEach(r, (route) => {
    extractedRoutes.push(route.props);

    if (route.props.children) {
      extractRoutes(route.props.children);
    }
  });

  return extractedRoutes;
}
