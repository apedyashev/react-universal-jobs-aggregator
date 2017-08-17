// import {take, put, call, fork, select} from 'redux-saga/effects';
import {call} from 'redux-saga/effects';
import {makeRequest} from 'helpers/saga';
import * as api from './api';
import {jobs} from './actions';


export const fetchJobs = makeRequest.bind(null, jobs, api.fetchJobs);

// load repo unless it is cached
export function* loadJobs({page, perPage} = {page: 1, perPage: 20}) {
  // const repoObj = yield select(getRepo, fullName);
  // if (!repoObj) {
  yield call(fetchJobs, {page, perPage});
  // }
}
