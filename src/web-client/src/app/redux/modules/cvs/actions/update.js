import axios from 'axios';

import actionTypes from '../action_types';
import config from '../../../../config';
import getError from '../../../../utils/error_message';
import { start, success, fail } from '../../../../utils/actions';
import { getCv } from './read';

/**
 * Update CV
 *
 * @param {integer} (path) params.id: CV id
 * @param {String} params.firstName: First name
 * @param {String} params.lastName: Last name
 * @param {String} params.role: Role
 * @param {String} params.summary: Summary
 * @param {Object} params.skills: {
 *  @param {Array} params.languages: Languages
 *  @param {Array} params.databases: Databases
 *  @param {Array} params.backendFrameworks: Backend frameworks
 *  @param {Array} params.frontendFrameworks: Frontend frameworks
 *  @param {Array} params.operationsAndInfrastructure: Operations & infrastructure
 *  @param {Array} params.integrationAndDeployment: Continuous integration & deployment
 *  @param {Array} params.testing: Testing
 *  @param {Array} params.thirdParty: Third-party integrations
 *  @param {Array} params.agile: Agile
 *  @param {Array} params.other: Other
 * }
 * @param {Array} params.spokenLanguages: [
 *  {
 *    @param {String} language: Language
 *    @param {String} level: Level
 *  }
 * ]
 * @param {Array} params.projects: [
 *  {
 *    @param {Object} period: {
 *      @param {String} startDate: Start date
 *      @param {String} endDate: End date
 *    }
 *    @param {String} client: Client
 *    @param {String} position: Position
 *    @param {Array} technologies: Technologies
 *    @param {String} responsibilities: Responsibilities
 *  }
 * ]
 * @param {Array} params.education: [
 *  {
 *    @param {String} institution: Institution
 *    @param {Array} qualifications: Qualifications
 *    @param {Object} period: {
 *      @param {String} startDate: Start date
 *      @param {String} endDate: End date
 *    }
 *  }
 * ]
 */

export const updateCv = (params) => async (dispatch) => {
  start(dispatch, actionTypes.UPDATE_CV);

  const URL = `${config.SERVER_URL}/cvs/${params.id}`;
  const body = {
    firstName: params.firstName,
    lastName: params.lastName,
    role: params.role,
    summary: params.summary,
    skills: params.skills,
    spokenLanguages: params.spokenLanguages,
    projects: params.projects,
    education: params.education,
  }

  try {
    await axios.patch(URL, body);

    success(dispatch, actionTypes.UPDATE_CV, { updatedCv: { ...params } });

    return true;
  } catch (error) {
    fail(dispatch, actionTypes.UPDATE_CV, { error: getError(error) });

    return false;
  }
};

/**
 * Update profile image
 *
 * @param {integer} (path) params.id: CV id
 * @param {FormData} (data) profileImage: Profile image
 */

export const updateProfileImage = (params) => async (dispatch) => {
  start(dispatch, actionTypes.UPDATE_PROFILE_IMAGE);

  const URL = `${config.SERVER_URL}/cvs/${params.id}/profile-image`;

  const body = {
    profileImage: params.profileImage,
  };

  try {
    await axios.put(URL, body);

    success(dispatch, actionTypes.UPDATE_PROFILE_IMAGE, null);
    
    getCv(params.id);

    return true;
  } catch (error) {
    fail(dispatch, actionTypes.UPDATE_PROFILE_IMAGE, { error: getError(error) });
    
    return false;
  }
};
