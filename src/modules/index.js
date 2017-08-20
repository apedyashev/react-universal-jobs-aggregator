import {combineReducers} from 'redux';
import {fork} from 'redux-saga/effects';
import {reducer as jobs} from './Jobs';
import {reducer as user} from './user';
import {reducer as auth, sagas as authSagas} from './auth';

const appReducer = combineReducers({
  auth,
  jobs,
  user,
});

export const rootReducer = (state, action) => {
  // if (action.type === userConstans.RESET_LOGGED_USER) {
  //   // pass undefined as a previous state so all reducers will be reinitialized
  //   return appReducer(undefined, action);
  // }

  return appReducer(state, action);
};

export function* rootSaga() {
  yield [
    fork(authSagas.watchLoginSuccess),
  ];
}
