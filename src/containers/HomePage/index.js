// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import map from 'lodash/map';
// actions
// sagas
import {sagas as jobsSagas} from 'modules/Jobs';
// selectors
import {orderedJobsSelector, jobsMeta} from 'modules/Jobs/selectors';
// components
import InfiniteList from 'components/Infinite/List';
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
  };


  static preload = () => {
    return [
      [jobsSagas.loadJobs],
    ];
  }

  jobItemRenderer = ({rowData, key, style}) => {
    return <div key={key} style={style}>{rowData.title}</div>;
  }

  loadNextPage = ({page, perPage}) => {
    return jobsSagas.loadJobs({page, perPage});
  }

  getRowHeight = () => 24

  render() {
    const {jobs, jobsMeta: {hasNextPage}} = this.props;
    return (<div className={styles.root}>
      <Hero />

      HomePage
      <InfiniteList
        totalItemsCount={jobs.length}
        rows={jobs}
        rowRenderer={this.jobItemRenderer}
        hasNextPage={hasNextPage}
        perPage={20}
        loadNextPage={this.loadNextPage}
        getRowHeight={this.getRowHeight}
      />
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
