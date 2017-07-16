import {combineReducers} from 'redux';
import {reducer as jobs} from './Jobs';
import {reducer as user} from './user';
const appReducer = combineReducers({
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
