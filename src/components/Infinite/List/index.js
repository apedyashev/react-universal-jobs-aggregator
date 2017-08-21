// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {List, WindowScroller, AutoSizer, InfiniteLoader} from 'react-virtualized';
import Loader from 'components/Loader';
import waitAll from 'sagas/waitAll';

class InfiniteList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    /* eslint-disable react/forbid-prop-types */
    searchQuery: PropTypes.any,
    /* eslint-enable react/forbid-prop-types */
    totalItemsCount: PropTypes.number.isRequired,
    rows: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    perPage: PropTypes.number.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    publicMethods: PropTypes.func,
    getRowHeight: PropTypes.func,
  };
  static defaultProps = {
    getRowHeight: () => 16,
    publicMethods: null,
    searchQuery: '',
    className: '',
  };
  static contextTypes = {
    store: PropTypes.object,
  };

  state = {pageLoadingMap: []};

  componentDidMount() {
    const {publicMethods} = this.props;
    if (publicMethods) {
      publicMethods({
        resetInfiniteList: () => {
          this.setState({pageLoadingMap: []});
        },
      });
    }
  }

  getRowHeight = ({index}) => {
    return this.props.getRowHeight({index});
  }

  isRowLoaded = ({index}) => {
    const {rows} = this.props;
    return !!rows[index];
  }

  loadMoreRows = () => {
    const {pageLoadingMap} = this.state;
    const {perPage, loadNextPage, totalItemsCount} = this.props;
    const {store} = this.context;
    // const totalItems = items.length;
    const totalItems = totalItemsCount;

    const page = Math.floor(totalItems / perPage);
    const nextPageNum = page + 1;
    if (!pageLoadingMap[nextPageNum]) {
      const sagas = [
        [loadNextPage, {page: nextPageNum, perPage}],
      ];
      const runTasks = store.runSaga(waitAll(sagas));
      runTasks.done.then(() => {
        pageLoadingMap[nextPageNum] = true;
        this.setState({pageLoadingMap});
      });
    }
  }

  noRowsRenderer = () => {
    return <div>No items found</div>;
  }

  rowRenderer = ({index, key, style}) => {
    if (!this.isRowLoaded({index})) {
      return (<div key={key} style={style}>
        <Loader>Loading...</Loader>
      </div>);
    }
    // we need a container with style for groups, because if style is passed to Group component
    // as a property, then each group will be rerenderd on each scroll (that is very bad for performance)
    const rowData = this.props.rows[index];
    if (this.props.rowRenderer) {
      return this.props.rowRenderer({rowData, key, style});
    }
    return (<div key={key} style={style} >
      row {index}
    </div>);
  }

  render() {
    const {rows, hasNextPage, searchQuery} = this.props;
    const rowCount = hasNextPage ? rows.length + 1 : rows.length;

    return (<div>
      <WindowScroller>
        {({height, scrollTop}) => (
          <InfiniteLoader
            key={JSON.stringify(searchQuery) + hasNextPage}
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={rowCount}
            threshold={3}
          >
            {({onRowsRendered, registerChild}) => (
              <AutoSizer disableHeight>
                {({width}) => (
                  <List
                    autoHeight
                    className={this.props.className}
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    noRowsRenderer={this.noRowsRenderer}
                    height={height}
                    width={width}
                    rowRenderer={this.rowRenderer}
                    rowHeight={this.getRowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </WindowScroller>
    </div>);
  }
}

export default InfiniteList;
