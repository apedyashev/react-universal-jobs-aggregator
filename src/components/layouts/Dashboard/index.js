// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Redirect} from 'react-router-dom';
// other
import styles from './index.less';

export default function DashboardLayout({children}, {loggedUserId}) {
  if (!loggedUserId) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.content}>
      {children}
    </div>
  );
}
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
DashboardLayout.contextTypes = {
  loggedUserId: PropTypes.string,
};
