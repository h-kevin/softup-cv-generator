import axios from 'axios';

import actionTypes from '../action_types';
import config from '../../../../config';
import getError from '../../../../utils/error_message';
import { start, success, fail } from '../../../../utils/actions';

/**
 * Delete CV
 *
 * @param {integer} (path) params.id: CV id
 */

export const deleteCv = (params) => async (dispatch) => {
  start(dispatch, actionTypes.DELETE_CV, {
    deletedId: params.id, 
  });

  const URL = `${config.SERVER_URL}/cvs/${params.id}`;

  try {
    await axios.delete(URL);

    success(dispatch, actionTypes.DELETE_CV, {
      deletedId: params.id, 
    });

    return true;
  } catch (error) {
    fail(dispatch, actionTypes.DELETE_CV, { error: getError(error) });

    return false;
  }
};
