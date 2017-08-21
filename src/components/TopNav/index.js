// libs
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {NavLink} from 'react-router-dom';
// import MenuItem from 'material-ui/MenuItem';
import NotAuthenticated from './NotAuthenticated';
import Authenticated from './Authenticated';
import styles from './index.less';

class TopNav extends Component {
  static propTypes = {
    alwaysSticked: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  };
  static defaultProps = {
    alwaysSticked: false,
    isAuthenticated: false,
  };
  state = {stick: false};

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({stick: (window.pageYOffset > 0)});
  }

  render() {
    const {stick} = this.state;
    const {alwaysSticked, isAuthenticated} = this.props;

    return (<header className={cn(styles.container, {[styles.stick]: (alwaysSticked || stick)})}>
      <div className={styles.logo}>
        <NavLink to="/" />
      </div>
      <div className={styles.items}>
        {isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
      </div>
    </header>);
  }
}

export default TopNav;
