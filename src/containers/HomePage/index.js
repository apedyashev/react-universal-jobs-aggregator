// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
// sagas
import {sagas as jobsSagas} from 'modules/Jobs';
// selectors
import {orderedJobsSelector, jobsMeta} from 'modules/Jobs/selectors';
// components
import JobsList from 'components/JobsList';
import Hero from './Hero';
// other
import styles from './index.less';

class HomePage extends React.Component {
  static propTypes = {
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
    ).isRequired,
    jobsMeta: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,
    }).isRequired,
  };


  static preload() {
    return [
      [jobsSagas.loadJobs],
    ];
  }

  loadNextPage = ({page, perPage}) => {
    return jobsSagas.loadJobs({page, perPage});
  }

  render() {
    const {jobs, jobsMeta: {hasNextPage}} = this.props;
    return (<div className={styles.root}>
      <Hero />

      <div className={styles.content}>
        <JobsList
          jobs={jobs}
          hasNextPage={hasNextPage}
          perPage={20}
          loadNextPage={this.loadNextPage}
        />
      </div>
    </div>);
  }
}
// {map(this.props.jobs, (job) => (
//   <div key={job.id}>{job.title}</div>
// ))}

function select(state) {
  return {
    jobs: orderedJobsSelector(state),
    jobsMeta: jobsMeta(state),
  };
}

export default connect(select, {

})(HomePage);
