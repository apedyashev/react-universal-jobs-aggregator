// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import NotAuthenticated from './NotAuthenticated';
import Authenticated from './Authenticated';

export default function TopNav({alwaysSticked, isAuthenticated}) {
  return isAuthenticated ? (
    <Authenticated alwaysSticked={alwaysSticked} />
  ) : (
    <NotAuthenticated alwaysSticked={alwaysSticked} />
  );
}
TopNav.propTypes = {
  alwaysSticked: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};
