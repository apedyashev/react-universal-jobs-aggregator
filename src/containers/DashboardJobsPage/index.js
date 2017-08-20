// libs
import React from 'react';
// import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
// actions
// components

class DashboardJobsPage extends React.Component {
  static propTypes = {};
  render() {
    return (<div>DashboardAllJobsPage</div>);
  }
}

function select(/* state, ownProps */) {
  return {
  };
}

export default connect(select, {

})(DashboardJobsPage);
