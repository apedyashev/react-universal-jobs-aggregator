// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// other
import styles from './index.less';

export default function JobItemTitle({title}) {
  return (<h4 className={styles.root}>{title}</h4>);
}
JobItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
