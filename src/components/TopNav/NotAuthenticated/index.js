// libs
import React from 'react';
// components
import {NavLink} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
// other
import styles from '../index.less';

export default function TopNavNotAuthenticated() {
  return (<div className={styles.items}>
    <NavLink to="/login" className={styles.item} activeClassName={styles.active}>
      <MenuItem primaryText="Login" />
    </NavLink>
    <NavLink to="/register" className={styles.item} activeClassName={styles.active}>
      <MenuItem primaryText="Register" />
    </NavLink>
  </div>);
}
TopNavNotAuthenticated.propTypes = {};
