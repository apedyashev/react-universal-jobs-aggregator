import React from 'react';
import {shallow} from 'enzyme';
import InfiniteList from 'components/Infinite/List';
import JobsList from '../index.js';

describe('JobsList', () => {
  it('renders InfiniteList', () => {
    const jobs = [{id: '1', title: 'a title', shortDescription: 'job description'}];
    const loadNextPage = () => {};
    const component = shallow(
      <JobsList
        loadNextPage={loadNextPage}
        hasNextPage
        perPage={10}
        jobs={jobs}
      />,
    );

    expect(component.find(InfiniteList)).toHaveLength(1);
    expect(component.find(InfiniteList).prop('perPage')).toEqual(10);
    expect(component.find(InfiniteList).prop('rows')).toEqual(jobs);
    expect(component.find(InfiniteList).prop('hasNextPage')).toEqual(true);
    expect(component.find(InfiniteList).prop('loadNextPage')).toEqual(loadNextPage);
  });
});
