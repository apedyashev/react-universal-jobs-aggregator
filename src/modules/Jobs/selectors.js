import {createSelector} from 'reselect';

const jobItemsSelector = (state) => state.modules.jobs.items;
const jobOrderSelector = (state) => state.modules.jobs.order;

export const orderedJobsSelector = createSelector(
  jobItemsSelector,
  jobOrderSelector,
  (items, order) => order.map((jobId) => items[jobId]),
);
