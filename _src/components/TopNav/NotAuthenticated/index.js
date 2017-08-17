// libs
import React from 'react';
// components
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import styles from '../index.less';

export default function TopNavNotAuthenticated() {
  return (<div className={styles.container}>
    <div className={styles.items}>
      <Link to="/login" className={styles.item} activeClassName={styles.active}>
        <MenuItem primaryText="Login" />
      </Link>
      <Link to="/register" className={styles.item} activeClassName={styles.active}>
        <MenuItem primaryText="Register" />
      </Link>
    </div>
  </div>);
}
