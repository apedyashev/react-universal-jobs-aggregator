import {SET_AUTH_HEADER} from './actions';

const initialState = {
  authHeader: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_HEADER:
      return {
        authHeader: action.authHeader,
      };
    default:
      return state;
  }
};
