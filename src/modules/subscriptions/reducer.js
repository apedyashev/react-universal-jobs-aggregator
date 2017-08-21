import {asyncActions as userAsyncActions} from 'modules/user/actions';

const initialState = {
  items: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case userAsyncActions.PROFILE.GET.SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          ...action.response.entities.subscriptions,
        },
      };
    default:
      return state;
  }
};
