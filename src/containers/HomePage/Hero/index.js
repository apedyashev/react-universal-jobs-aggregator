// libs
import React, {PropTypes} from 'react';
// other
import styles from './index.less';

export default function Hero() {
  return (
    <div className={styles.root}>
      <div className={styles.about}>
        <p>This is a demo project that allows to search jobs scrapped from jobscout24.ch</p>
        <p>Front-end was built with React.js and it utilizes REST API developed with Node.js + MongoDB</p>
      </div>
    </div>
  );
}
Hero.propTypes = {};
