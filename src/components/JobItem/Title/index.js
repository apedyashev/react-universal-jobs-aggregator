// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {H4} from 'components/typography';
// other
import styles from './index.less';

export default function JobItemTitle({title}) {
  return (<H4 className={styles.root}>{title}</H4>);
}
JobItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
