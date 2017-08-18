// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {NotAuthenticated} from 'components/TopNav';
// other
import styles from './index.less';

export default function AuthPageLayout({children}) {
  return (
    <div>
      <NotAuthenticated alwaysSticked />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
AuthPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
