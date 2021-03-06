import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
// sagas
import {fetchProfile} from 'modules/user/sagas';
// components
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'injectTapEventPlugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopNav from 'components/TopNav';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from 'theme/mui-theme';
import {withRouter} from 'react-router-dom';
// import DevTools from 'containers/DevTools/DevTools';
import getRoutes from 'routes';
import styles from './index.scss'; // eslint-disable-line

class App extends Component {
  static propTypes = {
    loggedUserId: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    loggedUserId: null,
  };

  static childContextTypes = {
    loggedUserId: PropTypes.string,
  };

  static preload() {
    return [
      [fetchProfile],
    ];
  }

  getChildContext() {
    return {
      loggedUserId: this.props.loggedUserId,
    };
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  render() {
    const {location: {pathname}, isAuthenticated} = this.props;
    const isTopNavAlwaysSticked = (pathname !== '/');
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div className={styles.app}>
          <Helmet
            title="React Universal Saga"
            meta={[{property: 'og:site_name', content: 'React Universal Saga'}]}
          />
          <TopNav alwaysSticked={isTopNavAlwaysSticked} isAuthenticated={isAuthenticated} />
          <div>
            {getRoutes()}
          </div>
        </div>
      </MuiThemeProvider>
    );
    // <DevTools />
  }
}

// function preload() {
//   return [
//     [fetchProfile]
//   ];
// }
// App.preload = preload;

function mapStateToProps(state) {
  const loggedUserId = state.modules.user.loggedUserId;
  return {
    loggedUserId,
    isAuthenticated: !!loggedUserId,
    errorMessage: state.errorMessage,
    // inputValue: state.router.pathname.substring(1)
  };
}

export default withRouter(connect(mapStateToProps, {
  // navigate,
  // updateRouterState,
  // resetErrorMessage
})(App));
