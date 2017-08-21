// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
// sagas
import {sagas as jobsSagas} from 'modules/Jobs';
// components
import JobsList from 'components/JobsList';
/* eslint-disable import/first */
import SubscriptionsList from './components/SubscriptionsList';
// selectors
import {orderedJobsSelector, jobsMeta} from 'modules/Jobs/selectors';
// other
import styles from './index.less';
/* eslint-enable import/first */

class DashboardJobsPage extends React.Component {
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
    subscriptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      }),
    ).isRequired,
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
    const {subscriptions, jobs, jobsMeta: {hasNextPage}} = this.props;
    console.log('jobs', jobs, hasNextPage);
    return (<div className={styles.root}>
      <div className={styles.sidebar}>
        <SubscriptionsList subscriptions={subscriptions} />
      </div>
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

function select(state/* , ownProps */) {
  return {
    subscriptions: Object.values(state.modules.subscriptions.items),
    jobs: orderedJobsSelector(state),
    jobsMeta: jobsMeta(state),
  };
}

export default connect(select, {

})(DashboardJobsPage);
