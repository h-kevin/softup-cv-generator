import axios from 'axios';

import actionTypes from '../action_types';
import config from '../../../../config';
import getError from '../../../../utils/error_message';
import { start, success, fail } from '../../../../utils/actions';

/**
 * Get CVs
 */

export const getCvs = () => async (dispatch) => {
  start(dispatch, actionTypes.GET_CV);

  const URL = `${config.SERVER_URL}/cvs`;

  try {
    const response = await axios.get(URL);
    const { data } = response;

    success(dispatch, actionTypes.GET_ACCOUNTS, { cvs: [...data] });

    return true;
  } catch (error) {
    fail(dispatch, actionTypes.GET_ACCOUNTS, { error: getError(error) });

    return false;
  }
};

/**
 * Get specific CV
 *
 * @param {integer} (path) params.id: CV id
 */

export const getCv = (params) => async (dispatch) => {
  start(dispatch, actionTypes.GET_ACCOUNT);

  const URL = `${config.SERVER_URL}/cvs/${params.id}`;

  try {
    const response = await axios.get(URL);
    const { data } = response;

    success(dispatch, actionTypes.GET_ACCOUNT, { cv: { ...data } });

    return true;
  } catch (error) {
    fail(dispatch, actionTypes.GET_ACCOUNT, { error: getError(error) });

    return false;
  }
};
