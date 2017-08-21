// libs
import React from 'react';
// other
import styles from './index.less';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Doh! 404!</h1>
      <p>These are <em>not</em> the droids you are looking for!</p>
    </div>
  );
}
