// libs
import React from 'react';
// other
import styles from './index.less';

export default function Hero() {
  return (
    <div className={styles.root}>
      <div className={styles.about}>
        <p>This is a <b>demo project</b> that allows to search jobs scrapped from <a href="https://www.jobscout24.ch/de">jobscout24.ch</a></p>
        <p>Front-end was built with <b>React.js</b> and it utilizes REST API developed with <b>Sails.js + MongoDB</b></p>
      </div>
    </div>
  );
}
Hero.propTypes = {};
