import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {rootReducer as modules} from 'modules';

const rootReducer = combineReducers({
  modules,
  form: formReducer,
});

export default rootReducer;
