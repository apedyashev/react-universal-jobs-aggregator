import union from 'lodash/union';
import merge from 'lodash/merge';

// created an initial state module which will be storing a list
export const makeListInitialState = (additionalValues = {}) => {
  const initialState = merge({
    pending: false,
    loaded: false,
    hasNextPage: true,
    totalCount: 0,
    items: {},
    order: [],
  }, additionalValues);

  return Object.assign({}, initialState, initialState);
};

// default reducer for list
export const listReducer = (state, action, requestTypes) => {
  switch (action.type) {
    case requestTypes.REQUEST: {
      return {
        ...state,
        pending: true,
        loaded: false,
      };
    }

    case requestTypes.SUCCESS: {
      const {entities, result, result: {meta: {paginate}}} = action.response;
      return {
        ...state,
        pending: false,
        loaded: true,
        hasNextPage: !!paginate.nextPage,
        totalCount: paginate.totalCount,
        items: {
          ...state.items,
          ...entities.jobs,
        },
        order: union(state.order, result.items),
      };
    }

    case requestTypes.FAILURE: {
      return {
        ...state,
        pending: false,
        loaded: false,
      };
    }

    default : {
      return state;
    }
  }
};
