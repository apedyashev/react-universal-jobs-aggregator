import {LOGIN} from 'modules/auth/actions';
import {asyncActions} from './actions';

const initialState = {
  items: {},
  loggedUserId: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
    case asyncActions.PROFILE.GET.SUCCESS: {
      const {entities, result} = action.response;
      // loging returns `user` but user/profile returns `item`
      const loggedUserId = result.user || result.item;
      return {
        ...state,
        items: {
          ...state.items,
          ...entities.users,
        },
        loggedUserId,
      };
    }

    default:
      return state;
  }
};
