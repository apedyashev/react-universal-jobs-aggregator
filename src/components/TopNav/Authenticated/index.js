// libs
import React from 'react';
// components
import {NavLink} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
// other
import styles from '../index.less';

export default function TopNavAuthenticated() {
  return (<div className={styles.items}>
    <NavLink to="/dashboard" className={styles.item} activeClassName={styles.active}>
      <MenuItem primaryText="Jobs" />
    </NavLink>
    <NavLink to="/statistics" className={styles.item} activeClassName={styles.active}>
      <MenuItem primaryText="Statistics" />
    </NavLink>
  </div>);
}
