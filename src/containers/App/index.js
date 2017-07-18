import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Explore} from 'components';
import injectTapEventPlugin from 'injectTapEventPlugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from 'theme/mui-theme';
import DevTools from 'containers/DevTools/DevTools';

import {NotAuthenticated} from 'components/TopNav';

import {Route, Switch} from 'react-router';
import {
  NotFound,
  UserPage,
  RepoPage,
  HomePage
} from 'containers';

import {
  navigate,
  updateRouterState,
  resetErrorMessage
} from '../../actions';
import styles from './App.scss'; // eslint-disable-line

class App extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    updateRouterState: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
    params: PropTypes.object,
  };

  static defaultProps = {
    children: null,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    injectTapEventPlugin();
    // this.props.updateRouterState({
    //   pathname: this.props.location.pathname,
    //   params: this.props.params
    // });
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.errorMessage) {
    //   // handle error here
    // }
    // if (this.props.location.pathname !== nextProps.location.pathname) {
    //   this.props.updateRouterState({
    //     pathname: nextProps.location.pathname,
    //     params: nextProps.params
    //   });
    // }
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.navigate(`/${nextValue}`);
  }

  render() {
    const {children, inputValue} = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div className={styles.app}>
          <Helmet
            title="React Universal Saga"
            meta={[{property: 'og:site_name', content: 'React Universal Saga'}]}
          />
          <NotAuthenticated />
          <div className={styles.content}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/:login" component={UserPage} />
              <Route path="/:login/:name" component={RepoPage} />
              <Route path="/404" component={NotFound} />
              <Route path="*" component={NotFound} />
            </Switch>
            <DevTools />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

// function preload() {
//   return [
//     [sagaName]
//   ];
// }
// App.preload = preload;

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    // inputValue: state.router.pathname.substring(1)
  };
}

export default connect(mapStateToProps, {
  navigate,
  updateRouterState,
  resetErrorMessage
})(App);
