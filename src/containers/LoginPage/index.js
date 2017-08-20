// libs
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// components
import {Helmet} from 'react-helmet';
/* eslint-disable import/first */
import LoginForm from './Form';
// sagas
import {sagas as authSagas} from 'modules/auth';
// other
import waitAll from 'sagas/waitAll';
import styles from './index.less';
/* eslint-enable import/first */

class LoginPage extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };
  static contextTypes = {
    store: PropTypes.object,
  };

  subminLogin = (values) => {
    const {store} = this.context;
    const sagas = [
      [authSagas.login, values],
    ];
    const runTasks = store.runSaga(waitAll(sagas));
    return runTasks.done;
  }

  render() {
    return (<div className={styles.root}>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <LoginForm onSubmit={this.subminLogin} />
    </div>);
  }
}

function select(/* state */) {
  return {

  };
}

export default withRouter(connect(select, {

})(LoginPage));
