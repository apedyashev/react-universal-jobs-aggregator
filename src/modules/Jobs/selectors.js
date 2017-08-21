import {createSelector} from 'reselect';
import pick from 'lodash/pick';

const jobItemsSelector = (state) => state.modules.jobs.items;
const jobOrderSelector = (state) => state.modules.jobs.order;

export const orderedJobsSelector = createSelector(
  jobItemsSelector,
  jobOrderSelector,
  (items, order) => order.map((jobId) => items[jobId]),
);

export const jobsMeta = createSelector(
  (state) => state.modules.jobs,
  (jobsModule) => pick(jobsModule, ['pending', 'loaded', 'hasNextPage', 'totalCount']),
);
