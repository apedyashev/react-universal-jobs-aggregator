// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {NotAuthenticated} from 'components/TopNav';
// other
import styles from './index.less';

export default function LandingPageLayout({children}) {
  return (
    <div>
      <NotAuthenticated />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
LandingPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
