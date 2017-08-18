// libs
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {NavLink} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import styles from '../index.less';

class NotAuthenticated extends Component {
  static propTypes = {
    alwaysSticked: PropTypes.bool,
  };
  static defaultProps = {
    alwaysSticked: false,
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
    const {alwaysSticked} = this.props;

    return (<header className={cn(styles.container, {[styles.stick]: (alwaysSticked || stick)})}>
      <div className={styles.logo} />
      <div className={styles.items}>
        <NavLink to="/login" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Login" />
        </NavLink>
        <NavLink to="/register" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Register" />
        </NavLink>
      </div>
    </header>);
  }
}

export default NotAuthenticated;
