// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
// other
import styles from './index.less';

export default function LandingPageLayout({children}) {
  return (
    <div className={styles.content}>
      {children}
    </div>
  );
}
LandingPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
