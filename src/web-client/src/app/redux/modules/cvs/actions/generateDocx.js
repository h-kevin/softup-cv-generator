import axios from 'axios';

import actionTypes from '../action_types';
import config from '../../../../config';
import getError from '../../../../utils/error_message';
import { start, success, fail } from '../../../../utils/actions';

/**
 * Generate docx
 *
 * @param {integer} (path) params.id: CV id
 */

export const updateAccount = (params) => async (dispatch) => {
  start(dispatch, actionTypes.GENERATE_DOCX);

  const URL = `${config.SERVER_URL}/cvs/${params.id}/generate-docx`;

  try {
    await axios.get(URL);

    success(dispatch, actionTypes.GENERATE_DOCX, null);

    return true;
  } catch (error) {
    fail(dispatch, actionTypes.GENERATE_DOCX, { error: getError(error) });
    
    return false;
  }
};
