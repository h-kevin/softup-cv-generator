import { initialState, baseReducer } from '../../../utils/reducers';
import types from './action_types';
import actions from '../../../constants/action_type';
import {
  updateObjectInArray,
  deleteObjectFromArray,
} from '../../../utils/mutators';

const initState = {
  ...initialState,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_CVS:
      return baseReducer(
        state,
        action,
        actions.READ,
        null,
        () => ({
          ...state._data,
          ...action.payload,
        }),
        null,
      );
    case types.GET_CV:
      return baseReducer(
        state,
        action,
        actions.READ,
        null,
        () => ({
          ...state._data,
          ...action.payload,
        }),
        null,
      );
    case types.CREATE_CV:
      return baseReducer(
        state,
        action,
        actions.CREATE,
        null,
        () => ({
          ...state._data,
          cvs: updateObjectInArray(
            state._data?.cvs,
            action.payload.cv,
          ),
        }),
        null,
      );
    case types.UPDATE_CV:
      return baseReducer(
        state,
        action,
        actions.UPDATE,
        null,
        () => ({
          ...state._data,
          cvs: updateObjectInArray(
            state._data?.cvs,
            action.payload.updatedCv,
          ),
        }),
        null,
      );
    case types.DELETE_CV:
      return baseReducer(
        state,
        action,
        actions.DELETE,
        null,
        () => ({
          ...state._data,
          cvs: deleteObjectFromArray(
            state._data?.cvs,
            action.payload.deletedId,
          ),
        }),
        null,
      );
    case types.GENERATE_DOCX:
      return baseReducer(
        state,
        action,
        actions.READ,
        null,
        null,
        null,
      );
    case types.UPDATE_PROFILE_IMAGE:
      return baseReducer(
        state,
        action,
        actions.UPDATE,
        null,
        () => ({
          ...state._data,
          cvs: updateObjectInArray(
            state._data?.cvs,
            action.payload.updatedCv,
          ),
        }),
        null,
      );
    default:
      return state;
  }
};

export default reducer;
