import union from 'lodash/union';
import {JOBS} from './actions';

const initialState = {
  pending: false,
  loaded: false,
  hasNextPage: true,
  items: {},
  order: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case JOBS.SUCCESS: {
      const {entities, result} = action.response;
      return {
        ...state,
        items: {
          ...state.items,
          ...entities.jobs
        },
        order: union(state.order, result.items)
      }
    }
  }

  return state;
}
