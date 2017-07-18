// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import map from 'lodash/map';
// actions
// sagas
import {sagas as jobsSagas} from 'modules/Jobs';
// selectors
import {orderedJobsSelector} from 'modules/Jobs/selectors';
// components

class HomePage extends React.Component {
  static propTypes = {
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
    ).isRequired,
  };

  static preload = () => {
    return [
      [jobsSagas.loadJobs],
    ];
  }
  render() {
    return (<div>
      HomePage
      {map(this.props.jobs, (job) => (
        <div key={job.id}>{job.title}</div>
      ))}
    </div>);
  }
}

function select(state) {
  return {
    jobs: orderedJobsSelector(state),
  };
}

export default connect(select, {

})(HomePage);
