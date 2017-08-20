// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Redirect} from 'react-router-dom';
// other
import styles from './index.less';

export default function AuthLayout({children}, {loggedUserId}) {
  if (loggedUserId) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={styles.content}>
      {children}
    </div>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthLayout.contextTypes = {
  loggedUserId: PropTypes.string,
};
