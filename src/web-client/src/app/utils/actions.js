import actionStatus from '../constants/action_status';

/************************/
/* Start; Success; Fail */
/************************/

export const start = (dispatch, actionType, payload) => {
  dispatch({
    type: actionType,
    status: actionStatus.ACTION_START,
    payload,
  });
};

export const success = (dispatch, actionType, payload) => {
  dispatch({
    type: actionType,
    status: actionStatus.ACTION_SUCCESS,
    payload,
  });
};

export const fail = (dispatch, actionType, payload) => {
  dispatch({
    type: actionType,
    status: actionStatus.ACTION_FAIL,
    payload,
  });
};

/****************/
/* Clears state */
/****************/

export const clearGlobalState = (dispatch) => {
  dispatch({
    type: 'CLEAR_STATE',
  });
};

/**************************/
/* Clears one given state */
/**************************/

export const clearState = (dispatch, givenState) => {
  dispatch({
    type: 'CLEAR_GIVEN_STATE',
    payload: givenState,
  });
};
