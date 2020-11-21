import axios from 'axios';

import actionTypes from '../action_types';
import config from '../../../../config';
import getError from '../../../../utils/error_message';
import { start, success, fail } from '../../../../utils/actions';

/**
 * Create CV
 *
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

export const createCv = (params) => async (dispatch) => {
  start(dispatch, actionTypes.CREATE_CV);

  const URL = `${config.SERVER_URL}/cvs`;
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
    const response = await axios.post(URL, body);
    const { data } = response;

    success(dispatch, actionTypes.CREATE_CV, { cv: { ...data } });

    return data._id;
  } catch (error) {
    fail(dispatch, actionTypes.CREATE_CV, { error: getError(error) });

    return false;
  }
};
