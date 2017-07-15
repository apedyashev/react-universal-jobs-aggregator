import {listReducer, makeListInitialState} from 'helpers/reducer';
import {JOBS} from './actions';

const initialState = makeListInitialState();
export default (state = initialState, action) => {
  return listReducer(state, action, JOBS);
}
