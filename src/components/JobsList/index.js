// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import InfiniteList from 'components/Infinite/List';
import JobItem from 'components/JobItem';

class JobsList extends React.Component {
  static propTypes = {
    loadNextPage: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    perPage: PropTypes.number.isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        shortDescription: PropTypes.string,
      }).isRequired,
    ).isRequired,
  };

  getRowHeight = () => 160

  jobItemRenderer = ({rowData, key, style}) => {
    return (<div key={key} style={style}>
      <JobItem job={rowData} />
    </div>);
  }

  render() {
    const {jobs, hasNextPage, perPage, loadNextPage} = this.props;

    return (<div>
      <InfiniteList
        totalItemsCount={jobs.length}
        rows={jobs}
        rowRenderer={this.jobItemRenderer}
        hasNextPage={hasNextPage}
        perPage={perPage}
        loadNextPage={loadNextPage}
        getRowHeight={this.getRowHeight}
      />
    </div>);
  }
}

export default JobsList;
