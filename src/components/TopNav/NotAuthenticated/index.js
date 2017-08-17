// libs
import React, {Component} from 'react';
import cn from 'classnames';
// components
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import styles from '../index.less';

class NotAuthenticated extends Component {
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

    return (<header className={cn(styles.container, {[styles.stick]: stick})}>
      <div className={styles.logo}></div>
      <div className={styles.items}>
        <Link to="/login" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Login" />
        </Link>
        <Link to="/register" className={styles.item} activeClassName={styles.active}>
          <MenuItem primaryText="Register" />
        </Link>
      </div>
    </header>);
  }
}

export default NotAuthenticated;
