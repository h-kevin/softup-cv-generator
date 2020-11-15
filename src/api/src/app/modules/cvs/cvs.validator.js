import BaseJoi from 'joi';
import DateJoi from '@hapi/joi-date';

import { BadRequest } from '../../utils/error';
import datetimeFormats from '../../constants/datetime_formats';

const Joi = BaseJoi.extend(DateJoi);

export const createCvValidator = (req, _res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required(),
    summary: Joi.string().required(),
    skills: Joi.object().keys({
      languages: Joi.array().items(
        Joi.string().required(),
      ),
      databases: Joi.array().items(
        Joi.string().required(),
      ),
      backendFrameworks: Joi.array().items(
        Joi.string().required(),
      ),
      frontendFrameworks: Joi.array().items(
        Joi.string().required(),
      ),
      operationsAndInfrastructure: Joi.array().items(
        Joi.string().required(),
      ),
      integrationAndDeployment: Joi.array().items(
        Joi.string().required(),
      ),
      testing: Joi.array().items(
        Joi.string().required(),
      ),
      thirdParty: Joi.array().items(
        Joi.string().required(),
      ),
      agile: Joi.array().items(
        Joi.string().required(),
      ),
      other: Joi.array().items(
        Joi.string().required(),
      ),
    }).required(),
    spokenLanguages: Joi.array().items(
      Joi.object().keys({
        language: Joi.string().required(),
        level: Joi.string().required(),
      }),
    ).required(),
    projects: Joi.array().items(
      Joi.object().keys({
        period: Joi.object().keys({
          startDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
          endDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
        }),
        client: Joi.string().required(),
        position: Joi.string().required(),
        technologies: Joi.array().items(
          Joi.string().required(),
        ),
        responsibilities: Joi.string().required(),
      }),
    ).required(),
    education: Joi.array().items(
      Joi.object().keys({
        institution: Joi.string().required(),
        qualifications: Joi.array().items(
          Joi.string().required(),
        ).required(),
        period: Joi.object().keys({
          startDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
          endDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
        }).required(),
      }),
    ).required(),
  }).required();

  const result = schema.validate(req.body);

  if (result.error) {
    return next(new BadRequest(result?.error?.details));
  }

  return next();
};

export const updateCvValidator = (req, _res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string(),
    summary: Joi.string(),
    skills: Joi.object().keys({
      languages: Joi.array().items(
        Joi.string(),
      ),
      databases: Joi.array().items(
        Joi.string(),
      ),
      backendFrameworks: Joi.array().items(
        Joi.string(),
      ),
      frontendFrameworks: Joi.array().items(
        Joi.string(),
      ),
      operationsAndInfrastructure: Joi.array().items(
        Joi.string(),
      ),
      integrationAndDeployment: Joi.array().items(
        Joi.string(),
      ),
      testing: Joi.array().items(
        Joi.string(),
      ),
      thirdParty: Joi.array().items(
        Joi.string(),
      ),
      agile: Joi.array().items(
        Joi.string(),
      ),
      other: Joi.array().items(
        Joi.string(),
      ),
    }),
    spokenLanguages: Joi.array().items(
      Joi.object().keys({
        language: Joi.string().required(),
        level: Joi.string().required(),
      }),
    ),
    projects: Joi.array().items(
      Joi.object().keys({
        period: Joi.object().keys({
          startDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
          endDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
        }),
        client: Joi.string(),
        position: Joi.string(),
        technologies: Joi.array().items(
          Joi.string(),
        ),
        responsibilities: Joi.string(),
      }),
    ),
    education: Joi.array().items(
      Joi.object().keys({
        institution: Joi.string().required(),
        qualifications: Joi.array().items(
          Joi.string().required(),
        ).required(),
        period: Joi.object().keys({
          startDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
          endDate: Joi.date().format(datetimeFormats.STANDARD_DATE).required(),
        }).required(),
      }),
    ),
  }).required();

  const result = schema.validate(req.body);

  if (result.error) {
    return next(new BadRequest(result?.error?.details));
  }

  return next();
};
