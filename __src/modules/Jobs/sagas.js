import {take, put, call, fork, select} from 'redux-saga/effects';
import {makeRequest} from 'helpers/saga';
import * as api from './api';
import {jobs} from './actions';


export const fetchJobs = makeRequest.bind(null, jobs, api.fetchJobs);

// load repo unless it is cached
export function* loadJobs() {
  // const repoObj = yield select(getRepo, fullName);
  // if (!repoObj) {
    yield call(fetchJobs);
  // }
}
