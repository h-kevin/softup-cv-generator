import { combineReducers } from 'redux';

const appReducer = combineReducers({});

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
