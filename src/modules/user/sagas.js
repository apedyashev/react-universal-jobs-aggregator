import {call} from 'redux-saga/effects';
import {makeRequest} from 'helpers/saga';
import * as api from './api';
import * as actions from './actions';

export const fetchProfileRequest = makeRequest.bind(null, actions.fetchProfile, api.fetchProfile);

export function* fetchProfile() {
  try {
    yield call(fetchProfileRequest);
  } catch (error) {
    console.log('catched an error', error);
  }
}
