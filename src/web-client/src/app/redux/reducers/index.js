import { combineReducers } from 'redux';

import cvsReducer from '../modules/cvs/reducer';

const appReducer = combineReducers({
  cvsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_GIVEN_STATE') {
    state = {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        isCreating: false,
        didCreate: false,
        isFetching: false,
        didFetch: false,
        isUpdating: false,
        didUpdate: false,
        isDeleting: false,
        didDelete: false,
        error: '',
      },
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
