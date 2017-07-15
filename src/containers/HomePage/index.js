// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
// components

class HomePage extends React.Component {
  static propTypes = {};
  render() {
    return (<div>HomePage</div>);
  }
}

function select(state, ownProps) {
  return {
  };
}

export default connect(select, {

})(HomePage);
