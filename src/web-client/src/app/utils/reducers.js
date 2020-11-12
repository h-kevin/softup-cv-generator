import actionStatus from '../constants/action_status';
import actionType from '../constants/action_type';

/* Basic initial state */

export const initialState = {
  isCreating: false,
  didCreate: false,

  isReading: false,
  didRead: false,

  isUpdating: false,
  didUpdate: false,

  isDeleting: false,
  didDelete: false,

  error: '',

  _data: undefined,
};

/* Function for updating state based on action status */

// Create

const createHandler = (state, action, startCb, successCb, failCb) => {
  switch (action.status) {
    case actionStatus.ACTION_START:
      return {
        ...state,
        isCreating: true,
        didCreate: false,
        error: '',
        _data: startCb ? startCb() : state._data,
      };
    case actionStatus.ACTION_SUCCESS:
      return {
        ...state,
        isCreating: false,
        didCreate: true,
        error: '',
        _data: successCb ? successCb() : state._data,
      };
    case actionStatus.ACTION_FAIL:
      return {
        ...state,
        isCreating: false,
        didCreate: false,
        error: action.payload.error,
        _data: failCb ? failCb() : state._data,
      };
    default:
      return state;
  }
};

// Read

const readHandler = (state, action, startCb, successCb, failCb) => {
  switch (action.status) {
    case actionStatus.ACTION_START:
      return {
        ...state,
        isReading: true,
        didRead: false,
        error: '',
        _data: startCb ? startCb() : state._data,
      };
    case actionStatus.ACTION_SUCCESS:
      return {
        ...state,
        isReading: false,
        didRead: true,
        error: '',
        _data: successCb ? successCb() : state._data,
      };
    case actionStatus.ACTION_FAIL:
      return {
        ...state,
        isReading: false,
        didRead: false,
        error: action.payload.error,
        _data: failCb ? failCb() : state._data,
      };
    default:
      return state;
  }
};

// Update

const updateHandler = (state, action, startCb, successCb, failCb) => {
  switch (action.status) {
    case actionStatus.ACTION_START:
      return {
        ...state,
        isUpdating: true,
        didUpdate: false,
        error: '',
        _data: startCb ? startCb() : state._data,
      };
    case actionStatus.ACTION_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        didUpdate: true,
        error: '',
        _data: successCb ? successCb() : state._data,
      };
    case actionStatus.ACTION_FAIL:
      return {
        ...state,
        isUpdating: false,
        didUpdate: false,
        error: action.payload.error,
        _data: failCb ? failCb() : state._data,
      };
    default:
      return state;
  }
};

// Delete

const deleteHandler = (state, action, startCb, successCb, failCb) => {
  switch (action.status) {
    case actionStatus.ACTION_START:
      return {
        ...state,
        isDeleting: true,
        didDelete: false,
        error: '',
        _data: startCb ? startCb() : state._data,
      };
    case actionStatus.ACTION_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        didDelete: true,
        error: '',
        _data: successCb ? successCb() : state._data,
      };
    case actionStatus.ACTION_FAIL:
      return {
        ...state,
        isDeleting: false,
        didDelete: false,
        error: action.payload.error,
        _data: failCb ? failCb() : state._data,
      };
    default:
      return state;
  }
};

export const baseReducer = (
  state,
  action,
  type,
  startCb,
  successCb,
  failCb,
) => {
  switch (type) {
    case actionType.CREATE:
      return createHandler(state, action, startCb, successCb, failCb);
    case actionType.READ:
      return readHandler(state, action, startCb, successCb, failCb);
    case actionType.UPDATE:
      return updateHandler(state, action, startCb, successCb, failCb);
    case actionType.DELETE:
      return deleteHandler(state, action, startCb, successCb, failCb);
    default:
      return null;
  }
};
