// import {take, put, call, fork, select} from 'redux-saga/effects';
import {call, take, put} from 'redux-saga/effects';
import {makeRequest} from 'helpers/saga';
import * as api from './api';
import * as authActions from './actions';

export const loginRequest = makeRequest.bind(null, authActions.login, api.login);

export function* login({email, password}) {
  try {
    yield call(loginRequest, {email, password});
  } catch (error) {
    console.log('catched an error', error);
  }
}


export function* watchLoginSuccess() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {response} = yield take(authActions.LOGIN.SUCCESS);

    // set authHeader to cookie
    const {result} = response;
    const authHeader = `Bearer ${result.token}`;
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 2);
    document.cookie = `auth=${authHeader}; expires=${expires.toUTCString()}`;

    yield put(authActions.setAuth({authHeader}));
  }
}
