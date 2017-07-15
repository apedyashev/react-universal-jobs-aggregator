import {put, call} from 'redux-saga/effects';

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
export function* makeRequest(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const {response, error} = yield call(apiFn, url || id);
  // const r = yield call(apiFn, url || id);
  // console.log('-------------------------------', response);
  if (response) {
    yield put(entity.success(response));
  } else {
    yield put(entity.failure(error));
  }
}
