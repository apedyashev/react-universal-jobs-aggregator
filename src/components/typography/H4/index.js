// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// other
import styles from './index.less';

export default function H4({children, className}) {
  return (
    <h4 className={cn(styles.root, className)}>
      {children}
    </h4>
  );
}
H4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
H4.defaultProps = {
  className: '',
};
