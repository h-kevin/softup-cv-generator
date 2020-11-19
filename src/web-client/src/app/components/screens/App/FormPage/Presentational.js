import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { FormItem, Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import i18n from 'i18next';

import ArrayInput from './Common/ArrayInput/Presentational';
import classes from './Styles.module.scss';

const initialValues = {
  firstName: '',
  lastName: '',
  role: '',
  summary: '',
  skills: {
    languages: [],
    databases: [],
    backendFrameworks: [],
    frontendFrameworks: [],
    operationsAndInfrastructure: [],
    integrationAndDeployment: [],
    testing: [],
    thirdParty: [],
    agile: [],
    other: [],
  },
  spokenLanguages: [],
  projects: [],
  education: [],
  profileImage: '',
};
const validation = () => Yup.object().shape({
  firstName: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  lastName: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  role: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  summary: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  skills: Yup
    .object()
    .shape({
      languages: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      databases: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      backendFrameworks: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      frontendFrameworks: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      operationsAndInfrastructure: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      integrationAndDeployment: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      testing: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      thirdParty: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      agile: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      other: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
    })
    .required(),
  spokenLanguages: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          language: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          level: Yup
            .string()
            .required(),
        }),
    )
    .required(),
  projects: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          period: Yup
            .object()
            .shape({
              startDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
                .required(i18n.t('formPage.fieldIsRequired')),
              endDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
            })
            .required(),
          client: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          position: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          technologies: Yup
            .array()
            .of(
              Yup
                .string()
                .required(),
            ),
          responsibilities: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
        }),
    )
    .required(),
  education: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          institution: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          qualifications: Yup
            .array()
            .of(
              Yup
                .string()
                .required(),
            ),
          period: Yup
            .object()
            .shape({
              startDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
                .required(i18n.t('formPage.fieldIsRequired')),
              endDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
            })
            .required(),
        }),
    )
    .required(),
});
// const onSubmit = async () => {
  
// };

const Presentational = () => {
  const [languages, setLanguages] = useState([
    'JavaScript',
    'Python',
    'Java',
  ]);
  const [databases, setDatabases] = useState([
    'MongoDB',
    'MySQL',
    'PostgreSQL',
  ]);
  const [backendFrameworks, setBackendFrameworks] = useState([
    'Express.js',
    'Flask',
  ]); 
  const [frontendFrameworks, setFrontendFrameworks] = useState([
    'ReactJS',
    'VueJS',
  ]); 
  const [operationsAndInfrastructure, setOperationsAndInfrastructure] = useState([
    'Docker',
    'JWT',
    'nginx',
  ]); 
  const [integrationAndDeployment, setIntegrationAndDeployment] = useState([
    'Jenkins',
  ]);
  const [testing, setTesting] = useState([
    'Jest',
  ]);
  const [thirdParty, setThirdParty] = useState([
    'Google Analytics',
    'Azure Content Moderator',
  ]);
  const [agile, setAgile] = useState([
    'Kanban',
    'Scrum',
  ]);
  const [other, setOther] = useState([
    'Natural Language Processing',
    'Android Development',
    'Machine Learning',
  ]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
    >
      {() => (
        <Form layout="vertical" noValidate>
          <FormItem
            name="firstName" 
            label={i18n.t('formPage.firstName')}
            required
            showValidateSuccess
          >
            <Input name="firstName" placeholder={i18n.t('formPage.firstNameEx')} />
          </FormItem>
          <FormItem
            name="lastName" 
            label={i18n.t('formPage.lastName')}
            required
            showValidateSuccess
          >
            <Input name="lastName" placeholder={i18n.t('formPage.lastNameEx')} />
          </FormItem>
          <FormItem
            name="role" 
            label={i18n.t('formPage.role')}
            required
            showValidateSuccess
          >
            <Input name="role" placeholder={i18n.t('formPage.roleEx')} />
          </FormItem>
          <FormItem
            name="summary" 
            label={i18n.t('formPage.summary')}
            required
            showValidateSuccess
          >
            <Input.TextArea
              className={classes.TextArea}
              name="summary" 
              placeholder={i18n.t('formPage.summaryEx')} 
              autoSize
            />
          </FormItem>
          <FormItem
            name="languages" 
            label={i18n.t('formPage.languages')}
          >
            <ArrayInput
              array={languages} 
              setArray={setLanguages}
              name={i18n.t('formPage.languages')}
            />
          </FormItem>
          <FormItem
            name="databases" 
            label={i18n.t('formPage.databases')}
          >
            <ArrayInput
              array={databases} 
              setArray={setDatabases}
              name={i18n.t('formPage.databases')}
            />
          </FormItem>
          <FormItem
            name="backendFrameworks" 
            label={i18n.t('formPage.backendFrameworks')}
          >
            <ArrayInput
              array={backendFrameworks} 
              setArray={setBackendFrameworks}
              name={i18n.t('formPage.backendFrameworks')}
            />
          </FormItem>
          <FormItem
            name="frontendFrameworks" 
            label={i18n.t('formPage.frontendFrameworks')}
          >
            <ArrayInput
              array={frontendFrameworks} 
              setArray={setFrontendFrameworks}
              name={i18n.t('formPage.frontendFrameworks')}
            />
          </FormItem>
          <FormItem
            name="operationsAndInfrastructure" 
            label={i18n.t('formPage.operationsAndInfrastructure')}
          >
            <ArrayInput
              array={operationsAndInfrastructure} 
              setArray={setOperationsAndInfrastructure}
              name={i18n.t('formPage.operationsAndInfrastructure')}
            />
          </FormItem>
          <FormItem
            name="integrationAndDeployment" 
            label={i18n.t('formPage.integrationAndDeployment')}
          >
            <ArrayInput
              array={integrationAndDeployment} 
              setArray={setIntegrationAndDeployment}
              name={i18n.t('formPage.integrationAndDeployment')}
            />
          </FormItem>
          <FormItem
            name="testing" 
            label={i18n.t('formPage.testing')}
          >
            <ArrayInput
              array={testing} 
              setArray={setTesting}
              name={i18n.t('formPage.testing')}
            />
          </FormItem>
          <FormItem
            name="thirdParty" 
            label={i18n.t('formPage.thirdParty')}
          >
            <ArrayInput
              array={thirdParty} 
              setArray={setThirdParty}
              name={i18n.t('formPage.thirdParty')}
            />
          </FormItem>
          <FormItem
            name="agile" 
            label={i18n.t('formPage.agile')}
          >
            <ArrayInput
              array={agile} 
              setArray={setAgile}
              name={i18n.t('formPage.agile')}
            />
          </FormItem>
          <FormItem
            name="other" 
            label={i18n.t('formPage.other')}
          >
            <ArrayInput
              array={other} 
              setArray={setOther}
              name={i18n.t('formPage.other')}
            />
          </FormItem>
        </Form>
      )}
    </Formik>
  );
};

export default Presentational;
