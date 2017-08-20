// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Redirect} from 'react-router-dom';
import {NotAuthenticated} from 'components/TopNav';
// other
import styles from './index.less';

export default function DashboardLayout({children}, {loggedUserId}) {
  if (!loggedUserId) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <NotAuthenticated alwaysSticked />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
DashboardLayout.contextTypes = {
  loggedUserId: PropTypes.string,
};
