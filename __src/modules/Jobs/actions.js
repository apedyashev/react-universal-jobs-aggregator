import {action, createRequestTypes} from 'helpers/action';

export const JOBS = createRequestTypes('JOBS');

export const jobs = {
  request: () => action(JOBS.REQUEST),
  success: (response) => action(JOBS.SUCCESS, {response}),
  failure: (error) => action(JOBS.FAILURE, {error}),
};
